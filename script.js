document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');

            // Update Nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update Sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Slideshow Logic
    const slideshows = {
        evolution: {
            container: document.querySelector('#evolution .slideshow-container'),
            slides: document.querySelectorAll('#evolution .slide'),
            dots: document.querySelectorAll('#evolution .dot'),
            slideIndex: 1
        },
        autonomous: {
            container: document.querySelector('#autonomous-presentation .slideshow-container'),
            slides: document.querySelectorAll('#autonomous-presentation .slide'),
            dots: document.querySelectorAll('#autonomous-presentation .dot'),
            slideIndex: 1
        }
    };

    function showSlides(n, slideshowKey) {
        const ss = slideshows[slideshowKey];
        if (!ss || ss.slides.length === 0) return;

        if (n > ss.slides.length) { ss.slideIndex = 1 }
        if (n < 1) { ss.slideIndex = ss.slides.length }

        ss.slides.forEach(slide => slide.style.display = "none");
        ss.dots.forEach(dot => dot.classList.remove('active'));

        if (ss.slides[ss.slideIndex - 1]) {
            ss.slides[ss.slideIndex - 1].style.display = "block";
            ss.dots[ss.slideIndex - 1].classList.add('active');
        }
    }

    window.plusSlides = function (n, slideshowKey = 'evolution') {
        showSlides(slideshows[slideshowKey].slideIndex += n, slideshowKey);
    }

    window.currentSlide = function (n, slideshowKey = 'evolution') {
        showSlides(slideshows[slideshowKey].slideIndex = n, slideshowKey);
    }

    // Initial calls
    showSlides(1, 'evolution');
    showSlides(1, 'autonomous');

    // Keyboard navigation for slideshow
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('evolution').classList.contains('active')) {
            if (e.key === 'ArrowLeft') plusSlides(-1, 'evolution');
            if (e.key === 'ArrowRight') plusSlides(1, 'evolution');
        } else if (document.getElementById('autonomous-presentation').classList.contains('active')) {
            if (e.key === 'ArrowLeft') plusSlides(-1, 'autonomous');
            if (e.key === 'ArrowRight') plusSlides(1, 'autonomous');
        }
    });

    // Lightbox Logic
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const closeLightbox = document.getElementById('closeLightbox');
    const assetCards = document.querySelectorAll('.asset-card');

    assetCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const title = card.querySelector('h4').textContent;
            const desc = card.querySelector('p').textContent;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;

            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeLightboxFunc = () => {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    closeLightbox.addEventListener('click', closeLightboxFunc);

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightboxFunc();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightboxFunc();
        }
    });
});
