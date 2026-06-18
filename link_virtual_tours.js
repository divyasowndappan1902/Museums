const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\Admin\\Desktop\\Museum theme\\exhibitions.html';
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace <div class="virtual-card... with <div class="virtual-card... onclick="..." style="cursor:pointer;"
  content = content.replace(/<div class="virtual-card(.*?)"\s*>/g, '<div class="virtual-card$1" onclick="window.location.href=\\\'404.html\\\'" style="cursor:pointer;">');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Linked virtual tours to 404.html');
}
