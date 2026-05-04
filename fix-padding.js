const fs = require('fs');

// 1. Fix index.html
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/padding: 4rem 0;/g, 'padding: 3rem 0;');
html = html.replace(/padding: 4rem 0 3rem 0;/g, 'padding: 3rem 0;');
html = html.replace(/padding: 4rem 0 0 0;/g, 'padding: 3rem 0 0 0;');
html = html.replace(/padding: 2rem 0 5rem 0;/g, 'padding: 2rem 0 4rem 0;');

fs.writeFileSync('index.html', html);

// 2. Fix style.css
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/padding: 3\.5rem 0;/g, 'padding: 3rem 0;');
css = css.replace(/padding: 5rem 0 0 0;/g, 'padding: 3rem 0 0 0;');
css = css.replace(/padding: 3rem 0 4rem;/g, 'padding: 3rem 0;');
css = css.replace(/padding: 3\.5rem 0 1rem 0;/g, 'padding: 3rem 0 1rem 0;');
css = css.replace(/padding: 4rem 0;/g, 'padding: 3rem 0;'); // any stragglers
css = css.replace(/padding: 4rem 3rem;/g, 'padding: 3rem 2rem;');

fs.writeFileSync('style.css', css);
console.log('Padding standardized across all sections.');
