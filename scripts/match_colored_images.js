const fs = require('fs');
const path = require('path');

const coloredSourceDir = 'C:/Users/pschu/BOEKEN/gekleurde platen';
const coloredTargetDir = path.join(__dirname, '../public/colored');
const mappingFile = path.join(__dirname, '../src/data/colored-mapping.json');

if (!fs.existsSync(coloredTargetDir)) {
  fs.mkdirSync(coloredTargetDir, { recursive: true });
}

// Read all 218 files in coloredSourceDir
const coloredFiles = fs.readdirSync(coloredSourceDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
console.log(`Found ${coloredFiles.length} colored files in source directory.`);

// Copy files to public/colored/ with index-based clean filenames
const mappedList = [];
coloredFiles.forEach((file, index) => {
  const ext = path.extname(file).toLowerCase();
  const newFilename = `colored-art-${index + 1}${ext}`;
  const srcPath = path.join(coloredSourceDir, file);
  const destPath = path.join(coloredTargetDir, newFilename);

  fs.copyFileSync(srcPath, destPath);
  mappedList.push({
    id: `colored-${index + 1}`,
    filename: newFilename,
    path: `/colored/${newFilename}`,
    originalName: file,
  });
});

console.log(`Successfully copied ${mappedList.length} files to public/colored/`);

// Load coloring-pages.json to map pages to colored artworks
const dataPath = path.join(__dirname, '../src/data/en/coloring-pages.json');
let coloringPages = [];
if (fs.existsSync(dataPath)) {
  coloringPages = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

// Map each coloring page to a colored artwork index (distributing 218 colored files evenly)
const slugToColoredMap = {};
const themeToColoredMap = {};

coloringPages.forEach((page, idx) => {
  const coloredItem = mappedList[idx % mappedList.length];
  slugToColoredMap[page.slug] = {
    coloredImage: coloredItem.path,
    title: page.title,
    theme: page.parentTheme,
    hub: page.parentHub,
  };

  if (page.parentTheme && !themeToColoredMap[page.parentTheme]) {
    themeToColoredMap[page.parentTheme] = coloredItem.path;
  }
});

const outputData = {
  totalColoredImages: mappedList.length,
  mappedList,
  slugMap: slugToColoredMap,
  themeMap: themeToColoredMap,
};

fs.writeFileSync(mappingFile, JSON.stringify(outputData, null, 2), 'utf-8');
console.log(`Successfully generated colored-mapping.json with ${Object.keys(slugToColoredMap).length} mapped items!`);
