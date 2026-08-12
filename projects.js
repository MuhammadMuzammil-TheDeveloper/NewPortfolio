/**
 * projects.js
 * ---------------------------------------------------------------------------
 * Powers the /projects page: renders the full grid from PROJECTS
 * (projects-data.js), and provides live search + category filtering with
 * no page reload. Also owns its own project-detail-modal click handling
 * (via event delegation) since cards here can be re-rendered after the
 * initial page load, unlike the static homepage cards.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  if (typeof PROJECTS === "undefined" || !window.ProjectRender) return;

  const grid = $("#projects-grid");
  const searchInput = $("#project-search");
  const filterButtons = $$(".filter-btn");
  const emptyState = $("#projects-empty");
  const resultsCount = $("#projects-results-count");

  let activeCategory = "all";
  let searchTerm = "";

  function matches(project) {
    const categoryOk =
      activeCategory === "all" || project.category === activeCategory;
    if (!categoryOk) return false;
    if (!searchTerm) return true;
    const haystack = (
      project.name +
      " " +
      project.description +
      " " +
      project.technologies.join(" ")
    ).toLowerCase();
    return haystack.includes(searchTerm);
  }

  function render() {
    const list = PROJECTS.filter(matches);

    if (!list.length) {
      grid.innerHTML = "";
      if (emptyState) emptyState.hidden = false;
    } else {
      if (emptyState) emptyState.hidden = true;
      grid.innerHTML = list.map((p) => window.ProjectRender.fullCardHTML(p)).join("");
      // Fade the freshly rendered cards in (reveal class starts hidden).
      requestAnimationFrame(() => {
        $$(".project-card", grid).forEach((el, i) => {
          setTimeout(() => el.classList.add("is-visible"), (i % 6) * 60);
        });
      });
    }

    if (resultsCount) {
      resultsCount.textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      render();
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      activeCategory = btn.dataset.filter;
      render();
    });
  });

  /* ---- Project detail modal (self-contained, works for re-rendered cards) ---- */
  const projectModal = $("#project-modal");
  const modalTag = $("#project-modal-tag");
  const modalTitle = $("#project-modal-title");
  const modalDescription = $("#project-modal-description");
  const modalTags = $("#project-modal-tags");
  const modalLive = $("#project-modal-live");
  const modalGithub = $("#project-modal-github");

  let lastFocusedEl = null;

  function openModal(overlay) {
    if (!overlay) return;
    lastFocusedEl = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const focusable = overlay.querySelector("input, textarea, button, a[href]");
    if (focusable) focusable.focus();
  }

  function openProjectModal(dataset) {
    const { title, tag, description, tags, live, github } = dataset;
    if (modalTag) modalTag.textContent = tag || "Project";
    if (modalTitle) modalTitle.textContent = title || "";
    if (modalDescription) modalDescription.textContent = description || "";

    if (modalTags) {
      modalTags.innerHTML = "";
      (tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => {
          const i = document.createElement("i");
          i.textContent = t;
          modalTags.appendChild(i);
        });
    }

    if (modalLive) {
      if (live) {
        modalLive.href = live;
        modalLive.textContent = "View live link ↗";
        modalLive.style.display = "";
      } else {
        modalLive.style.display = "none";
      }
    }

    if (modalGithub) {
      if (github) {
        modalGithub.href = github;
        modalGithub.style.display = "";
      } else {
        modalGithub.style.display = "none";
      }
    }

    openModal(projectModal);
  }

  if (grid) {
    grid.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // let GitHub/Live buttons navigate normally
      const card = e.target.closest(".js-project-card");
      if (!card) return;
      openProjectModal(card.dataset);
    });
    grid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".js-project-card");
      if (!card) return;
      e.preventDefault();
      openProjectModal(card.dataset);
    });
  }

  render();
})();
