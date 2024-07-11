document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.interests-section');
    const tiles = document.querySelectorAll('.tweet, .song');
    const observerOptions = {
        threshold: 0.1
    };

    const darkModeToggle = document.getElementById('dark-mode-toggle');

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const tilesInSection = entry.target.querySelectorAll('.tweet, .song');
                tilesInSection.forEach((tile, index) => {
                    tile.style.transitionDelay = `${index * 0.1}s`;
                    tile.classList.add('visible');
                });
            } else {
                const tilesInSection = entry.target.querySelectorAll('.tweet, .song');
                tilesInSection.forEach((tile) => {
                    tile.classList.remove('visible');
                    tile.style.transitionDelay = `0s`; // Reset transition delay when not visible
                });
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    tiles.forEach(tile => {
        observer.observe(tile);
    });
});
