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
            <!-- media -->
            <div class="lightbox-media"></div>

            <!-- controls below: arrows sit outside the picture frame and flank the text -->
            <div class="lightbox-controls-below">
                <button class="lightbox-prev" aria-label="Previous" title="Previous (or press ←)">‹</button>

                <div class="lightbox-meta">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>

                <button class="lightbox-next" aria-label="Next" title="Next (or press →)">›</button>
            </div>
        </div>
    `;
    // Add the modal to the page (hidden until opened)
    document.body.appendChild(modal);

    // Get references to all the buttons and containers we'll use
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');
    const mediaContainer = modal.querySelector('.lightbox-media'); // Where photos/videos go
    const captionEl = modal.querySelector('.lightbox-caption'); // Description text
    const counterEl = modal.querySelector('.lightbox-counter'); // "X / Y" counter

    // Track which item we're currently viewing
    let currentIndex = 0;
    // Store the list of all items to display
    let items = [];

    // Swipe / drag state (supports mobile swipe + desktop hold-and-drag)
    const SWIPE_THRESHOLD = 80; // pixels required to trigger navigation
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let isPointerDown = false;
    let isDragging = false;
    let currentMediaEl = null;

    function closeModal() {
        // Stop any playing videos
        const video = mediaContainer.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset to start
        }
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
            // sizing handled by CSS/container so media always scale to fit the lightbox
            video.style.width = 'auto';
            video.style.height = 'auto';
            video.style.maxWidth = '100%';
            video.style.maxHeight = '100%';
            video.draggable = false;
            video.style.transform = '';
            video.style.transition = '';

            // Add poster image (thumbnail shown before video plays)
            const posterSrc = item.src.replace("videos/", "images/").replace(".mp4", "-thumb.jpg");
            video.poster = posterSrc;

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
            img.draggable = false;
            img.style.transform = ''; // clear any previous drag transform
            img.style.transition = '';
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

    // --- SWIPE / DRAG (mobile swipe + desktop hold-and-drag) ---
    function resetMediaTransform() {
        const el = mediaContainer.querySelector('img, video');
        if (!el) return;
        el.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 300);
    }

    function onPointerDown(e) {
        if (!modal.classList.contains('active')) return;
        // only primary button
        if (e.button && e.button !== 0) return;
        // avoid interfering with desktop clicks on native video controls
        if (e.target && e.target.tagName === 'VIDEO' && e.pointerType === 'mouse') return;

        pointerId = e.pointerId;
        isPointerDown = true;
        startX = e.clientX;
        startY = e.clientY;
        currentMediaEl = mediaContainer.querySelector('img, video');
        try { mediaContainer.setPointerCapture(pointerId); } catch (err) { /* ignore if not supported */ }
        mediaContainer.classList.add('dragging');
        document.body.style.userSelect = 'none';
    }

    function onPointerMove(e) {
        if (!isPointerDown || e.pointerId !== pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        // only begin 'drag' when horizontal movement predominates
        if (!isDragging) {
            if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
                isDragging = true;
            } else return;
        }
        e.preventDefault();

        const clamp = Math.sign(dx) * Math.min(Math.abs(dx), window.innerWidth * 0.8);
        const scale = 1 - Math.min(0.06, Math.abs(dx) / window.innerWidth * 0.06);
        if (currentMediaEl) {
            currentMediaEl.style.transition = 'none';
            currentMediaEl.style.transform = `translateX(${clamp}px) scale(${scale})`;
        }
    }

    function onPointerUp(e) {
        if (!isPointerDown || (e && e.pointerId && e.pointerId !== pointerId)) return;
        try { mediaContainer.releasePointerCapture(pointerId); } catch (err) { /* ignore */ }
        const endX = (e && e.clientX) || startX;
        const endY = (e && e.clientY) || startY;
        const dx = endX - startX;
        const dy = endY - startY;

        isPointerDown = false;
        mediaContainer.classList.remove('dragging');
        document.body.style.userSelect = '';

        if (isDragging && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0 && currentIndex < items.length - 1) {
                currentIndex++;
                showItem();
            } else if (dx > 0 && currentIndex > 0) {
                currentIndex--;
                showItem();
            } else {
                resetMediaTransform();
            }
        } else {
            resetMediaTransform();
        }

        isDragging = false;
        pointerId = null;
        currentMediaEl = null;
    }

    // attach pointer listeners to the media container (covers touch + mouse via Pointer Events)
    mediaContainer.addEventListener('pointerdown', onPointerDown);
    mediaContainer.addEventListener('pointermove', onPointerMove);
    mediaContainer.addEventListener('pointerup', onPointerUp);
    mediaContainer.addEventListener('pointercancel', onPointerUp);

    // Make the openModal function available to other scripts (like gallery.js)
    // This is how gallery.js can trigger the lightbox
    window.openLightbox = openModal;
})();
