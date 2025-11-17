// Jednoduchá animácia pre skill bar: pri zobrazení nastaví šírku podľa data-level
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.skill-bar');
  const onVisible = (el) => {
    const span = el.querySelector('span');
    const level = parseInt(el.getAttribute('data-level') || '0', 10);
    span.style.width = Math.max(0, Math.min(100, level)) + '%';
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          onVisible(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });

    bars.forEach(b => io.observe(b));
  } else {
    // fallback: okamžite animovať
    bars.forEach(b => onVisible(b));
  }
});