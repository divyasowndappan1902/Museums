const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Admin\\Desktop\\Museum theme';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('#e83e8c')) {
      content = content.replace(/#e83e8c/g, 'var(--gold)');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
