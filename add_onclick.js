const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Admin\\Desktop\\Museum theme';
['index.html', 'exhibitions.html'].forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<article class="exhibition-card/g, '<article onclick="window.location.href=\\\'404.html\\\'" class="exhibition-card');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
