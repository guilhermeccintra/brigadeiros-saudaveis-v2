const fs = require('fs');

// Fix index.html
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove yellow styling from "O QUE VOCÊ VAI APRENDER"
html = html.replace(
  'style="background: rgba(235, 182, 108, 0.2); color: var(--accent); \r\nmargin-bottom: 1rem;">O QUE VOCÊ VAI APRENDER',
  'style="margin-bottom: 1rem;">O QUE VOCÊ VAI APRENDER'
);
// Also try single line version just in case
html = html.replace(
  'style="background: rgba(235, 182, 108, 0.2); color: var(--accent); margin-bottom: 1rem;">O QUE VOCÊ VAI APRENDER',
  'style="margin-bottom: 1rem;">O QUE VOCÊ VAI APRENDER'
);

// 2. Fix H4 to H3
html = html.replace(/<h4>Guia de Substituições Inteligentes<\/h4>/g, '<h3>Guia de Substituições Inteligentes</h3>');
html = html.replace(/<h4>Adoçantes Naturais na Prática<\/h4>/g, '<h3>Adoçantes Naturais na Prática</h3>');
html = html.replace(/<h4>Dicas de Preparo e Conservação<\/h4>/g, '<h3>Dicas de Preparo e Conservação</h3>');

// 3. Remove reveal effects
html = html.replace('<div class="proof-img reveal-left">', '<div class="proof-img">');
html = html.replace('<div class="proof-text reveal-right">', '<div class="proof-text">');

fs.writeFileSync('index.html', html);

// Fix style.css
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(
  '.urgency-banner {\r\n    background: #FFECB3;\r\n    color: #b7790b;\r\n    text-align: center;\r\n    padding: 15px;\r\n    border-radius: 10px;',
  '.urgency-banner {\r\n    background: #FFECB3;\r\n    color: var(--primary);\r\n    font-weight: 700;\r\n    text-align: center;\r\n    padding: 15px;\r\n    border-radius: 10px;'
);
// fallback for lf
css = css.replace(
  '.urgency-banner {\n    background: #FFECB3;\n    color: #b7790b;\n    text-align: center;\n    padding: 15px;\n    border-radius: 10px;',
  '.urgency-banner {\n    background: #FFECB3;\n    color: var(--primary);\n    font-weight: 700;\n    text-align: center;\n    padding: 15px;\n    border-radius: 10px;'
);

fs.writeFileSync('style.css', css);
