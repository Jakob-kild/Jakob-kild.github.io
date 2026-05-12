// ============================================================
// Reading progress bar
// ============================================================
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ============================================================
// Slower hero sun + intro moon scroll animation
// ============================================================
const hero = document.getElementById('hero');
const intro = document.getElementById('intro');
const heroSun = document.querySelector('.hero-sun');
const introMoon = document.querySelector('.intro-moon');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateSkyAnimation() {
  if (!hero || !intro || !heroSun) return;

  const heroHeight = hero.offsetHeight;

  // Bigger number = slower animation
  const scrollRange = heroHeight * 1.8;

  const progress = clamp(window.scrollY / scrollRange, 0, 1);

  // Slower, softer sun movement
  const sunMoveDownPx = progress * window.innerHeight * 0.85;
  const sunMoveSidePx = progress * window.innerWidth * -0.04;
  const sunScale = 1 - progress * 0.18;

  heroSun.style.transform = `
    translate(${sunMoveSidePx}px, ${sunMoveDownPx}px)
    scale(${sunScale})
  `;

  const introRect = intro.getBoundingClientRect();
  const sunRect = heroSun.getBoundingClientRect();

  // Fade starts when the sun reaches the intro section
  const sunOverlap = sunRect.bottom - introRect.top;

  // Bigger number = slower fade out
  const sunFadeProgress = clamp(sunOverlap / (sunRect.height), 0, 1);

  heroSun.style.opacity = 1 - sunFadeProgress;

  // Moon rises slowly on the left side of the intro
  if (introMoon) {
    const moonProgress = clamp(
      (window.innerHeight - introRect.top) / (window.innerHeight * 1.25),
      0,
      1
    );

    introMoon.style.opacity = moonProgress;
    introMoon.style.transform = `
      translateY(${(1 - moonProgress) * 120}px)
      scale(${0.82 + moonProgress * 0.18})
    `;
  }
}

window.addEventListener('scroll', updateSkyAnimation, { passive: true });
window.addEventListener('resize', updateSkyAnimation);
updateSkyAnimation();

// ============================================================
// Scroll-triggered fade-in for [data-animate] elements
// ============================================================
const animateEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

animateEls.forEach((el) => observer.observe(el));

// ============================================================
// Season tab switching
// ============================================================
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.panel;

    document.querySelectorAll('.tab-btn').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.tab-panel').forEach((p) => {
      p.hidden = true;
      p.classList.remove('active');
    });

    const target = document.getElementById(targetId);
    if (target) {
      target.hidden = false;
      target.classList.add('active');
    }
  });
});
