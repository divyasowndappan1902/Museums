const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Find the Explore block and Visit block in footer
    // They are within:
    // <h3 class="footer-col-title">Explore</h3>
    // ...
    // </ul>
    // Same for Visit.

    // Regex to match the Explore and Visit blocks and replace hrefs inside them
    
    function replaceHrefs(match) {
        return match.replace(/href="[^"]+"/g, 'href="404.html"');
    }

    let newContent = content;
    
    // Replace Explore block
    newContent = newContent.replace(/(<h3 class="footer-col-title">Explore<\/h3>\s*<ul class="footer-links">)([\s\S]*?)(<\/ul>)/g, (match, p1, p2, p3) => {
        return p1 + replaceHrefs(p2) + p3;
    });

    // Replace Visit block
    newContent = newContent.replace(/(<h3 class="footer-col-title">Visit<\/h3>\s*<ul class="footer-links">)([\s\S]*?)(<\/ul>)/g, (match, p1, p2, p3) => {
        return p1 + replaceHrefs(p2) + p3;
    });

    if (content !== newContent) {
        fs.writeFileSync(path.join(dir, file), newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
