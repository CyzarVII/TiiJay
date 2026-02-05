/**
 * MOBILE NAVIGATION MODULE
 * 
 * This file handles the hamburger menu for mobile devices.
 * When you're on a phone and click the menu icon, this:
 * 1. Opens/closes the navigation menu
 * 2. Smoothly scrolls to the section you clicked
 * 3. Automatically closes the menu after you click a link
 * 4. Uses accessibility features (aria labels) for screen readers
 */
(function () {
    // Find the navigation elements on the page
    const nav = document.querySelector('.nav'); // The entire nav bar
    const navToggle = document.querySelector('.nav-toggle'); // The hamburger menu button
    const navLinksWrapper = document.querySelector('.nav-links'); // The menu links

    // Stop if we can't find these elements
    if (!nav || !navToggle || !navLinksWrapper) return;

    /**
     * Close the navigation menu
     * This gets called after you click a link
     */
    const closeNav = () => {
        nav.classList.remove('nav-open'); // Hide the menu
        navToggle.setAttribute('aria-expanded', 'false'); // Tell screen readers it's closed
    };

    // HAMBURGER BUTTON CLICK
    // Toggles the menu open/close when you click the hamburger icon
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open'); // Toggle the menu
        navToggle.setAttribute('aria-expanded', String(isOpen)); // Tell screen readers if it's open
    });

    // NAVIGATION LINK CLICKS
    // When you click a nav link, it smoothly scrolls to that section
    navLinksWrapper.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1); // Get the section ID
            const targetEl = document.getElementById(targetId); // Find that section on the page
            if (!targetEl) return; // Stop if section doesn't exist

            e.preventDefault(); // Don't jump instantly, we want to scroll smoothly

            // Smooth scroll to the target section
            targetEl.scrollIntoView({
                behavior: 'smooth', // Animated scroll instead of instant
                block: 'start' // Scroll to the top of the section
            });

            closeNav(); // Close the menu after clicking
        });
    });
})();
