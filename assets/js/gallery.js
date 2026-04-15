document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;

    // 2. DEFINE FUNCTIONS

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[currentIndex];
        const src = item.getAttribute('href'); // Get large image source from anchor
        const caption = item.querySelector('img').getAttribute('alt'); // Get caption from thumbnail alt

        lightboxImg.setAttribute('src', src);
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active'); // CSS will handle visibility
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => lightboxImg.setAttribute('src', ''), 300); // Clear image after transition
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        // Smoothly update content while lightbox is open
        const item = galleryItems[currentIndex];
        const src = item.getAttribute('href');
        const caption = item.querySelector('img').getAttribute('alt');
        lightboxImg.setAttribute('src', src);
        lightboxCaption.textContent = caption;
    }

    // 3. ATTACH EVENT LISTENERS

    // Open when clicking any gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the browser from just opening the image file
            openLightbox(index);
        });
    });

    // Close buttons
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking overlay (but not the image itself)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Navigation buttons
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop overlay click from triggering
        showNext();
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop overlay click from triggering
        showPrev();
    });

    // Keyboard controls (Esc, Arrows)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});