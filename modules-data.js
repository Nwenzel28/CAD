/* ═══════════════════════════════════════════════════════
   ORANGINEERING — Module Content System (modules-data.js)

   HOW TO ADD A NEW MODULE:
   1. Copy the template object below
   2. Fill in your content
   3. Add it to the MODULES array
   4. Save — the page renders it automatically!

   FIELD REFERENCE:
   ┌─────────────┬──────────────────────────────────────────────────┐
   │ id          │ Unique string, e.g. "07" — used for linking       │
   │ number      │ Display number, e.g. "07"                         │
   │ title       │ Module title                                      │
   │ difficulty  │ "Beginner" | "Intermediate" | "Advanced"          │
   │ description │ 2–3 sentence summary of the module                │
   │ topics      │ Array of short topic tag strings (max ~6)         │
   │ duration    │ Estimated time, e.g. "~3 hrs"                     │
   │ sections    │ Number of sections, e.g. 6                        │
   │ status      │ "available" | "coming-soon" | "draft"             │
   │ link        │ Path to lesson page, e.g. "modules/01-dfm.html"   │
   └─────────────┴──────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════ */

const MODULES = [

  // ── MODULE 01 ────────────────────────────────────────
  {
    id: "01",
    number: "01",
    title: "Design for Manufacturing",
    difficulty: "Intermediate",
    description: "Learn to design parts that can actually be built. Understand tolerancing, feature minimization, and how your CAD decisions translate directly to machine time, cost, and part quality.",
    topics: ["GD&T Basics", "Tolerancing", "DFM Principles", "Material Selection", "Draft Angles"],
    duration: "~3 hrs",
    sections: 6,
    status: "available",
    link: "#"
  },

  // ── MODULE 02 ────────────────────────────────────────
  {
    id: "02",
    number: "02",
    title: "Iteration Workflows",
    difficulty: "Intermediate",
    description: "Design is never one-and-done. Build systematic habits for versioning, documenting decisions, and using structured feedback cycles to improve designs quickly and intentionally.",
    topics: ["Version Control", "Changelog Practice", "Rapid Prototyping", "Feedback Loops"],
    duration: "~2.5 hrs",
    sections: 5,
    status: "available",
    link: "#"
  },

  // ── MODULE 03 ────────────────────────────────────────
  {
    id: "03",
    number: "03",
    title: "Assembly Design",
    difficulty: "Intermediate",
    description: "Go beyond individual parts. Learn top-down design strategy, how to manage complex assemblies, and how design choices in one component cascade through an entire system.",
    topics: ["Mates & Constraints", "Top-Down Design", "Assembly BOM", "Sub-Assemblies", "Clearance Analysis"],
    duration: "~4 hrs",
    sections: 7,
    status: "available",
    link: "#"
  },

  // ── MODULE 04 ────────────────────────────────────────
  {
    id: "04",
    number: "04",
    title: "Structural Analysis Basics",
    difficulty: "Advanced",
    description: "Get a working understanding of FEA tools inside your CAD environment. Identify load paths, set up basic simulations, and validate designs before spending money on fabrication.",
    topics: ["FEA Setup", "Load Path Analysis", "Stress Concentrations", "Factor of Safety"],
    duration: "~3.5 hrs",
    sections: 6,
    status: "available",
    link: "#"
  },

  // ── MODULE 05 ────────────────────────────────────────
  {
    id: "05",
    number: "05",
    title: "Fasteners & Joining",
    difficulty: "Intermediate",
    description: "The details that hold everything together — literally. Deep dive into fastener selection, thread engagement, press fits, adhesives, and when each joining method is the right call.",
    topics: ["Fastener Selection", "Thread Engagement", "Press Fits", "Weld Design"],
    duration: "~2 hrs",
    sections: 4,
    status: "available",
    link: "#"
  },

  // ── MODULE 06 ────────────────────────────────────────
  {
    id: "06",
    number: "06",
    title: "System-Level Thinking",
    difficulty: "Advanced",
    description: "Shift from part-level to system-level design. Learn how mechanical, electrical, and software constraints interact, and how to design for integration from day one.",
    topics: ["Interface Control", "Cable Routing", "Mechatronics Basics", "Design Reviews"],
    duration: "~4.5 hrs",
    sections: 8,
    status: "available",
    link: "#"
  },

  // ════════════════════════════════════════════════════
  // ✏️  ADD YOUR NEW MODULE HERE — copy this template:
  // ════════════════════════════════════════════════════
  // {
  //   id: "07",
  //   number: "07",
  //   title: "Your Module Title",
  //   difficulty: "Intermediate",       // Beginner | Intermediate | Advanced
  //   description: "Two or three sentences describing what this module covers and why it matters.",
  //   topics: ["Topic 1", "Topic 2", "Topic 3"],
  //   duration: "~2 hrs",
  //   sections: 4,
  //   status: "coming-soon",            // available | coming-soon | draft
  //   link: "modules/07-your-topic.html"
  // },

];


/* ═══════════════════════════════════════════════════════
   RENDERER — Do not edit below unless changing the card UI
═══════════════════════════════════════════════════════ */

function renderModules(containerId = 'modules-grid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = '';

  MODULES.forEach((mod, i) => {
    const isAvailable = mod.status === 'available';
    const isComingSoon = mod.status === 'coming-soon';

    const topicsHTML = mod.topics
      .map(t => `<span class="topic-tag">${t}</span>`)
      .join('');

    const statusBadge = isComingSoon
      ? `<span class="mod-status coming-soon">Coming Soon</span>`
      : isAvailable
        ? `<span class="mod-status available">Available</span>`
        : `<span class="mod-status draft">Draft</span>`;

    const card = document.createElement('div');
    card.className = `module-card card fade-up`;
    card.style.animationDelay = `${i * 0.07}s`;
    if (!isAvailable) card.classList.add('module-card--locked');

    card.innerHTML = `
      <div class="module-card-header">
        <span class="module-badge">Module ${mod.number}</span>
        <div class="module-card-header-right">
          ${statusBadge}
          <span class="module-difficulty">${mod.difficulty}</span>
        </div>
      </div>
      <div class="module-card-title">${mod.title}</div>
      <p class="module-card-desc">${mod.description}</p>
      <div class="module-topics">${topicsHTML}</div>
      <div class="module-footer">
        <div class="module-meta">
          <span>${mod.duration}</span>
          <span>${mod.sections} sections</span>
        </div>
        ${isAvailable
          ? `<a href="${mod.link}" class="start-btn">Start Module →</a>`
          : `<span class="start-btn start-btn--disabled">${isComingSoon ? 'Coming Soon' : 'In Progress'}</span>`
        }
      </div>
    `;

    grid.appendChild(card);
  });
}

// Auto-render on DOMContentLoaded if the grid exists
document.addEventListener('DOMContentLoaded', () => renderModules());