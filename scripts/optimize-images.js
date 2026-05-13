// scripts/optimize-images.js
import { readdirSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  stagingDir: join(__dirname, '..', 'staging'),
  publicDir: join(__dirname, '..', 'public', 'images', 'stills'),
  
  gallerySize: { width: 1920, height: 1080 },
  thumbnailSize: { width: 384, height: 216 },
  
  galleryQuality: 80,
  thumbnailQuality: 85,
  
  supportedExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
  targetExtension: '.webp'
};

function getVideoSlugs() {
  return readdirSync(CONFIG.stagingDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();
}

function prepareDirectory(dirPath) {
  if (existsSync(dirPath)) {
    rmSync(dirPath, { recursive: true });
  }
  mkdirSync(dirPath, { recursive: true });
}

function calculateCrop(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const sourceAspect = sourceWidth / sourceHeight;
  const targetAspect = targetWidth / targetHeight;
  
  if (Math.abs(sourceAspect - targetAspect) < 0.01) {
    return { width: sourceWidth, height: sourceHeight, left: 0, top: 0 };
  }
  
  if (sourceAspect > targetAspect) {
    const cropHeight = sourceHeight;
    const cropWidth = Math.round(sourceHeight * targetAspect);
    const left = Math.round((sourceWidth - cropWidth) / 2);
    return { left, top: 0, width: cropWidth, height: cropHeight };
  } else {
    const cropWidth = sourceWidth;
    const cropHeight = Math.round(sourceWidth / targetAspect);
    const top = Math.round((sourceHeight - cropHeight) / 2);
    return { left: 0, top, width: cropWidth, height: cropHeight };
  }
}

async function processImage(sourcePath, targetDir, slug, index) {
  // Use numbered naming: 01, 02, 03...
  const paddedIndex = String(index).padStart(2, '0');
  const baseName = `${slug}-stills-${paddedIndex}`;
  const galleryName = `${baseName}${CONFIG.targetExtension}`;
  const thumbName = `${baseName}-thumb${CONFIG.targetExtension}`;
  
  const galleryPath = join(targetDir, galleryName);
  const thumbPath = join(targetDir, thumbName);
  
  try {
    const metadata = await sharp(sourcePath).metadata();
    
    if (metadata.width < CONFIG.thumbnailSize.width || metadata.height < CONFIG.thumbnailSize.height) {
      console.warn(`  ⚠️  Skipping ${sourcePath}: Too small`);
      return null;
    }
    
    const crop = calculateCrop(metadata.width, metadata.height, CONFIG.gallerySize.width, CONFIG.gallerySize.height);
    
    const galleryPipeline = sharp(sourcePath);
    if (crop.width !== metadata.width || crop.height !== metadata.height) {
      galleryPipeline.extract(crop);
    }
    await galleryPipeline
      .resize(CONFIG.gallerySize.width, CONFIG.gallerySize.height, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: CONFIG.galleryQuality })
      .toFile(galleryPath);
    
    const thumbPipeline = sharp(sourcePath);
    if (crop.width !== metadata.width || crop.height !== metadata.height) {
      thumbPipeline.extract(crop);
    }
    await thumbPipeline
      .resize(CONFIG.thumbnailSize.width, CONFIG.thumbnailSize.height, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: CONFIG.thumbnailQuality })
      .toFile(thumbPath);
    
    console.log(`    ✅ ${galleryName}`);
    
    return `/images/stills/${slug}/${galleryName}`;
    
  } catch (error) {
    console.error(`  ❌ Error:`, error.message);
    return null;
  }
}

async function processSlug(slug, specificSlug = null) {
  if (specificSlug && slug !== specificSlug) {
    return [];
  }
  
  const sourceDir = join(CONFIG.stagingDir, slug);
  const targetDir = join(CONFIG.publicDir, slug);
  
  console.log(`\n🎬 Processing: ${slug}`);
  
  if (!existsSync(sourceDir)) {
    console.log(`  ⚠️  Source folder not found`);
    return [];
  }
  
  // Get and sort source files alphabetically
  const sourceFiles = readdirSync(sourceDir)
    .filter(file => CONFIG.supportedExtensions.includes(extname(file).toLowerCase()))
    .sort(); // Alphabetical order = your control
  
  if (sourceFiles.length === 0) {
    console.log(`  ⚠️  No images found`);
    return [];
  }
  
  console.log(`  📁 Found ${sourceFiles.length} images (sorted alphabetically)`);
  
  prepareDirectory(targetDir);
  
  const results = [];
  for (let i = 0; i < sourceFiles.length; i++) {
    const sourcePath = join(sourceDir, sourceFiles[i]);
    const imagePath = await processImage(sourcePath, targetDir, slug, i + 1);
    if (imagePath) {
      results.push(imagePath);
    }
  }
  
  console.log(`  ✅ Completed: ${results.length} images → ${slug}-stills-01.webp, 02.webp...`);
  return results;
}

function updateJsonFile(slug, imagePaths) {
  const jsonPath = join(__dirname, '..', 'src', 'data', 'videos', `${slug}.json`);
  
  if (!existsSync(jsonPath)) {
    console.warn(`  ⚠️  JSON not found: ${jsonPath}`);
    return;
  }
  
  try {
    const jsonContent = JSON.parse(readFileSync(jsonPath, 'utf8'));
    jsonContent.stills = imagePaths;
    writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
    console.log(`  📝 Updated: ${slug}.json`);
  } catch (error) {
    console.error(`  ❌ Error updating JSON:`, error.message);
  }
}

async function main() {
  const specificSlug = process.argv[2] || null;
  
  console.log('🚀 Starting image optimization (numbered naming)...\n');
  
  const slugs = getVideoSlugs();
  
  for (const slug of slugs) {
    const imagePaths = await processSlug(slug, specificSlug);
    if (imagePaths.length > 0 && (!specificSlug || slug === specificSlug)) {
      updateJsonFile(slug, imagePaths);
    }
  }
  
  console.log('\n🎉 Complete!');
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});