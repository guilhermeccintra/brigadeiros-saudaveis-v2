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

    // Show the fixed campaign countdown as soon as the page is ready.
    startPromoTimer();
});



// ==========================================
// PROMO TIMER LOGIC
// ==========================================
function startPromoTimer() {
    const timerDisplay = document.getElementById('countdown');
    if (!timerDisplay) return;

    // Midnight on 01/12 marks the end of 30/11 in Brasília (UTC-3).
    // This fixed 2026 deadline never resets at midnight or in a later year.
    const campaignEndsAt = new Date('2026-12-01T00:00:00-03:00').getTime();

    function updateTimer() {
        const totalSeconds = Math.max(0, Math.ceil((campaignEndsAt - Date.now()) / 1000));

        if (totalSeconds === 0) {
            timerDisplay.textContent = 'ENCERRADA';
            timerDisplay.setAttribute('aria-label', 'Black November encerrada');
            document.querySelectorAll('[data-campaign-ended]').forEach(element => {
                element.textContent = element.dataset.campaignEnded;
            });
            return false;
        }

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        timerDisplay.textContent = `${String(days).padStart(2, '0')}d ` +
            [hours, mins, secs].map(value => String(value).padStart(2, '0')).join(':');
        timerDisplay.setAttribute('aria-label', `${days} dias, ${hours} horas, ${mins} minutos e ${secs} segundos para o fim da Black November`);
        return true;
    }

    if (!updateTimer()) return;
    const intervalId = setInterval(() => {
        if (!updateTimer()) clearInterval(intervalId);
    }, 1000);
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

