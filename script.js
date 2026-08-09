(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- Scroll progress bar ---------------- */
  const progress = $('.scroll-progress');
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${ratio})`;
  }
  if (progress) {
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  /* ---------------- Mobile menu ---------------- */
  const menuButton = $('.menu-toggle');
  const nav = $('#site-nav');

  function closeMenu() {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    nav.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    $$('.site-nav a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });

    // Close the mobile menu if the viewport grows back to desktop size
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    desktopQuery.addEventListener('change', (e) => { if (e.matches) closeMenu(); });
  }

  /* ---------------- Active nav link on scroll ---------------- */
  const navLinks = $$('.site-nav a');
  const sections = $$('main > section[id]');

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((l) => {
            l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------------- Scroll-reveal ---------------- */
  const revealTargets = $$(
    '.skill-grid article, .project-card, .live-projects, .timeline article, .stats > div, .contact'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), (i % 4) * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------- Hero entrance ---------------- */
  const heroFadeTargets = $$('.hero-heading, .hero-copy, .terminal, .socials, .stats');
  if (!reduceMotion) {
    heroFadeTargets.forEach((el, i) => {
      el.classList.add('hero-fade');
      setTimeout(() => el.classList.add('is-visible'), 120 + i * 110);
    });
  }

  /* ---------------- Magnetic buttons (hover-capable pointers only) ---------------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    $$('.button').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.14}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }
})();