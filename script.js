// Cadence Gates Portfolio - JS functionality will be added here 

// Cadence Gates Portfolio - Interactive Functionality

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Scroll Navigation & Scroll-Spy
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section'));
  const header = document.querySelector('header');
  const heroSection = document.getElementById('home');

  function scrollToSection(e) {
    if (this.hash) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - header.offsetHeight + 1,
          behavior: 'smooth'
        });
      }
    }
  }
  navLinks.forEach(link => link.addEventListener('click', scrollToSection));

  function onScroll() {
    const scrollY = window.scrollY + header.offsetHeight + 10;
    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      if (link.hash === '#' + current) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Check if this is a mini hero page
    const isMiniHeroPage = header.classList.contains('mini-hero-page');
    const miniHeroSection = document.querySelector('.mini-hero-section');
    
    if (isMiniHeroPage && miniHeroSection) {
      // For mini hero pages, show header when scrolled past mini hero
      if (window.scrollY > (miniHeroSection.offsetHeight - header.offsetHeight - 10)) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    } else if (heroSection) {
      // For main page, show header when scrolled past hero
      if (window.scrollY > (heroSection.offsetHeight - header.offsetHeight - 10)) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // 2. Mobile Hamburger Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinksList.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navLinksList.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link')) {
      navLinksList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // 3. Media Section Tab Switching
  const mediaTabs = document.querySelectorAll('.media-tab');
  const mediaGalleries = [
    document.getElementById('media-photos'),
    document.getElementById('media-videos'),
    document.getElementById('media-press')
  ];
  mediaTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      mediaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      mediaGalleries.forEach((gallery, gidx) => {
        if (gidx === idx) {
          gallery.removeAttribute('hidden');
        } else {
          gallery.setAttribute('hidden', '');
        }
      });
    });
  });

  // 4. Contact Form with Formspree Integration
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Basic validation
      let valid = true;
      const inputs = form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.setAttribute('aria-invalid', 'true');
          input.classList.add('invalid');
          valid = false;
        } else {
          input.removeAttribute('aria-invalid');
          input.classList.remove('invalid');
        }
      });
      
      if (!valid) {
        form.querySelector('input[aria-invalid], textarea[aria-invalid]')?.focus();
        return;
      }
      
      // Show loading state
      const submitBtn = form.querySelector('.contact-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success message
          alert('Thank you for your message! Cadence will get back to you soon.');
          form.reset();
        } else {
          // Error message
          alert('Sorry, there was an error sending your message. Please try again or contact Cadence directly.');
        }
      } catch (error) {
        // Network error
        alert('Sorry, there was an error sending your message. Please try again or contact Cadence directly.');
      } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 5. Carousel Lightbox Gallery
  const carouselCards = document.querySelectorAll('.carousel-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentPhotoIndex = 0;
  const totalPhotos = 8;
  
  function openLightbox(photoIndex) {
    currentPhotoIndex = photoIndex;
    updateLightboxContent();
    lightbox.classList.add('active');
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
  }
  
  function updateLightboxContent() {
    const photoNumber = currentPhotoIndex;
    lightboxImage.textContent = `Photo ${photoNumber}`;
    lightboxCaption.textContent = `Photo Description ${photoNumber}`;
  }
  
  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex % totalPhotos) + 1;
    updateLightboxContent();
  }
  
  function prevPhoto() {
    currentPhotoIndex = currentPhotoIndex === 1 ? totalPhotos : currentPhotoIndex - 1;
    updateLightboxContent();
  }
  
  // Event listeners
  carouselCards.forEach((card, index) => {
    const photoIndex = (index % totalPhotos) + 1;
    card.addEventListener('click', () => openLightbox(photoIndex));
  });
  
  lightboxPrev.addEventListener('click', prevPhoto);
  lightboxNext.addEventListener('click', nextPhoto);
  
  // Close on any click
  lightbox.addEventListener('click', (e) => {
    // Only prevent closing if clicking on navigation buttons
    if (!e.target.classList.contains('lightbox-nav')) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevPhoto();
        break;
      case 'ArrowRight':
        nextPhoto();
        break;
    }
  });

  // 6. Carousel Interactive Scroll-to-Pause/Resume
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselTrack = document.querySelector('.carousel-track');
  const videosCarouselContainer = document.querySelector('#videos-carousel .carousel-container');
  const videosCarouselTrack = document.querySelector('#videos-carousel .carousel-track');
  let carouselPauseTimeout = null;
  let videosCarouselPauseTimeout = null;

  function pauseCarouselAnimation() {
    carouselTrack.classList.add('paused');
    carouselContainer.style.overflowX = 'auto';
  }

  function resumeCarouselAnimation() {
    carouselTrack.classList.remove('paused');
    carouselContainer.style.overflowX = '';
  }

  function pauseCarouselAnimation() {
    carouselTrack.classList.add('paused');
    carouselContainer.style.overflowX = 'auto';
  }

  function resumeCarouselAnimation() {
    carouselTrack.classList.remove('paused');
    carouselContainer.style.overflowX = '';
  }

  function pauseVideosCarouselAnimation() {
    videosCarouselTrack.classList.add('paused');
    videosCarouselContainer.style.overflowX = 'auto';
  }

  function resumeVideosCarouselAnimation() {
    videosCarouselTrack.classList.remove('paused');
    videosCarouselContainer.style.overflowX = '';
  }

  function handleCarouselScrollEvent() {
    pauseCarouselAnimation();
    if (carouselPauseTimeout) clearTimeout(carouselPauseTimeout);
    carouselPauseTimeout = setTimeout(resumeCarouselAnimation, 1000);
  }

  function handleVideosCarouselScrollEvent() {
    pauseVideosCarouselAnimation();
    if (videosCarouselPauseTimeout) clearTimeout(videosCarouselPauseTimeout);
    videosCarouselPauseTimeout = setTimeout(resumeVideosCarouselAnimation, 1000);
  }

  if (carouselContainer && carouselTrack) {
    // Pause/resume on wheel (mouse)
    carouselContainer.addEventListener('wheel', (e) => {
      // Only scroll horizontally
      if (e.deltaX !== 0 || Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        handleCarouselScrollEvent();
      }
    }, { passive: true });
    // Pause/resume on touch (mobile)
    carouselContainer.addEventListener('touchmove', handleCarouselScrollEvent, { passive: true });
    // Also pause/resume on manual scrollbar drag
    carouselContainer.addEventListener('scroll', handleCarouselScrollEvent, { passive: true });
  }

  if (videosCarouselContainer && videosCarouselTrack) {
    // Pause/resume on wheel (mouse)
    videosCarouselContainer.addEventListener('wheel', (e) => {
      // Only scroll horizontally
      if (e.deltaX !== 0 || Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        handleVideosCarouselScrollEvent();
      }
    }, { passive: true });
    // Pause/resume on touch (mobile)
    videosCarouselContainer.addEventListener('touchmove', handleVideosCarouselScrollEvent, { passive: true });
    // Also pause/resume on manual scrollbar drag
    videosCarouselContainer.addEventListener('scroll', handleVideosCarouselScrollEvent, { passive: true });
  }
});

// Lightbox styles (injected for demo, move to CSS for production)
const style = document.createElement('style');
style.innerHTML = `
.lightbox-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.85); z-index: 2000; display: none;
  align-items: center; justify-content: center;
}
.lightbox-content { position: relative; }
.lightbox-content img {
  max-width: 90vw; max-height: 80vh; border-radius: 12px; box-shadow: 0 4px 32px #0008;
}
.lightbox-close {
  position: absolute; top: -2.5rem; right: 0; background: none; border: none;
  color: #fff; font-size: 2.5rem; cursor: pointer; line-height: 1;
}
`;
document.head.appendChild(style); 