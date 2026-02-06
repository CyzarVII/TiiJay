/**
 * GALLERY GRID MODULE
 * 
 * This file creates the gallery grid that displays photos and videos in pages.
 * When you click on any photo or video, it opens a fullscreen lightbox viewer.
 * 
 * How it works:
 * 1. Stores all gallery items (photos and videos) in an array
 * 2. Shows 6 items per page
 * 3. Prev/Next buttons let you browse through different pages
 * 4. Clicking any item opens it in the lightbox modal
 */
(function () {
    // How many items to show per page (6 photos/videos at a time)
    const PAGE_SIZE = 6;

    // Array of all gallery items - mix of photos and videos
    const gallery = [
        { type: "image", src: "images/gallery-1.jpg", alt: "A moment I'll always smile at" },
        { type: "image", src: "images/gallery-2.jpg", alt: "You, looking perfect without trying" },
        { type: "image", src: "images/gallery-3.jpg", alt: "Us, in our own little world" },
        { type: "image", src: "images/gallery-4.jpg", alt: "The kind of memory I replay" },
        { type: "image", src: "images/gallery-5.jpg", alt: "Your smile. Enough said" },
        { type: "image", src: "images/gallery-6.jpg", alt: "The moment I wished time would slow down" },

        { type: "image", src: "images/gallery-7.jpg", alt: "The night we laughed more than we planned to" },
        { type: "image", src: "images/gallery-8.jpg", alt: "You, glowing without even trying" },
        { type: "image", src: "images/gallery-9.jpg", alt: "One of my favourite views of us" },
        { type: "image", src: "images/gallery-10.jpg", alt: "Look at you, sleeping peacefully" },
        { type: "image", src: "images/gallery-11.jpg", alt: "Our Gym night" },
        { type: "image", src: "images/gallery-12.jpg", alt: "Stevie's wedding, my gosh you were beautiful" },

        { type: "image", src: "images/gallery-13.jpg", alt: "Music fest" },
        { type: "image", src: "images/gallery-14.jpg", alt: "Just, you being beautiful" },
        { type: "image", src: "images/gallery-15.jpg", alt: "Catamarang night" },
        { type: "image", src: "images/gallery-16.jpg", alt: "The family, soon mine will be together in the picture too" },
        { type: "image", src: "images/gallery-17.jpeg", alt: "Nevis Date, soon to return" },
        { type: "image", src: "images/gallery-18.jpeg", alt: "Your beautiful smile captivates me" },
        { type: "image", src: "images/gallery-19.jpeg", alt: "Sports day, I still rep Sandy Point though" },
        { type: "image", src: "images/gallery-20.jpeg", alt: "Grace's Baby Shower" },
        { type: "image", src: "images/gallery-21.jpeg", alt: "You are such a character" },
        { type: "image", src: "images/gallery-22.jpeg", alt: "Christmas Dinner, we definitely look like we're married already" },
        { type: "image", src: "images/gallery-23.jpeg", alt: "Our family, soon to have mine with yours" },
        { type: "image", src: "images/gallery-24.jpeg", alt: "Date night at boozies, you had my staring at you all night" },
        { type: "image", src: "images/gallery-25.jpeg", alt: "Beach day when you looking so fine" },
      

        // TO ADD VIDEOS: Use the same format but set type to "video" instead of "image"
        // Example: { type: "video", src: "videos/my-video.mp4", alt: "Video description" }
        { type: "video", src: "videos/video-1.mp4", alt: "Stevie's Game night" },
        { type: "video", src: "videos/video-2.mp4", alt: "Music Fest night" },
        { type: "video", src: "videos/video-3.mp4", alt: "Us at home" },
        { type: "video", src: "videos/video-4.mp4", alt: "My beautiful woman" },
        
    ]; 
    
    // End of gallery array

    // Find the HTML elements that hold our gallery
    const container = document.querySelector(".gallery-grid"); // The grid that shows photos/videos
    const prevBtn = document.getElementById("gallery-prev"); // "Previous" button
    const nextBtn = document.getElementById("gallery-next"); // "Next" button

    // Stop if we can't find the elements on the page
    if (!container || !prevBtn || !nextBtn) return;

    // Keep track of which page we're on (starts at 0)
    let currentPage = 0;

    /**
     * Render the current page of gallery items
     * This function:
     * 1. Clears the old items
     * 2. Creates new gallery item elements for the current page
     * 3. Adds click handlers so clicking opens the lightbox
     * 4. Disables Prev/Next buttons at the beginning/end
     */
    function renderPage() {
        container.innerHTML = "";

        // Figure out which items to show on this page
        const start = currentPage * PAGE_SIZE; // Starting position
        const end = Math.min(start + PAGE_SIZE, gallery.length); // Ending position

        // Loop through each item on this page and create an HTML element for it
        for (let i = start; i < end; i++) {
            const item = gallery[i];
            const div = document.createElement("div");
            div.className = "gallery-item"; // CSS styling for gallery items
            div.setAttribute('role', 'button');
            div.setAttribute('tabindex', '0');
            
            // Track which gallery item this is for CSS targeting
            const galleryIndex = i + 1;
            div.setAttribute('data-gallery', `gallery-${galleryIndex}`);
            
            if (item.type === "video") {
                div.classList.add("gallery-video");
                // Use thumbnail image for video items
                const thumbnailSrc = item.src.replace("videos/", "images/").replace(".mp4", "-thumb.svg");
                div.innerHTML = `
                    <img src="${thumbnailSrc}" alt="${item.alt}" style="width: 100%; height: 100%; object-fit: cover;">
                    <span class="video-icon">▶</span>
                `;
            } else {
                div.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
            }
            
            // When someone clicks this item, open it in the lightbox viewer
            div.addEventListener("click", () => {
                if (window.openLightbox) {
                    // Open the lightbox and show this specific item
                    window.openLightbox(gallery, i);
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

        // Calculate the highest page number we can go to
        const maxPage = Math.floor((gallery.length - 1) / PAGE_SIZE);
        // Disable "Previous" button if we're on the first page
        prevBtn.disabled = currentPage === 0;
        // Disable "Next" button if we're on the last page
        nextBtn.disabled = currentPage >= maxPage;
    }

    // "Previous" button - go back one page
    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--; // Move to previous page
            renderPage(); // Show the new page
        }
    });

    // "Next" button - go forward one page
    nextBtn.addEventListener("click", () => {
        const maxPage = Math.floor((gallery.length - 1) / PAGE_SIZE);
        if (currentPage < maxPage) {
            currentPage++; // Move to next page
            renderPage(); // Show the new page
        }
    });

    // Show the first page when the page loads
    renderPage();
})();
