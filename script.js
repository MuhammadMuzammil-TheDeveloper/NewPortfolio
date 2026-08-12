(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- Splash Screen Handler ---------------- */
  const splashScreen = $("#splash-screen");
  window.addEventListener("load", () => {
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.classList.add("splash-hidden");
        setTimeout(() => splashScreen.remove(), 600);
      }, 900);
    }
  });

  /* ---------------- Scroll progress bar ---------------- */
  const progress = $(".scroll-progress");
  function updateProgress() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${ratio})`;
  }
  if (progress) {
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------------- Mobile menu ---------------- */
  const menuButton = $(".menu-toggle");
  const nav = $("#site-nav");

  function closeMenu() {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    nav.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    $$(".site-nav a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        menuButton.focus();
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    desktopQuery.addEventListener("change", (e) => {
      if (e.matches) closeMenu();
    });
  }

  /* ---------------- Active nav link on scroll ---------------- */
  const navLinks = $$(".site-nav a");
  const sections = $$("main > section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((l) => {
              l.classList.toggle(
                "is-active",
                l.getAttribute("href") === `#${id}`,
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------------- Scroll-reveal ---------------- */
  const revealTargets = $$(
    ".skill-grid article, .project-card, .live-projects, .timeline article, .stats > div, .contact",
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("is-visible"),
              (i % 4) * 90,
            );
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- Cinematic hero entrance ---------------- */
  const introPending = () =>
    document.documentElement.classList.contains("intro-pending");

  if (introPending()) {
    const heroHeadingEl = $(".hero-heading");
    const terminalEl = $(".terminal");
    const terminalCode = $(".terminal pre code");
    const heroCopyChildren = $$(".hero-copy > *");
    const socialLinks = $$(".socials a");

    const reveal = (el, holdMs) => {
      if (!el) return;
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      // Release the inline transform once settled so CSS :hover rules regain control.
      setTimeout(() => {
        el.style.transform = "";
      }, holdMs);
    };

    const typeTerminal = (codeEl, onDone) => {
      if (!codeEl) {
        onDone();
        return;
      }
      const segments = [
        { text: "const", tag: "b" },
        { text: " developer = {\n  name: ", tag: null },
        { text: '"Muhammad Muzammil"', tag: "strong" },
        { text: ",\n  role: ", tag: null },
        { text: '"Fullstack Developer"', tag: "strong" },
        { text: ",\n  stack: [", tag: null },
        { text: '"React"', tag: "strong" },
        { text: ", ", tag: null },
        { text: '"Next.js"', tag: "strong" },
        { text: "],\n  focus: ", tag: null },
        { text: '"clean products"', tag: "strong" },
        { text: "\n}", tag: null },
      ];
      codeEl.textContent = "";
      const caret = document.createElement("span");
      caret.className = "caret";
      caret.setAttribute("aria-hidden", "true");
      codeEl.appendChild(caret);

      let segIndex = 0;
      let charIndex = 0;
      let currentNode = null;

      const tick = () => {
        if (segIndex >= segments.length) {
          onDone();
          return;
        }
        const seg = segments[segIndex];
        if (charIndex === 0) {
          currentNode = seg.tag
            ? document.createElement(seg.tag)
            : document.createTextNode("");
          codeEl.insertBefore(currentNode, caret);
        }
        const ch = seg.text[charIndex];
        currentNode.textContent += ch;
        charIndex++;
        let delay = 10 + Math.random() * 14;
        if (ch === "\n") delay += 150;
        if (charIndex >= seg.text.length) {
          segIndex++;
          charIndex = 0;
        }
        setTimeout(tick, delay);
      };
      tick();
    };

    window.addEventListener("load", () => {
      const NAME_START = 850;
      const TERMINAL_START = NAME_START + 800;
      const TYPING_START = TERMINAL_START + 500;

      setTimeout(() => reveal(heroHeadingEl, 950), NAME_START);
      setTimeout(() => reveal(terminalEl, 700), TERMINAL_START);

      setTimeout(() => {
        typeTerminal(terminalCode, () => {
          setTimeout(() => {
            heroCopyChildren.forEach((el, i) => {
              setTimeout(() => reveal(el, 650), i * 140);
            });
            const copySettle = heroCopyChildren.length * 140 + 700;
            setTimeout(() => {
              socialLinks.forEach((el, i) => {
                setTimeout(() => reveal(el, 550), i * 80);
              });
              const socialsSettle = socialLinks.length * 80 + 600;
              setTimeout(() => {
                document.documentElement.classList.remove("intro-pending");
              }, socialsSettle);
            }, copySettle);
          }, 150);
        });
      }, TYPING_START);
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    $$(".button").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  const canHover = window.matchMedia("(hover: hover)").matches;

  /* ---------------- Cursor-tracking spotlight glow ---------------- */
  if (!reduceMotion && canHover) {
    $$(".terminal, .live-projects, .contact").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty(
          "--mx",
          `${((e.clientX - r.left) / r.width) * 100}%`,
        );
        el.style.setProperty(
          "--my",
          `${((e.clientY - r.top) / r.height) * 100}%`,
        );
      });
    });
  }

  /* ---------------- 3D tilt for project & skill cards ---------------- */
  if (!reduceMotion && canHover) {
    $$(".project-card, .skill-grid article").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        const rx = (py - 0.5) * -7;
        const ry = (px - 0.5) * 7;
        card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------------- Hero parallax on scroll ---------------- */
  const heroHeading = $(".hero-heading");
  const heroEl = $(".hero");
  if (heroHeading && heroEl && !reduceMotion) {
    let heroTicking = false;
    const updateHeroParallax = () => {
      heroTicking = false;
      if (introPending()) return;
      const rect = heroEl.getBoundingClientRect();
      const ratio = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      heroHeading.style.transform = `translateY(${ratio * 36}px)`;
      heroHeading.style.opacity = String(1 - ratio * 0.7);
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!heroTicking) {
          requestAnimationFrame(updateHeroParallax);
          heroTicking = true;
        }
      },
      { passive: true },
    );
    if (!introPending()) updateHeroParallax();
  }

  /* ---------------- Modals (contact + project detail) ---------------- */
  const CONTACT_EMAIL = "muzammil.muhammad7782@gmail.com";
  const WHATSAPP_NUMBER = "923172855256";

  let lastFocusedEl = null;

  function openModal(overlay) {
    if (!overlay) return;
    lastFocusedEl = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const focusable = overlay.querySelector(
      "input, textarea, button, a[href]",
    );
    if (focusable) focusable.focus();
  }

  function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function getOpenModal() {
    return $(".modal-overlay.is-open");
  }

  const modalOverlays = $$("[data-modal-overlay]");

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
    $$("[data-modal-close]", overlay).forEach((btn) => {
      btn.addEventListener("click", () => closeModal(overlay));
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const open = getOpenModal();
      if (open) closeModal(open);
    }
  });

  const modalWhatsappLink = $("#modal-whatsapp-link");
  if (modalWhatsappLink) {
    const waText = encodeURIComponent(
      "Hi Muzammil, I found your portfolio and would like to talk about a project.",
    );
    modalWhatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
  }

  /* ---- Contact modal trigger (Email links across the page) ---- */
  const contactModal = $("#contact-modal");
  $$(".js-contact-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(contactModal);
    });
  });

  /* ---- Contact form: builds a mailto with the entered details ---- */
  const contactForm = $("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#cf-name", contactForm).value.trim();
      const email = $("#cf-email", contactForm).value.trim();
      const message = $("#cf-message", contactForm).value.trim();
      const note = $("#cf-note", contactForm);

      if (!name || !email || !message) {
        if (note) note.textContent = "Please fill in every field.";
        return;
      }

      const subject = encodeURIComponent(
        `Project inquiry from ${name}`,
      );
      const body = encodeURIComponent(
        `${message}\n\n— ${name} (${email})`,
      );
      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      if (note) {
        note.textContent = "Opening your email app to send this…";
      }
      window.location.href = mailtoUrl;
    });
  }

  /* ---- Project detail modal ---- */
  const projectModal = $("#project-modal");
  const projectModalTag = $("#project-modal-tag");
  const projectModalTitle = $("#project-modal-title");
  const projectModalDescription = $("#project-modal-description");
  const projectModalTags = $("#project-modal-tags");
  const projectModalLive = $("#project-modal-live");
  const projectModalGithub = $("#project-modal-github");

  function openProjectModal(card) {
    const {
      title,
      tag,
      description,
      tags,
      live,
      github,
    } = card.dataset;

    if (projectModalTag) projectModalTag.textContent = tag || "Project";
    if (projectModalTitle) projectModalTitle.textContent = title || "";
    if (projectModalDescription)
      projectModalDescription.textContent = description || "";

    if (projectModalTags) {
      projectModalTags.innerHTML = "";
      (tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => {
          const i = document.createElement("i");
          i.textContent = t;
          projectModalTags.appendChild(i);
        });
    }

    if (projectModalLive) {
      if (live) {
        projectModalLive.href = live;
        projectModalLive.textContent = "View live link ↗";
        projectModalLive.style.display = "";
        projectModalLive.removeAttribute("aria-disabled");
      } else {
        projectModalLive.style.display = "none";
      }
    }

    if (projectModalGithub) {
      projectModalGithub.href = github || "#";
      projectModalGithub.textContent = "View on GitHub ↗";
    }

    openModal(projectModal);
  }

  $$(".js-project-card").forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });
})();
