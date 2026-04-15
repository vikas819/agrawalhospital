const cards = document.querySelectorAll('.video-card');
const popup = document.getElementById('videoPopup');
const player = document.getElementById('player');
const closeBtn = document.querySelector('.close-btn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video');
        // Set the iframe source with autoplay enabled
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        popup.style.display = 'flex';
    });
});

// Close popup
const closePopup = () => {
    popup.style.display = 'none';
    player.src = ''; // Stop the video
};

closeBtn.addEventListener('click', closePopup);

// Close if user clicks outside the video box
window.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
});