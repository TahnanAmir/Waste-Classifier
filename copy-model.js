const fs = require('fs');
const path = require('path');

// Files to copy
const modelFiles = [
  'model.json',
  'classname.txt',
  'group1-shard1of6.bin',
  'group1-shard2of6.bin',
  'group1-shard3of6.bin',
  'group1-shard4of6.bin',
  'group1-shard5of6.bin',
  'group1-shard6of6.bin'
];

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy each file
modelFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  const destPath = path.join(publicDir, file);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${file} to public directory`);
    } else {
      console.error(`Source file not found: ${file}`);
    }
  } catch (err) {
    console.error(`Error copying ${file}:`, err);
  }
});

console.log('Model files copy complete'); 