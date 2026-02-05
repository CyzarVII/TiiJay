/**
 * LIGHTBOX MODAL MODULE
 * 
 * This creates a fullscreen viewer for photos and videos.
 * When you click a photo/video in the gallery, this module:
 * 1. Opens a large modal overlay
 * 2. Shows the photo or video at full size
 * 3. Lets you navigate with Prev/Next buttons or arrow keys
 * 4. Shows a caption describing the item
 * 5. Can be closed by pressing Esc key or clicking the close button
 */
(function () {
    // Create the modal HTML structure - this is where photos/videos will appear
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
        <div class="lightbox-content">
            <!-- Close button (Esc key also works) -->
            <button class="lightbox-close" aria-label="Close" title="Close (or press Esc)">✕</button>
            <!-- Previous button (← arrow key also works) -->
            <button class="lightbox-prev" aria-label="Previous" title="Previous (or press ←)">‹</button>
            <!-- This is where the photo or video goes -->
            <div class="lightbox-media"></div>
            <!-- Next button (→ arrow key also works) -->
            <button class="lightbox-next" aria-label="Next" title="Next (or press →)">›</button>
            <!-- Caption describing the current item -->
            <div class="lightbox-caption"></div>
            <!-- Counter showing what item we're viewing (e.g., "2 / 10") -->
            <div class="lightbox-counter"></div>
        </div>
    `;
    // Add the modal to the page (hidden until opened)
    document.body.appendChild(modal);

    // Get references to all the buttons and containers we'll use
    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');
    const mediaContainer = modal.querySelector('.lightbox-media'); // Where photos/videos go
    const captionEl = modal.querySelector('.lightbox-caption'); // Description text
    const counterEl = modal.querySelector('.lightbox-counter'); // "X / Y" counter

    // Track which item we're currently viewing
    let currentIndex = 0;
    // Store the list of all items to display
    let items = [];

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable page scrolling
    }

    function openModal(itemsList, startIndex = 0) {
        items = itemsList; // Store the list of items
        currentIndex = startIndex; // Remember which one we clicked
        modal.classList.add('active'); // Show the modal
        document.body.style.overflow = 'hidden'; // Prevent page scrolling while modal is open
        showItem(); // Display the current item
    }

    function showItem() {
        if (!items.length) {
            return; // Stop if there are no items
        }

        const item = items[currentIndex];
        mediaContainer.innerHTML = ''; // Clear the old item

        // CHECK THE TYPE OF ITEM (VIDEO or IMAGE)
        if (item.type === 'video') {
            // CREATE A VIDEO PLAYER
            const video = document.createElement('video');
            video.controls = true; // Show play/pause controls
            video.autoplay = true; // Automatically start playing
            video.style.width = '100%';
            video.style.height = 'auto';
            video.style.maxHeight = '70vh'; // Don't go taller than 70% of screen
            
            // Create the source element (required for reliable video playback)
            const source = document.createElement('source');
            source.src = item.src; // Path to the video file
            source.type = 'video/mp4'; // Tells browser this is an MP4 file
            video.appendChild(source);
            
            // Fallback text if browser doesn't support videos
            video.innerHTML += 'Your browser does not support the video tag.';
            mediaContainer.appendChild(video);
            
            // Try to auto-play the video (some browsers may block this)
            setTimeout(() => {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            }, 100);
        } else {
            // CREATE AN IMAGE
            const img = document.createElement('img');
            img.src = item.src; // Path to the image file
            img.alt = item.alt; // Description of the image
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            mediaContainer.appendChild(img);
        }

        // UPDATE THE CAPTION AND COUNTER
        if (captionEl) captionEl.textContent = item.alt || ''; // Show the description
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${items.length}`; // Show "2 of 10"

        // DISABLE BUTTONS AT THE START AND END
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1'; // Fade out if on first item
        nextBtn.style.opacity = currentIndex === items.length - 1 ? '0.3' : '1'; // Fade out if on last item
        prevBtn.disabled = currentIndex === 0; // Disable if on first item
        nextBtn.disabled = currentIndex === items.length - 1; // Disable if on last item
    }

    // BUTTON CLICK HANDLERS
    // Close button
    closeBtn.addEventListener('click', closeModal);
    
    // Previous button - show the item before this one
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showItem();
        }
    });
    
    // Next button - show the item after this one
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            showItem();
        }
    });

    // CLICK OUTSIDE THE MODAL
    // If you click on the dark area outside the modal, it closes
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // KEYBOARD NAVIGATION
    // Allow arrow keys and Escape to control the lightbox
    document.addEventListener('keydown', (e) => {
        // Only do this if the lightbox is actually open
        if (!modal.classList.contains('active')) return;
        
        // Escape key closes the modal
        if (e.key === 'Escape') closeModal();
        
        // Left arrow goes to previous item
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            showItem();
        }
        
        // Right arrow goes to next item
        if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
            currentIndex++;
            showItem();
        }
    });

    // Make the openModal function available to other scripts (like gallery.js)
    // This is how gallery.js can trigger the lightbox
    window.openLightbox = openModal;
})();
