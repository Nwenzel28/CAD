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
   │ "challenge"      │ Challenge problem with hint + answer dropdowns   │
   │ "divider"        │ Visual section break                             │
   └──────────────────┴─────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════ */

function renderModulePage(content) {
  // ── Page title
  document.title = content.title + ' — Orangineering';

  // ── Header fields
  _set('mod-number',     'Module ' + content.number);
  _set('mod-title',      content.title);
  _set('mod-difficulty', content.difficulty);
  _set('mod-duration',   content.duration);
  _set('mod-desc',       content.description);

  // ── Topic tags
  var tagsEl = document.getElementById('mod-topics');
  if (tagsEl) {
    tagsEl.innerHTML = content.topics
      .map(function(t) { return '<span class="topic-tag">' + t + '</span>'; })
      .join('');
  }

  // ── Sidebar nav + content sections
  var nav  = document.getElementById('section-nav');
  var body = document.getElementById('module-body');
  if (!nav || !body) return;

  nav.innerHTML  = '';
  body.innerHTML = '';

  content.sections.forEach(function(section, si) {
    var sectionId = 'section-' + (si + 1);

    // Sidebar link
    var li = document.createElement('li');
    li.innerHTML =
      '<a href="#' + sectionId + '" class="sec-nav-link" data-index="' + si + '">' +
        '<span class="sec-nav-num">' + String(si + 1).padStart(2, '0') + '</span>' +
        '<span class="sec-nav-title">' + section.title + '</span>' +
      '</a>';
    nav.appendChild(li);

    // Section wrapper
    var sec = document.createElement('section');
    sec.id = sectionId;
    sec.className = 'module-section fade-up';
    sec.style.animationDelay = (si * 0.06) + 's';

    // Section heading
    sec.innerHTML =
      '<div class="section-heading">' +
        '<span class="section-num">' + String(si + 1).padStart(2, '0') + '</span>' +
        '<h2 class="section-title-text">' + section.title + '</h2>' +
      '</div>';

    // Render each block
    section.blocks.forEach(function(block) {
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
  var wrap = document.createElement('div');
  wrap.className = 'block block--' + block.type;

  if (block.type === 'text') {
    var paras = Array.isArray(block.content) ? block.content : [block.content];
    wrap.innerHTML = paras.map(function(p) { return '<p>' + p + '</p>'; }).join('');

  } else if (block.type === 'callout') {
    var icons  = { tip: '💡', warning: '⚠️', note: '📌', example: '🔧' };
    var labels = { tip: 'Tip', warning: 'Watch Out', note: 'Note', example: 'Example' };
    var kind   = block.kind || 'note';
    wrap.classList.add('callout--' + kind);
    wrap.innerHTML =
      '<div class="callout-icon">' + (icons[kind] || '📌') + '</div>' +
      '<div class="callout-body">' +
        '<div class="callout-label">' + (labels[kind] || 'Note') + '</div>' +
        '<div class="callout-text">'  + block.content + '</div>' +
      '</div>';

  } else if (block.type === 'steps') {
    var stepsHTML = (block.title ? '<div class="block-title">' + block.title + '</div>' : '') +
      '<ol class="steps-list">' +
      block.items.map(function(item, i) {
        return '<li class="step-item">' +
          '<span class="step-num">' + (i + 1) + '</span>' +
          '<div class="step-body">' +
            '<div class="step-heading">' + item.heading + '</div>' +
            (item.detail ? '<div class="step-detail">' + item.detail + '</div>' : '') +
          '</div>' +
        '</li>';
      }).join('') +
      '</ol>';
    wrap.innerHTML = stepsHTML;

  } else if (block.type === 'keyterms') {
    var ktHTML = (block.title ? '<div class="block-title">' + block.title + '</div>' : '') +
      '<dl class="keyterms-list">' +
      block.items.map(function(item) {
        return '<div class="keyterm-row">' +
          '<dt class="keyterm-term">' + item.term + '</dt>' +
          '<dd class="keyterm-def">'  + item.definition + '</dd>' +
        '</div>';
      }).join('') +
      '</dl>';
    wrap.innerHTML = ktHTML;

  } else if (block.type === 'checklist') {
    var clHTML = (block.title ? '<div class="block-title">' + block.title + '</div>' : '') +
      '<ul class="checklist">' +
      block.items.map(function(item) {
        var t = item.type || 'do';
        return '<li class="checklist-item checklist-item--' + t + '">' +
          '<span class="check-icon">' + (t === 'dont' ? '✗' : '✓') + '</span>' +
          '<span class="check-text">' + item.text + '</span>' +
        '</li>';
      }).join('') +
      '</ul>';
    wrap.innerHTML = clHTML;

  } else if (block.type === 'image') {
    wrap.innerHTML =
      '<div class="image-placeholder">' +
        '<div class="image-placeholder-inner">' +
          '<svg width="40" height="40" viewBox="0 0 40 40" fill="none">' +
            '<rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" stroke-width="1.5"/>' +
            '<circle cx="13" cy="14" r="3.5" stroke="currentColor" stroke-width="1.5"/>' +
            '<path d="M2 28 L12 18 L20 26 L28 18 L38 28" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
          '</svg>' +
          '<div class="image-placeholder-label">' + (block.caption || 'Image / Diagram') + '</div>' +
          (block.hint ? '<div class="image-placeholder-hint">' + block.hint + '</div>' : '') +
        '</div>' +
      '</div>' +
      (block.caption ? '<div class="image-caption">' + block.caption + '</div>' : '');

  } else if (block.type === 'challenge') {
    var diff      = block.difficulty || 'intermediate';
    var diffLabel = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
    var diffIcon  = { beginner: '🟢', intermediate: '🟠', advanced: '🔴' };
    wrap.classList.add('challenge--' + diff);

    var tasksHTML = '';
    if (block.tasks && block.tasks.length) {
      tasksHTML =
        '<div class="challenge-tasks-label">Your tasks:</div>' +
        '<ol class="challenge-tasks">' +
        block.tasks.map(function(t) { return '<li>' + t + '</li>'; }).join('') +
        '</ol>';
    }

    var hintHTML = '';
    if (block.hint) {
      hintHTML =
        '<details class="challenge-hint">' +
          '<summary>💡 Show hint</summary>' +
          '<div class="challenge-hint-body">' + block.hint + '</div>' +
        '</details>';
    }

    var answerHTML = '';
    if (block.answer) {
      answerHTML =
        '<details class="challenge-answer">' +
          '<summary>✓ Show answer</summary>' +
          '<div class="challenge-answer-body">' + block.answer + '</div>' +
        '</details>';
    }

    wrap.innerHTML =
      '<div class="challenge-header">' +
        '<div class="challenge-title-row">' +
          '<span class="challenge-icon">🎯</span>' +
          '<span class="challenge-label">Challenge Problem</span>' +
          '<span class="challenge-diff">' + (diffIcon[diff] || '🟠') + ' ' + (diffLabel[diff] || 'Intermediate') + '</span>' +
        '</div>' +
        '<div class="challenge-title">' + block.title + '</div>' +
      '</div>' +
      '<div class="challenge-body">' +
        '<div class="challenge-prompt">' + block.prompt + '</div>' +
        (block.context ? '<div class="challenge-context">' + block.context + '</div>' : '') +
        tasksHTML +
        hintHTML +
        answerHTML +
      '</div>';

  } else if (block.type === 'divider') {
    wrap.innerHTML = '<hr class="block-divider" />';

  } else {
    wrap.innerHTML = '<p><em>[Unknown block type: ' + block.type + ']</em></p>';
  }

  return wrap;
}


/* ── SCROLLSPY ───────────────────────────────────────── */

function _initScrollspy(count) {
  var sections = [];
  for (var i = 0; i < count; i++) {
    var el = document.getElementById('section-' + (i + 1));
    if (el) sections.push(el);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id  = entry.target.id;
        var idx = parseInt(id.split('-')[1], 10) - 1;
        _setActiveNav(idx);
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(function(s) { observer.observe(s); });
}

function _setActiveNav(index) {
  document.querySelectorAll('.sec-nav-link').forEach(function(l, i) {
    l.classList.toggle('active', i === index);
  });
}

function _set(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}