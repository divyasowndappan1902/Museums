const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Admin\\Desktop\\Museum theme';

// 1. Clean HTML files
const htmlFiles = ['index.html', 'about.html', 'exhibitions.html', 'gallery.html'];
htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/class="active-nav"/g, '');
    content = content.replace(/style="color:var\(--gold\);"/g, '');
    // cleanup empty class attribute if any left
    content = content.replace(/class="\s*"/g, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ${file}`);
  }
});

// 2. Add CSS
const cssPath = path.join(dir, 'css', 'style.css');
if (fs.existsSync(cssPath)) {
  let content = fs.readFileSync(cssPath, 'utf8');
  if (!content.includes('.active-nav')) {
    content += '\n\n/* Active Nav Class */\n.nav-links a.active-nav {\n  color: var(--gold) !important;\n}\n';
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Updated style.css');
  }
}

// 3. Add JS Logic
const jsPath = path.join(dir, 'js', 'main.js');
if (fs.existsSync(jsPath)) {
  let content = fs.readFileSync(jsPath, 'utf8');
  if (!content.includes('Active Nav Logic')) {
    content += `

// ================================================
// Active Nav Logic
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  
  navLinks.forEach(link => {
    try {
      const linkPath = new URL(link.href).pathname;
      const isIndex = linkPath.endsWith('index.html');
      
      if (currentPath === linkPath || 
          (currentPath.endsWith('/') && isIndex) ||
          (currentPath === '/' && isIndex)) {
        link.classList.add('active-nav');
      } else {
        link.classList.remove('active-nav');
      }
    } catch(e) {
      // ignore invalid URLs
    }
  });
});
`;
    fs.writeFileSync(jsPath, content, 'utf8');
    console.log('Updated main.js');
  }
}
