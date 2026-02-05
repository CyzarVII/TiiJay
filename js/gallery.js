// Gallery grid pagination with lightbox support
(function () {
    const PAGE_SIZE = 6;

    const gallery = [
        { type: "image", src: "images/gallery-1.jpg", alt: "A moment I'll always smile at." },
        { type: "image", src: "images/gallery-2.jpg", alt: "You, looking perfect without trying." },
        { type: "image", src: "images/gallery-3.jpg", alt: "Us, in our own little world." },
        { type: "image", src: "images/gallery-4.jpg", alt: "The kind of memory I replay." },
        { type: "image", src: "images/gallery-5.jpg", alt: "Your smile. Enough said." },
        { type: "image", src: "images/gallery-6.jpg", alt: "The moment I wished time would slow down." },

        { type: "image", src: "images/gallery-7.jpg", alt: "The night we laughed more than we planned to." },
        { type: "image", src: "images/gallery-8.jpg", alt: "You, glowing without even trying." },
        { type: "image", src: "images/gallery-9.jpg", alt: "One of my favourite views of us." },
        { type: "image", src: "images/gallery-10.jpg", alt: "Look at you, sleeping peacefully." },
        { type: "image", src: "images/gallery-11.jpg", alt: "Our Gym night." },
        { type: "image", src: "images/gallery-12.jpg", alt: "Stevie's wedding, my gosh you were beautiful." },

        { type: "image", src: "images/gallery-13.jpg", alt: "Music fest.." },
        { type: "image", src: "images/gallery-14.jpg", alt: "Just, you being beautiful." },
        { type: "image", src: "images/gallery-15.jpg", alt: "Catamarang night." },
        { type: "image", src: "images/gallery-16.jpg", alt: "The family, soon mine will be together in the picture too." }
        // To add videos, use: { type: "video", src: "images/video.mp4", alt: "Video description" }
    ];

    const container = document.querySelector(".gallery-grid");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");

    if (!container || !prevBtn || !nextBtn) return;

    let currentPage = 0;

    function renderPage() {
        container.innerHTML = "";

        const start = currentPage * PAGE_SIZE;
        const end = Math.min(start + PAGE_SIZE, gallery.length);

        for (let i = start; i < end; i++) {
            const item = gallery[i];
            const div = document.createElement("div");
            div.className = "gallery-item";
            div.setAttribute('role', 'button');
            div.setAttribute('tabindex', '0');
            
            if (item.type === "video") {
                div.classList.add("gallery-video");
                div.innerHTML = `
                    <img src="${item.src}" alt="${item.alt}" style="width: 100%; height: 100%; object-fit: cover;">
                    <span class="video-icon">▶</span>
                `;
            } else {
                div.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
            }
            
            div.addEventListener("click", () => {
                console.log('Gallery item clicked, openLightbox exists:', typeof window.openLightbox);
                if (window.openLightbox) {
                    window.openLightbox(gallery, i);
                } else {
                    console.error('openLightbox not found');
                }
            });
            
            div.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.openLightbox(gallery, i);
                }
            });
            
            container.appendChild(div);

            requestAnimationFrame(() => {
                div.classList.add("is-visible");
            });
        }

        const maxPage = Math.floor((gallery.length - 1) / PAGE_SIZE);
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= maxPage;
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            renderPage();
        }
    });

    nextBtn.addEventListener("click", () => {
        const maxPage = Math.floor((gallery.length - 1) / PAGE_SIZE);
        if (currentPage < maxPage) {
            currentPage++;
            renderPage();
        }
    });

    renderPage();
})();
