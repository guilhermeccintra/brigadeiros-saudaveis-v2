// Progressive enhancement: retain the original CSS carousel loops.
document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.querySelectorAll('.carousel-toggle').forEach(button => {
        const track = document.getElementById(button.getAttribute('aria-controls'));
        const label = button.querySelector('.carousel-toggle-label');
        if (!track || !label) return;

        let paused = reducedMotion.matches;
        const render = () => {
            track.classList.toggle('is-paused', paused);
            track.classList.toggle('is-playing', !paused);
            button.setAttribute('aria-pressed', String(paused));
            label.textContent = paused ? 'Retomar carrossel' : 'Pausar carrossel';
        };

        button.addEventListener('click', () => {
            paused = !paused;
            render();
        });
        if (reducedMotion.addEventListener) {
            reducedMotion.addEventListener('change', event => {
                paused = event.matches;
                render();
            });
        }
        render();
        button.hidden = false;
    });
});
