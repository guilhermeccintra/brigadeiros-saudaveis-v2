document.addEventListener('DOMContentLoaded', () => {
    // Schedule non-critical work when browser is idle to optimize main thread
    const scheduleWork = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

    // Preserve the accordion behavior, with keyboard access and independent groups.
    document.querySelectorAll('.faq-accordion').forEach((accordion, groupIndex) => {
        const items = Array.from(accordion.querySelectorAll('.faq-item'));
        const setExpanded = (item, expanded) => {
            item.classList.toggle('active', expanded);
            item.querySelector('.faq-question').setAttribute('aria-expanded', String(expanded));
            const answer = item.querySelector('.faq-answer');
            answer.setAttribute('aria-hidden', String(!expanded));
            answer.inert = !expanded;
        };
        items.forEach((item, itemIndex) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!question || !answer) return;
            answer.id = answer.id || `faq-answer-${groupIndex}-${itemIndex}`;
            question.setAttribute('aria-controls', answer.id);
            if (question.tagName !== 'BUTTON') {
                question.setAttribute('role', 'button');
                question.tabIndex = 0;
                question.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        question.click();
                    }
                });
            }
            setExpanded(item, item.classList.contains('active'));
            question.addEventListener('click', () => {
                const expanded = item.classList.contains('active');
                items.forEach(other => setExpanded(other, false));
                if (!expanded) setExpanded(item, true);
            });
        });
    });

    scheduleWork(() => {
        // Reveal animations using IntersectionObserver
        const reveals = document.querySelectorAll('.reveal-left, .reveal-right');
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -150px 0px',
                threshold: 0
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const reveal = entry.target;
                        if (reveal.classList.contains('reveal-left')) {
                            reveal.style.animation = 'fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                        } else if (reveal.classList.contains('reveal-right')) {
                            reveal.style.animation = 'fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s backwards';
                        }
                        observer.unobserve(reveal);
                    }
                });
            }, observerOptions);

            reveals.forEach(reveal => revealObserver.observe(reveal));
        }
    });

    scheduleWork(() => {
        // Inject current date into promo bar and bonus section
        injectCurrentDate();
        // Start Promo Timer
        startPromoTimer();
    });
});



// ==========================================
// PROMO TIMER LOGIC
// ==========================================
function startPromoTimer() {
    const timerDisplay = document.getElementById('countdown');
    if (!timerDisplay) return;

    function updateTimer() {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        let diff = endOfDay - now;
        if (diff < 0) diff = 0;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        timerDisplay.textContent = 
            String(hours).padStart(2, '0') + ':' + 
            String(mins).padStart(2, '0') + ':' + 
            String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
    updateTimer();
}

// ==========================================
// CURRENT DATE INJECTION
// ==========================================
function injectCurrentDate() {
    const now = new Date();
    const formatted = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const promoDate = document.getElementById('promo-date');
    if (promoDate) promoDate.textContent = formatted;

    const bonusDate = document.getElementById('bonus-date');
    if (bonusDate) bonusDate.textContent = formatted;
}



document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href="#offer-box"]').forEach(function (botao) {
        botao.addEventListener('click', function (e) {
            const destino = document.getElementById('offer-box') || document.querySelector('.offer-box');

            if (destino) {
                e.preventDefault();

                destino.focus({ preventScroll: true });
                destino.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

