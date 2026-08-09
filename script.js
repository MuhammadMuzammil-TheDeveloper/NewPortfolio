const progress = document.querySelector('.scroll-progress');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable ? window.scrollY / scrollable : 0})`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const style = document.createElement('style');
style.textContent = '@media (max-width: 900px) { .site-nav.is-open { display:flex; position:absolute; top:65px; left:0; right:0; padding:18px 20px; background:var(--bg); border-bottom:1px solid var(--line); flex-direction:column; gap:16px; } }';
document.head.appendChild(style);
