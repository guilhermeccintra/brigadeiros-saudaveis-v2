const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldTrack = `                <img src="assets/depoimento01.webp" alt="Depoimento 1" class="carousel-img">
                <img src="assets/depoimento02.webp" alt="Depoimento 2" class="carousel-img">
                <img src="assets/depoimento03.webp" alt="Depoimento 3" class="carousel-img">
                <img src="assets/depoimento04.webp" alt="Depoimento 4" class="carousel-img">
                <!-- Duplicados para o efeito infinito -->
                <img src="assets/depoimento01.webp" alt="Depoimento 1" class="carousel-img">
                <img src="assets/depoimento02.webp" alt="Depoimento 2" class="carousel-img">
                <img src="assets/depoimento03.webp" alt="Depoimento 3" class="carousel-img">
                <img src="assets/depoimento04.webp" alt="Depoimento 4" class="carousel-img">`;

const baseSet = `                <img src="assets/depoimento01.webp" alt="Depoimento 1" class="carousel-img">
                <img src="assets/depoimento02.webp" alt="Depoimento 2" class="carousel-img">
                <img src="assets/depoimento03.webp" alt="Depoimento 3" class="carousel-img">
                <img src="assets/depoimento04.webp" alt="Depoimento 4" class="carousel-img">
`;

// 12 sets = 48 images
let newTrack = '';
for(let i=0; i<12; i++) {
    newTrack += baseSet;
}

html = html.replace(oldTrack, newTrack);
fs.writeFileSync('index.html', html, 'utf8');
console.log("Images multiplied");
