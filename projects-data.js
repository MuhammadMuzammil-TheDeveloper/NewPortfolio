/**
 * projects-data.js
 * ---------------------------------------------------------------------------
 * Centralized project data for Muhammad Muzammil's portfolio.
 * Used by: homepage "Featured Projects" section, /projects page, filters,
 * search, and project detail modals/pages.
 *
 * HOW TO ADD OR UPDATE A PROJECT
 * ---------------------------------------------------------------------------
 * 1. Copy an existing object below and edit every field.
 * 2. `id` must be unique, lowercase, hyphenated (used in URLs like /projects/id).
 * 3. `category` must be one of the filter categories defined in FILTER_CATEGORIES
 *    below (or add a new category there first).
 * 4. `featured: true` puts it in the homepage's 4-project section. Keep the
 *    featured count at exactly 4 — set an older one to `false` when adding a
 *    new featured project.
 * 5. `github` and `live` are required-ish: leave `live` as an empty string
 *    "" if there is no deployed demo (the Live Demo button will hide itself).
 *    Never leave `github` empty for a real project — link to the repo.
 * 6. `image` should point to a real screenshot/preview if you have one
 *    (e.g. "./assets/projects/maintainiq.png"). If you don't have one yet,
 *    leave it as null and the UI will render the consistent fallback
 *    thumbnail (dark card + project initials/tech glyph) instead of a
 *    random stock image.
 *
 * TODO ITEMS (fill these in before shipping):
 *   - MaintainIQ, VerifyAI, AI Tool Hub, Noteboard: add real `github` and
 *     `live` URLs below (marked "TODO" in each object).
 *   - Add screenshots for any project currently using `image: null`.
 *   - Confirm the `featured` flags reflect the 4 you want on the homepage.
 * ---------------------------------------------------------------------------
 */

const FILTER_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI" },
  { id: "react", label: "React" },
  { id: "javascript", label: "JavaScript" },
  { id: "other", label: "Other" },
];

/**
 * projects-data.js
 * ---------------------------------------------------------------------------
 * Centralized repository of all portfolio projects for Muhammad Muzammil.
 * ---------------------------------------------------------------------------
 */

const PROJECTS = [
  {
    name: "DonorHub",
    category: "fullstack",
    description: "Blood donation/emergency platform designed to help connect blood donors with people who need blood.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: true,
    github: "",
    live: ""
  },
  {
    name: "MaintainIQ",
    category: "web",
    description: "Enterprise infrastructure ledger for asset tracking and maintenance logging with a modern UI.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: true,
    github: "",
    live: ""
  },
  {
    name: "Sticky Notes – Supabase",
    category: "fullstack",
    description: "Responsive sticky-notes dashboard with creation, editing, searching and dark mode.",
    technologies: ["HTML", "CSS", "JavaScript", "Supabase"],
    featured: true,
    github: "",
    live: ""
  },
  {
    name: "Employee Management System",
    category: "fullstack",
    description: "Employee management system with CRUD operations and real-time database integration.",
    technologies: ["HTML", "Bootstrap", "Supabase"],
    featured: true,
    github: "",
    live: ""
  },
  {
    name: "AI Tool Hub",
    category: "ai",
    description: "A centralized platform for discovering and using AI tools.",
    technologies: ["JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "VerifyAI",
    category: "ai",
    description: "AI-focused project/application.",
    technologies: ["HTML"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Supabase Bucket Storage",
    category: "fullstack",
    description: "File-storage manager supporting upload, preview, listing, updating and deletion.",
    technologies: ["HTML", "CSS", "JavaScript", "Supabase"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "TODO App with Backend",
    category: "fullstack",
    description: "Full-stack todo application with authentication and per-user CRUD todo management.",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Quiz AI App",
    category: "ai",
    description: "AI-powered quiz application project.",
    technologies: ["JavaScript", "React Native"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "CareerPath AI",
    category: "ai",
    description: "AI-oriented career/quiz platform.",
    technologies: ["HTML", "JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "AI-Powered Learning Assistant",
    category: "ai",
    description: "Learning assistant application using AI concepts.",
    technologies: ["JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "University Admission Decision Machine",
    category: "web",
    description: "Application focused on university admission decision/support logic.",
    technologies: ["JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Game Zone",
    category: "other",
    description: "Game-oriented web/application project.",
    technologies: ["TypeScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "ShopHub",
    category: "web",
    description: "E-commerce application.",
    technologies: ["TypeScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Resume Builder.io",
    category: "web",
    description: "Resume-building web application.",
    technologies: ["TypeScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "QR Code Generator",
    category: "web",
    description: "QR code generation application.",
    technologies: ["TypeScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "AgroBlog Website",
    category: "web",
    description: "Agriculture-focused blogging website.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Python Language Translator",
    category: "other",
    description: "Desktop language translation application.",
    technologies: ["Python"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Hotel Management System",
    category: "other",
    description: "Hotel management application.",
    technologies: ["Java"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Quiz Application",
    category: "web",
    description: "Interactive quiz application.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Maze Solver",
    category: "other",
    description: "Algorithmic maze-solving project.",
    technologies: ["Python"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Producer Consumer Synchronization Simulator",
    category: "other",
    description: "Interactive OS simulator demonstrating producer-consumer synchronization, semaphores, threads and critical sections.",
    technologies: ["Python", "Tkinter"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "SOR Method Solver",
    category: "other",
    description: "Numerical-analysis GUI for solving systems of linear equations using Successive Over-Relaxation.",
    technologies: ["Python", "Tkinter"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Arduino Obstacle Detection System",
    category: "other",
    description: "Embedded system that detects obstacles using ultrasonic distance measurement with visual/audio alerts.",
    technologies: ["Arduino", "Ultrasonic Sensor"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "HelpHub AI Hackathon",
    category: "ai",
    description: "AI-focused hackathon project.",
    technologies: ["HTML"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Zomato Insta",
    category: "web",
    description: "Zomato-inspired interface/project.",
    technologies: ["JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Tik Tak Toe",
    category: "web",
    description: "Browser-based Tic Tac Toe game.",
    technologies: ["JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "StopWatch",
    category: "web",
    description: "Browser stopwatch application.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Weather App",
    category: "web",
    description: "Weather application interface.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Netflix Clone",
    category: "web",
    description: "Netflix-inspired frontend clone.",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "OLX Clone",
    category: "web",
    description: "OLX-inspired marketplace interface.",
    technologies: ["HTML", "CSS"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "SMIT Website Clone",
    category: "web",
    description: "SMIT website recreation/clone.",
    technologies: ["HTML", "CSS"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Apple Clone",
    category: "web",
    description: "Apple-inspired website clone.",
    technologies: ["HTML", "CSS"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "Hiring Mine",
    category: "web",
    description: "Hiring/job-platform inspired project.",
    technologies: ["HTML", "CSS"],
    featured: false,
    github: "",
    live: ""
  },
  {
    name: "WorldAtlas",
    category: "web",
    description: "Interactive geography/world information project.",
    technologies: ["JavaScript"],
    featured: false,
    github: "",
    live: ""
  }
];

// Export for both module-based and plain <script> usage.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS, FILTER_CATEGORIES };
}
