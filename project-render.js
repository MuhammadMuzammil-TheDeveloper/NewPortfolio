/**
 * project-render.js
 * ---------------------------------------------------------------------------
 * Shared rendering helpers, built on top of projects-data.js.
 * Used by both home-projects.js (homepage featured section) and
 * projects.js (the /projects page grid).
 *
 * Load order in HTML must be:
 *   projects-data.js  ->  project-render.js  ->  (home-projects.js | projects.js)
 * ---------------------------------------------------------------------------
 */

(function (global) {
  "use strict";

  const CATEGORY_LABELS = {
    web: "Web",
    fullstack: "Full Stack",
    ai: "AI",
    react: "React",
    javascript: "JavaScript",
    other: "Other",
  };

  function categoryLabel(category) {
    return CATEGORY_LABELS[category] || "Project";
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]);
  }

  /**
   * A consistent, non-random fallback thumbnail for projects without a
   * screenshot: dark panel, project initials, and a subtle tech glyph.
   * No stock imagery is ever used.
   */
  function fallbackThumbHTML(project) {
    const initials = project.name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
    return `
      <div class="project-thumb project-thumb--fallback" aria-hidden="true">
        <span class="project-thumb-glyph">${escapeHtml(initials)}</span>
        <span class="project-thumb-tech">${escapeHtml(project.technologies[0] || "")}</span>
      </div>`;
  }

  function thumbHTML(project) {
    if (project.image) {
      return `
        <div class="project-thumb">
          <img
            src="${escapeHtml(project.image)}"
            alt="Screenshot of the ${escapeHtml(project.name)} project interface"
            loading="lazy"
            width="640"
            height="360"
          />
        </div>`;
    }
    return fallbackThumbHTML(project);
  }

  function tagsHTML(project) {
    return project.technologies
      .map((t) => `<i>${escapeHtml(t)}</i>`)
      .join("");
  }

  /**
   * Full card markup for the /projects grid: thumbnail, GitHub + Live Demo
   * buttons, and a clickable body that opens the detail modal.
   */
  function fullCardHTML(project) {
    const liveBtn = project.live
      ? `<a class="button button-dark project-card-btn" href="${escapeHtml(project.live)}" target="_blank" rel="noopener" aria-label="View live demo of ${escapeHtml(project.name)}">Live Demo ↗</a>`
      : "";
    const githubBtn = project.github
      ? `<a class="button button-outline-light-mini project-card-btn" href="${escapeHtml(project.github)}" target="_blank" rel="noopener" aria-label="View ${escapeHtml(project.name)} source on GitHub">GitHub ↗</a>`
      : "";

    return `
      <article
        class="project-card project-card--full js-project-card reveal"
        tabindex="0"
        role="button"
        aria-haspopup="dialog"
        aria-label="View details for ${escapeHtml(project.name)}"
        data-title="${escapeHtml(project.name)}"
        data-tag="${escapeHtml(categoryLabel(project.category))}"
        data-description="${escapeHtml(project.details && project.details.overview ? project.details.overview : project.description)}"
        data-tags="${escapeHtml(project.technologies.join(","))}"
        data-live="${escapeHtml(project.live || "")}"
        data-github="${escapeHtml(project.github || "")}"
        data-category="${escapeHtml(project.category)}"
        data-search="${escapeHtml((project.name + " " + project.description + " " + project.technologies.join(" ")).toLowerCase())}"
      >
        ${thumbHTML(project)}
        <div class="project-card-body">
          <div class="project-top"><span>${escapeHtml(categoryLabel(project.category))}</span><b>↗</b></div>
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="tags">${tagsHTML(project)}</div>
          <div class="project-card-actions">
            ${githubBtn}
            ${liveBtn}
          </div>
        </div>
      </article>`;
  }

  /**
   * Compact card markup for the homepage's 4-project featured section
   * (text-only, matches the original hand-authored cards exactly).
   */
  function compactCardHTML(project) {
    return `
      <article
        class="project-card js-project-card reveal"
        tabindex="0"
        role="button"
        aria-haspopup="dialog"
        data-title="${escapeHtml(project.name)}"
        data-tag="${escapeHtml(categoryLabel(project.category))}"
        data-description="${escapeHtml(project.details && project.details.overview ? project.details.overview : project.description)}"
        data-tags="${escapeHtml(project.technologies.join(","))}"
        data-live="${escapeHtml(project.live || "")}"
        data-github="${escapeHtml(project.github || "")}"
      >
        <div class="project-top"><span>${escapeHtml(categoryLabel(project.category))}</span><b>↗</b></div>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tags">${tagsHTML(project)}</div>
      </article>`;
  }

  global.ProjectRender = {
    categoryLabel,
    fullCardHTML,
    compactCardHTML,
  };
})(window);
