const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Line 61 and 457
html = html.replace(
  'style="font-size: 1rem; opacity: 0.8; margin-top: 0; margin-bottom: 1.5rem; font-weight: 500; color: #555;"',
  'style="font-size: 1rem; opacity: 1; margin-top: 0; margin-bottom: 1.5rem; font-weight: 600; color: var(--green);"'
);
html = html.replace(
  'style="text-align: center; font-size: 1rem; opacity: 0.8; margin-top: 0; margin-bottom: 2rem; font-weight: 500; color: #555;"',
  'style="text-align: center; font-size: 1rem; opacity: 1; margin-top: 0; margin-bottom: 2rem; font-weight: 600; color: var(--green);"'
);

// 2. Line 289 (O QUE ELAS DIZEM)
html = html.replace(
  'style="background: rgba(235, 182, 108, 0.2); color: var(--accent); margin-bottom: 1rem;">O QUE ELAS',
  'style="margin-bottom: 1rem;">O QUE ELAS'
);

// 3. Remove .glass-tag
html = html.replace(
  '<div class="glass-tag">Saudável e Delicioso</div>',
  ''
);

// 4. Update title class
html = html.replace(
  '<h2 class="title">Sinta o sabor de um doce de verdade, <span class="highlight-alt">sem culpa.</span>',
  '<h2 class="section-title">Sinta o sabor de um doce de verdade, <span class="highlight">sem culpa.</span>'
);

// 5. Add Main landmark
html = html.replace('</header>', '</header>\n<main>');
html = html.replace('<footer class="site-footer">', '</main>\n<footer class="site-footer">');

fs.writeFileSync('index.html', html);
