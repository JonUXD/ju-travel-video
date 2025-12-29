// scripts/update-stills.js
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const videos = [
  'croatia-2015',
  'greece-2016',
  'london-2017',
  'venice-2018'
];

console.log('📸 Updating stills in JSON files...\n');

videos.forEach(slug => {
  const jsonPath = join(__dirname, '..', 'src', 'data', 'videos', `${slug}.json`);
  const imagesPath = join(__dirname, '..', 'public', 'images', 'stills', slug);
  
  try {
    // Read current JSON
    const jsonContent = JSON.parse(readFileSync(jsonPath, 'utf8'));
    
    // Get image files
    const imageFiles = readdirSync(imagesPath)
      .filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'))
      .sort() // Sort alphabetically (01, 02, 03...)
      .map(file => `/images/stills/${slug}/${file}`);
    
    console.log(`✅ ${slug}: Found ${imageFiles.length} images`);
    
    // Update JSON
    jsonContent.stills = imageFiles;
    
    // Write back
    writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
    console.log(`   Updated ${jsonPath}\n`);
    
  } catch (error) {
    console.error(`❌ Error processing ${slug}:`, error.message);
  }
});

console.log('🎉 All JSON files updated!');