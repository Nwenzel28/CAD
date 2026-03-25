// Resource sidebar filter (visual only)
document.addEventListener('DOMContentLoaded', () => {
  const filterItems = document.querySelectorAll('.res-filter-list li');
  if (filterItems.length > 0) {
    filterItems.forEach(li => {
      li.addEventListener('click', function() {
        filterItems.forEach(x => x.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
});
