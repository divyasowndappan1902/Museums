const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Admin\\Desktop\\Museum theme';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const faLink = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add FontAwesome if not exists
  if (!content.includes('font-awesome')) {
    content = content.replace('</head>', `  ${faLink}\n</head>`);
  }

  // Replace Icons
  let matches = 0;
  content = content.replace(/<span class="footer-contact-icon">.*?<\/span>/gs, (match) => {
    matches++;
    if (matches === 1) {
      return `<span class="footer-contact-icon"><i class="fa-solid fa-location-dot" style="color: #e83e8c;"></i></span>`;
    } else if (matches === 2) {
      return `<span class="footer-contact-icon"><i class="fa-solid fa-phone" style="color: #e83e8c;"></i></span>`;
    } else if (matches === 3) {
      return `<span class="footer-contact-icon"><i class="fa-regular fa-envelope" style="color: var(--gold);"></i></span>`;
    }
    return match; // If there are more for some reason
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
