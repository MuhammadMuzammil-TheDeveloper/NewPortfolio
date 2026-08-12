/**
 * home-projects.js
 * ---------------------------------------------------------------------------
 * Renders the homepage's 4 featured project cards from the centralized
 * PROJECTS data (projects-data.js). Runs before script.js (see index.html
 * script order) so script.js's reveal-animation and modal wiring picks up
 * these cards automatically on its normal DOM query.
 *
 * To change which 4 projects are featured: edit `featured: true/false` in
 * projects-data.js. Keep exactly 4 set to true.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  const mount = document.getElementById("home-projects-grid");
  if (!mount || typeof PROJECTS === "undefined" || !window.ProjectRender) return;

  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);

  mount.innerHTML = featured
    .map((p) => window.ProjectRender.compactCardHTML(p))
    .join("");
})();
