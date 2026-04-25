const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Extract Bonus Section
const bonusMatch = content.match(/(<!-- Bonuses -->[\s\S]*?<section class="bonus-section" id="bonus">[\s\S]*?<\/section>\s*)/);
if (!bonusMatch) {
    console.error("Bonus section not found!");
    process.exit(1);
}
const bonusHtml = bonusMatch[1];
content = content.replace(bonusHtml, '');

// 2. Extract Testimonials Section
const testMatch = content.match(/(<!-- Testimonials -->[\s\S]*?<section class="testimonials-section">[\s\S]*?<\/section>\s*)/);
if (testMatch) {
    content = content.replace(testMatch[1], '');
} else {
    console.error("Testimonials section not found!");
}

// 3. Create NEW Testimonials Section
const newTestHtml = `    <!-- Testimonials -->
    <section class="testimonials-section" style="overflow: hidden;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 2rem;">
                <span class="badge"
                    style="background: rgba(235, 182, 108, 0.2); color: var(--accent); margin-bottom: 1rem;">O QUE ELAS
                    DIZEM</span>
                <h2 class="section-title">Resultados de nossas <span class="highlight">alunas</span></h2>
            </div>
        </div>

        <div class="carousel-wrapper">
            <div class="carousel-track">
                <img src="assets/depoimento01.webp" alt="Depoimento 1" class="carousel-img">
                <img src="assets/depoimento02.webp" alt="Depoimento 2" class="carousel-img">
                <img src="assets/depoimento03.webp" alt="Depoimento 3" class="carousel-img">
                <img src="assets/depoimento04.webp" alt="Depoimento 4" class="carousel-img">
                <!-- Duplicados para o efeito infinito -->
                <img src="assets/depoimento01.webp" alt="Depoimento 1" class="carousel-img">
                <img src="assets/depoimento02.webp" alt="Depoimento 2" class="carousel-img">
                <img src="assets/depoimento03.webp" alt="Depoimento 3" class="carousel-img">
                <img src="assets/depoimento04.webp" alt="Depoimento 4" class="carousel-img">
            </div>
        </div>
    </section>
`;

// 4. Insert both before '<!-- Visual Proof / Demonstrativo -->'
const insertionPoint = '    <!-- Visual Proof / Demonstrativo -->';
const newChunk = bonusHtml + newTestHtml + '\\n' + insertionPoint;

content = content.replace(insertionPoint, newChunk);

fs.writeFileSync('index.html', content, 'utf8');
console.log("index.html successfully reorganized and modified.");
