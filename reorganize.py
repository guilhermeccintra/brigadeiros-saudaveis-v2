import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract the Bonus Section
bonus_pattern = re.compile(r'(<!-- Bonuses -->\s*<section class="bonus-section".*?</section>\s*)', re.DOTALL)
bonus_match = bonus_pattern.search(content)
if not bonus_match:
    print("Bonus section not found!")
    exit(1)

bonus_html = bonus_match.group(1)

# Remove Bonus section from original
content = content.replace(bonus_html, '')

# 2. Extract the Testimonials Section
test_pattern = re.compile(r'(<!-- Testimonials -->\s*<section class="testimonials-section".*?</section>\s*)', re.DOTALL)
test_match = test_pattern.search(content)
if test_match:
    test_html = test_match.group(1)
    # Remove old Testimonial section
    content = content.replace(test_html, '')
else:
    print("Testimonials section not found!")

# 3. Create the NEW Testimonials Section (Carousel)
new_test_html = """    <!-- Testimonials -->
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
"""

# 4. Insert Bonus and NEW Testimonials BEFORE '<!-- Visual Proof / Demonstrativo -->'
insertion_point = '    <!-- Visual Proof / Demonstrativo -->'
new_chunk = bonus_html + new_test_html + '\n' + insertion_point

content = content.replace(insertion_point, new_chunk)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html successfully reorganized and modified.")
