// Mobile navigation toggle
(function () {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksWrapper = document.querySelector('.nav-links');

    if (!nav || !navToggle || !navLinksWrapper) return;

    const closeNav = () => {
        nav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinksWrapper.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            e.preventDefault();

            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            closeNav();
        });
    });
})();
