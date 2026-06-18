const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\Admin\\Desktop\\Museum theme\\index.html';
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /\s*<div class="exhibition-card-arrow" aria-hidden="true">\s*<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">\s*<path d="M7 17L17 7M17 7H7M17 7v10" \/>\s*<\/svg>\s*<\/div>/g;
  content = content.replace(regex, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Removed arrows from index.html');
}
