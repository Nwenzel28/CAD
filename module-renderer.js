/* ═══════════════════════════════════════════════════════
   ORANGINEERING — Module Page Renderer (module-renderer.js)

   Used by every module page (modules/01-dfm.html, etc.)
   Reads a MODULE_CONTENT object and renders the full page.

   BLOCK TYPES supported in section.blocks[]:
   ┌──────────────────┬─────────────────────────────────────────────────┐
   │ "text"           │ One or more paragraphs of body copy              │
   │ "callout"        │ Highlighted box — tip, warning, or note          │
   │ "steps"          │ Numbered step-by-step list                       │
   │ "keyterms"       │ Definition list of terms                         │
   │ "checklist"      │ Checkbox list (do / don't or review list)        │
   │ "image"          │ Image placeholder with caption                   │
   │ "divider"        │ Visual section break                             │
   └──────────────────┴─────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════ */

function renderModulePage(content) {
  // ── Page title
  document.title = `${content.title} — Orangineering`;

  // ── Header fields
  _set('mod-number',     `Module ${content.number}`);
  _set('mod-title',      content.title);
  _set('mod-difficulty', content.difficulty);
  _set('mod-duration',   content.duration);
  _set('mod-desc',       content.description);

  // ── Topic tags
  const tagsEl = document.getElementById('mod-topics');
  if (tagsEl) {
    tagsEl.innerHTML = content.topics
      .map(t => `<span class="topic-tag">${t}</span>`)
      .join('');
  }

  // ── Sidebar nav + content sections
  const nav     = document.getElementById('section-nav');
  const body    = document.getElementById('module-body');
  if (!nav || !body) return;

  nav.innerHTML  = '';
  body.innerHTML = '';

  content.sections.forEach((section, si) => {
    const sectionId = `section-${si + 1}`;

    // Sidebar link
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="#${sectionId}" class="sec-nav-link" data-index="${si}">
        <span class="sec-nav-num">${String(si + 1).padStart(2, '0')}</span>
        <span class="sec-nav-title">${section.title}</span>
      </a>`;
    nav.appendChild(li);

    // Section wrapper
    const sec = document.createElement('section');
    sec.id = sectionId;
    sec.className = 'module-section fade-up';
    sec.style.animationDelay = `${si * 0.06}s`;

    // Section heading
    sec.innerHTML = `
      <div class="section-heading">
        <span class="section-num">${String(si + 1).padStart(2, '0')}</span>
        <h2 class="section-title-text">${section.title}</h2>
      </div>`;

    // Render each block
    section.blocks.forEach(block => {
      sec.appendChild(_renderBlock(block));
    });

    body.appendChild(sec);
  });

  // ── Activate first nav link
  _setActiveNav(0);

  // ── Scrollspy
  _initScrollspy(content.sections.length);
}


/* ── BLOCK RENDERERS ─────────────────────────────────── */

function _renderBlock(block) {
  const wrap = document.createElement('div');
  wrap.className = `block block--${block.type}`;

  switch (block.type) {

    case 'text':
      wrap.innerHTML = (Array.isArray(block.content) ? block.content : [block.content])
        .map(p => `<p>${p}</p>`)
        .join('');
      break;

    case 'callout':
      const icons = { tip: '💡', warning: '⚠️', note: '📌', example: '🔧' };
      const labels = { tip: 'Tip', warning: 'Watch Out', note: 'Note', example: 'Example' };
      const kind = block.kind || 'note';
      wrap.classList.add(`callout--${kind}`);
      wrap.innerHTML = `
        <div class="callout-icon">${icons[kind] || '📌'}</div>
        <div class="callout-body">
          <div class="callout-label">${labels[kind] || 'Note'}</div>
          <div class="callout-text">${block.content}</div>
        </div>`;
      break;

    case 'steps':
      wrap.innerHTML = `
        ${block.title ? `<div class="block-title">${block.title}</div>` : ''}
        <ol class="steps-list">
          ${block.items.map((item, i) => `
            <li class="step-item">
              <span class="step-num">${i + 1}</span>
              <div class="step-body">
                <div class="step-heading">${item.heading}</div>
                ${item.detail ? `<div class="step-detail">${item.detail}</div>` : ''}
              </div>
            </li>`).join('')}
        </ol>`;
      break;

    case 'keyterms':
      wrap.innerHTML = `
        ${block.title ? `<div class="block-title">${block.title}</div>` : ''}
        <dl class="keyterms-list">
          ${block.items.map(item => `
            <div class="keyterm-row">
              <dt class="keyterm-term">${item.term}</dt>
              <dd class="keyterm-def">${item.definition}</dd>
            </div>`).join('')}
        </dl>`;
      break;

    case 'checklist':
      wrap.innerHTML = `
        ${block.title ? `<div class="block-title">${block.title}</div>` : ''}
        <ul class="checklist">
          ${block.items.map(item => `
            <li class="checklist-item checklist-item--${item.type || 'do'}">
              <span class="check-icon">${item.type === 'dont' ? '✗' : '✓'}</span>
              <span class="check-text">${item.text}</span>
            </li>`).join('')}
        </ul>`;
      break;

    case 'image':
      wrap.innerHTML = `
        <div class="image-placeholder">
          <div class="image-placeholder-inner">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="13" cy="14" r="3.5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M2 28 L12 18 L20 26 L28 18 L38 28" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            <div class="image-placeholder-label">${block.caption || 'Image / Diagram'}</div>
            ${block.hint ? `<div class="image-placeholder-hint">${block.hint}</div>` : ''}
          </div>
        </div>
        ${block.caption ? `<div class="image-caption">${block.caption}</div>` : ''}`;
      break;

    case 'divider':
      wrap.innerHTML = `<hr class="block-divider" />`;
      break;

    default:
      wrap.innerHTML = `<p><em>[Unknown block type: ${block.type}]</em></p>`;
  }

  return wrap;
}


/* ── SCROLLSPY ───────────────────────────────────────── */

function _initScrollspy(count) {
  const links = document.querySelectorAll('.sec-nav-link');
  const sections = Array.from({ length: count }, (_, i) =>
    document.getElementById(`section-${i + 1}`)
  ).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const idx = parseInt(id.split('-')[1]) - 1;
        _setActiveNav(idx);
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

function _setActiveNav(index) {
  document.querySelectorAll('.sec-nav-link').forEach((l, i) => {
    l.classList.toggle('active', i === index);
  });
}

function _set(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}