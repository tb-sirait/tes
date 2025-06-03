export function activateScrollAnimation() {
  const elements = document.querySelectorAll('.stat-item, .hero-title-ttg, .hero-subtitle-ttg, .hero-image-ttg, .visi-card, .misi-card, .brand-item, .partner-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => {
    observer.observe(el);
  });
}
