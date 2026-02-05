// Lightbox modal functionality
(function () {
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close" title="Close (or press Esc)">✕</button>
            <button class="lightbox-prev" aria-label="Previous" title="Previous (or press ←)">‹</button>
            <div class="lightbox-media"></div>
            <button class="lightbox-next" aria-label="Next" title="Next (or press →)">›</button>
            <div class="lightbox-caption"></div>
            <div class="lightbox-counter"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');
    const mediaContainer = modal.querySelector('.lightbox-media');
    const captionEl = modal.querySelector('.lightbox-caption');
    const counterEl = modal.querySelector('.lightbox-counter');

    let currentIndex = 0;
    let items = [];

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openModal(itemsList, startIndex = 0) {
        items = itemsList;
        currentIndex = startIndex;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        showItem();
    }

    function showItem() {
        if (!items.length) return;

        const item = items[currentIndex];
        mediaContainer.innerHTML = '';

        // Support both images and videos
        if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            mediaContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            mediaContainer.appendChild(img);
        }

        if (captionEl) captionEl.textContent = item.alt || '';
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${items.length}`;

        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentIndex === items.length - 1 ? '0.3' : '1';
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === items.length - 1;
    }

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showItem();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            showItem();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            showItem();
        }
        if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
            currentIndex++;
            showItem();
        }
    });

    // Expose to global scope so gallery can use it
    window.openLightbox = openModal;
})();
