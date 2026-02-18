// ==============================================
// Feature Slider — About Page
// ==============================================

(function () {
  const sliderTabs = document.querySelectorAll('.slider-tab');
  const slides = document.querySelectorAll('.slider-slide');
  const progressBar = document.querySelector('.slider-progress-bar');

  if (!sliderTabs.length || !slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const AUTO_ADVANCE_MS = 5000;
  let autoTimer = null;

  function goToSlide(index) {
    // Remove active from previous slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('exit-left');
    sliderTabs[currentSlide].classList.remove('active');

    // After transition completes, clear the exit class
    setTimeout(() => {
      slides[currentSlide].classList.remove('exit-left');
      currentSlide = index;

      // Activate new slide
      slides[currentSlide].classList.add('active');
      sliderTabs[currentSlide].classList.add('active');

      // Update progress bar
      updateProgress();
    }, 150);
  }

  function updateProgress() {
    const pct = ((currentSlide + 1) / totalSlides) * 100;
    if (progressBar) {
      progressBar.style.width = pct + '%';
    }
  }

  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }

  function startAutoAdvance() {
    stopAutoAdvance();
    autoTimer = setInterval(nextSlide, AUTO_ADVANCE_MS);
  }

  function stopAutoAdvance() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Tab click handlers
  sliderTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = parseInt(tab.dataset.slide, 10);
      if (target === currentSlide) return;
      goToSlide(target);
      // Restart auto-advance timer on manual click
      startAutoAdvance();
    });
  });

  // Pause auto-advance on hover
  const viewport = document.querySelector('.slider-viewport');
  if (viewport) {
    viewport.addEventListener('mouseenter', stopAutoAdvance);
    viewport.addEventListener('mouseleave', startAutoAdvance);
  }

  // Initialize
  updateProgress();
  startAutoAdvance();
})();
