(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-information-page');
  if (!root) return;
  const contents = root.querySelector('.school-info-toc');
  // The full article and its links remain usable without JavaScript.
  if (contents) contents.open = window.matchMedia('(min-width: 1024px)').matches;
  const schoolList = root.querySelector('[data-school-info-school-list]');
  const catalog = window.SchoolCatalog;
  if (schoolList && catalog) {
    const alphabetical = new Intl.Collator('ro', { sensitivity: 'base', numeric: true });
    const links = [...catalog.schools].sort((a, b) => alphabetical.compare(a.name, b.name)).map((school) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = catalog.categoryUrl(school);
      link.textContent = school.name;
      item.append(link);
      return item;
    });
    if (links.length) schoolList.replaceChildren(...links);
  }
  root.querySelectorAll('[data-school-info-anchor]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target && root.contains(target)) target.focus({ preventScroll: true });
    });
  });
})();
