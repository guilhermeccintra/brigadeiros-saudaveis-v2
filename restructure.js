const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Reestruturação do Cabeçalho (Bloco 1)
const heroText = $('.hero-text');

// Remover os textos puros de receitas
heroText.find('.subheadline').remove();

// Remover o preço (Bloco pricing)
heroText.find('.pricing').remove();

// Mover o faq-accordion para o Hero
const faqAccordion = $('.faq-accordion').clone();
// Limpar margens do faq-accordion para encaixar bem
faqAccordion.css('width', '100%');
faqAccordion.css('max-width', '800px');
faqAccordion.css('margin', '0 auto 2rem auto');
faqAccordion.css('text-align', 'left');

// Inserir o faqAccordion logo apoós a imagem do hero
heroText.find('.hero-image').after(faqAccordion);

// Remover o botão cta e safe-checkout do hero
heroText.find('.cta-btn').remove();
heroText.find('.safe-checkout').remove();

// 2. Remover a faq-section do Bloco 2 original
$('section.faq-section').first().remove();

// Remover todos os botões CTA exceto o da offer-section
$('a.cta-btn').not('.offer-section a.cta-btn').remove();

// 3. Reordenamento Completo
// Extrair HTML e remover
const getAndRemove = (selector) => {
    const el = $(selector);
    const htmlStr = $.html(el);
    el.remove();
    return htmlStr;
};

const idealForSectionHTML = getAndRemove('.ideal-for-section');
const benefitsSectionHTML = getAndRemove('.benefits-section');
const proofSectionHTML = getAndRemove('.proof-section');
const bonusSectionHTML = getAndRemove('.bonus-section');
const testimonialsSectionHTML = getAndRemove('.testimonials-section');

// Process Guarantee Section HTML
const guaranteeSection = $('.guarantee-section');
guaranteeSection.attr('style', 'padding: 4rem 0 0 0; background: var(--bg-light); border: none;');
const guaranteeContainer = guaranteeSection.find('.container.text-center');
guaranteeContainer.attr('style', 'max-width: 800px; padding: 1rem 2rem; margin: 0 auto;');
guaranteeContainer.find('p').attr('style', 'color: var(--text-dark); line-height: 1.8; font-size: 1.1rem; margin-bottom: 1rem;');
const guaranteeSectionHTML = getAndRemove('.guarantee-section');

// Offer Section: Keep it strong as the final highlight.
const offerSection = $('.offer-section');
offerSection.attr('style', 'padding: 2rem 0 5rem 0; background: var(--bg-light);');
const offerSectionHTML = getAndRemove('.offer-section');

const secondFaqSectionHTML = getAndRemove('section.faq-section');
getAndRemove('.assortment-section'); // Removed completely

// Create Recipes Carousel
const recipesCarouselHTML = `
    <!-- Recipes Carousel -->
    <section class="recipes-carousel-section" style="overflow: hidden; padding: 4rem 0 0 0; background: var(--bg-light);">
        <div class="container text-center" style="margin-bottom: 2rem;">
            <h2 class="section-title">Receitas feitas com <span class="highlight">esta coleção</span></h2>
        </div>
        <div class="carousel-wrapper" style="background: transparent; padding: 0;">
            <div class="carousel-track" style="animation-duration: 40s;">
                <!-- Set 1 -->
                <img src="assets/receitas01.webp" alt="Receita 1" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas02.webp" alt="Receita 2" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas03.webp" alt="Receita 3" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas04.webp" alt="Receita 4" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas05.webp" alt="Receita 5" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas06.webp" alt="Receita 6" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas07.webp" alt="Receita 7" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas08.webp" alt="Receita 8" class="recipe-img" width="500" height="500" loading="lazy">
                <!-- Set 2 -->
                <img src="assets/receitas01.webp" alt="Receita 1" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas02.webp" alt="Receita 2" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas03.webp" alt="Receita 3" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas04.webp" alt="Receita 4" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas05.webp" alt="Receita 5" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas06.webp" alt="Receita 6" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas07.webp" alt="Receita 7" class="recipe-img" width="500" height="500" loading="lazy">
                <img src="assets/receitas08.webp" alt="Receita 8" class="recipe-img" width="500" height="500" loading="lazy">
            </div>
        </div>
    </section>
`;

const main = $('main');
main.empty(); // Clear main
main.append(idealForSectionHTML);
main.append(benefitsSectionHTML);
main.append(proofSectionHTML);
main.append(recipesCarouselHTML);
main.append(bonusSectionHTML);
main.append(testimonialsSectionHTML);
main.append(guaranteeSectionHTML);
main.append(offerSectionHTML);
main.append(secondFaqSectionHTML);

fs.writeFileSync('index.html', $.html());
console.log('DOM Successfully Updated!');
