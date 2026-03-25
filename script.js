/* ═══════════════════════════════════════════════════════
   ORANGINEERING — Shared JS (script.js)
   Navigation active state + shared utilities
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV ACTIVE STATE ────────────────────────────────
  // Automatically marks the current page's nav link as active
  // by matching the filename to nav link hrefs.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();
    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === 'index.html' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // ─── RESOURCE FILTER (resources.html only) ──────────
  const filterItems = document.querySelectorAll('.res-filter-list li');
  if (filterItems.length) {
    filterItems.forEach(li => {
      li.addEventListener('click', function () {
        filterItems.forEach(x => x.classList.remove('active'));
        this.classList.add('active');

        const category = this.dataset.filter;
        const cards = document.querySelectorAll('.res-card');

        cards.forEach(card => {
          if (!category || category === 'all') {
            card.style.display = '';
          } else {
            card.style.display = card.dataset.category === category ? '' : 'none';
          }
        });
      });
    });
  }

});