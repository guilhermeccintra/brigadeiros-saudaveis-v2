const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Make style.css synchronous
html = html.replace(
  '<link rel="stylesheet" href="style.css" media="print" onload="this.media=\'all\'">',
  '<link rel="stylesheet" href="style.css">'
);

// 2. Make Google Fonts asynchronous
html = html.replace(
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;display=swap" rel="stylesheet">',
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;display=swap" rel="stylesheet" media="print" onload="this.media=\'all\'">'
);

fs.writeFileSync('index.html', html);
console.log('CSS and Font loading strategies updated successfully.');
