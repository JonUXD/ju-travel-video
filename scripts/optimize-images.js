// scripts/optimize-images.js
import { readdirSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  // Source and target directories
  stagingDir: join(__dirname, '..', 'staging'),
  publicDir: join(__dirname, '..', 'public', 'images', 'stills'),
  
  // Image processing settings
  gallerySize: { width: 1920, height: 1080 },  // 16:9 for future gallery
  thumbnailSize: { width: 384, height: 216 },  // 16:9 for carousel
  
  // Quality settings (1-100)
  galleryQuality: 80,
  thumbnailQuality: 85,
  
  // Supported source formats
  supportedExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
  
  // Target format
  targetExtension: '.webp'
};

// Helper function to get all video slugs
function getVideoSlugs() {
  return readdirSync(CONFIG.stagingDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();
}

// Helper function to clean and recreate directory
function prepareDirectory(dirPath) {
  if (existsSync(dirPath)) {
    console.log(`🧹 Cleaning: ${dirPath}`);
    rmSync(dirPath, { recursive: true });
  }
  mkdirSync(dirPath, { recursive: true });
}

// Calculate crop dimensions for 16:9 - FIXED VERSION
function calculateCrop(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const sourceAspect = sourceWidth / sourceHeight;
  const targetAspect = targetWidth / targetHeight;
  
  if (Math.abs(sourceAspect - targetAspect) < 0.01) {
    // Already 16:9 (or very close) - no crop needed
    return { width: sourceWidth, height: sourceHeight, left: 0, top: 0 };
  }
  
  if (sourceAspect > targetAspect) {
    // Source is wider than 16:9 - crop sides
    const cropHeight = sourceHeight;
    const cropWidth = Math.round(sourceHeight * targetAspect);
    const left = Math.round((sourceWidth - cropWidth) / 2);
    return { left, top: 0, width: cropWidth, height: cropHeight };
  } else {
    // Source is taller than 16:9 - crop top/bottom
    const cropWidth = sourceWidth;
    const cropHeight = Math.round(sourceWidth / targetAspect);
    const top = Math.round((sourceHeight - cropHeight) / 2);
    return { left: 0, top, width: cropWidth, height: cropHeight };
  }
}

// Process a single image
async function processImage(sourcePath, targetDir, slug, filename) {
  const baseName = basename(filename, extname(filename));
  const galleryName = `${baseName}${CONFIG.targetExtension}`;
  const thumbName = `${baseName}-thumb${CONFIG.targetExtension}`;
  
  const galleryPath = join(targetDir, galleryName);
  const thumbPath = join(targetDir, thumbName);
  
  try {
    // Load image metadata
    const metadata = await sharp(sourcePath).metadata();
    
    // Guardrail: Skip if too small
    if (metadata.width < CONFIG.thumbnailSize.width || metadata.height < CONFIG.thumbnailSize.height) {
      console.warn(`  ⚠️  Skipping ${filename}: Too small (${metadata.width}x${metadata.height})`);
      return null;
    }
    
    // Calculate crop for 16:9
    const crop = calculateCrop(metadata.width, metadata.height, CONFIG.gallerySize.width, CONFIG.gallerySize.height);
    
    console.log(`  📸 Processing: ${filename} (${metadata.width}x${metadata.height})`);
    
    // Process gallery version (1920x1080)
    const galleryPipeline = sharp(sourcePath);
    
    // Only apply extract if we need to crop (not already 16:9)
    if (crop.width !== metadata.width || crop.height !== metadata.height) {
      galleryPipeline.extract(crop);
    }
    
    await galleryPipeline
      .resize(CONFIG.gallerySize.width, CONFIG.gallerySize.height, {
        fit: 'cover',
        withoutEnlargement: true  // Don't make small images bigger
      })
      .webp({ quality: CONFIG.galleryQuality })
      .toFile(galleryPath);
    
    // Process thumbnail version (384x216)
    const thumbPipeline = sharp(sourcePath);
    
    if (crop.width !== metadata.width || crop.height !== metadata.height) {
      thumbPipeline.extract(crop);
    }
    
    await thumbPipeline
      .resize(CONFIG.thumbnailSize.width, CONFIG.thumbnailSize.height, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .webp({ quality: CONFIG.thumbnailQuality })
      .toFile(thumbPath);
    
    console.log(`    ✅ Created: ${galleryName} (${CONFIG.gallerySize.width}x${CONFIG.gallerySize.height})`);
    console.log(`    ✅ Created: ${thumbName} (${CONFIG.thumbnailSize.width}x${CONFIG.thumbnailSize.height})`);
    
    return {
      gallery: `/images/stills/${slug}/${galleryName}`,
      thumbnail: `/images/stills/${slug}/${thumbName}`
    };
    
  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

// Process all images for a slug
async function processSlug(slug, specificSlug = null) {
  // If processing a specific slug and this isn't it, skip
  if (specificSlug && slug !== specificSlug) {
    return [];
  }
  
  const sourceDir = join(CONFIG.stagingDir, slug);
  const targetDir = join(CONFIG.publicDir, slug);
  
  console.log(`\n🎬 Processing: ${slug}`);
  
  // Skip if source doesn't exist
  if (!existsSync(sourceDir)) {
    console.log(`  ⚠️  Source folder not found: ${sourceDir}`);
    return [];
  }
  
  // Get source files
  const sourceFiles = readdirSync(sourceDir)
    .filter(file => CONFIG.supportedExtensions.includes(extname(file).toLowerCase()))
    .sort();
  
  if (sourceFiles.length === 0) {
    console.log(`  ⚠️  No supported images found in ${slug}`);
    return [];
  }
  
  console.log(`  📁 Found ${sourceFiles.length} source images`);
  
  // Clean and recreate target directory
  prepareDirectory(targetDir);
  
  // Process each image
  const results = [];
  for (const file of sourceFiles) {
    const sourcePath = join(sourceDir, file);
    const result = await processImage(sourcePath, targetDir, slug, file);
    if (result) {
      results.push(result);
    }
  }
  
  console.log(`  ✅ Completed: ${slug} (${results.length} images processed)`);
  return results;
}

// Update JSON file for a video
function updateJsonFile(slug, imagePaths) {
  const jsonPath = join(__dirname, '..', 'src', 'data', 'videos', `${slug}.json`);
  
  if (!existsSync(jsonPath)) {
    console.warn(`  ⚠️  JSON file not found: ${jsonPath}`);
    return;
  }
  
  try {
    const jsonContent = JSON.parse(readFileSync(jsonPath, 'utf8'));
    
    // Update stills array with gallery versions
    jsonContent.stills = imagePaths
      .map(result => result.gallery)
      .filter(path => path);  // Remove any nulls
    
    writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
    console.log(`  📝 Updated: ${slug}.json (${jsonContent.stills.length} stills)`);
    
  } catch (error) {
    console.error(`  ❌ Error updating JSON for ${slug}:`, error.message);
  }
}

// Main function
async function main() {
  const specificSlug = process.argv[2] || null;  // Allow running for specific slug
  
  console.log('🚀 Starting image optimization...');
  console.log('====================================');
  
  if (specificSlug) {
    console.log(`🎯 Processing specific slug: ${specificSlug}`);
  } else {
    console.log('🔄 Processing all videos');
  }
  
  // Get all video slugs
  const slugs = getVideoSlugs();
  console.log(`📁 Found ${slugs.length} video folders in staging`);
  
  // Process each slug
  for (const slug of slugs) {
    const imagePaths = await processSlug(slug, specificSlug);
    
    // Update JSON if we processed this slug
    if (imagePaths.length > 0 && (!specificSlug || slug === specificSlug)) {
      updateJsonFile(slug, imagePaths);
    }
  }
  
  console.log('\n====================================');
  console.log('🎉 Image optimization complete!');
  console.log(`📁 Output: ${CONFIG.publicDir}`);
  
  if (specificSlug) {
    console.log(`\n💡 To process all videos: npm run optimize-images`);
  }
}

// Handle errors
main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});