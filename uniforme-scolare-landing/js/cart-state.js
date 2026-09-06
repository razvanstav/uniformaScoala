(() => {
  'use strict';
  // Local demonstration only. This is not an OpenCart cart or stock service.
  const catalog = window.SchoolCatalog;
  if (!catalog) return;
  const storageKey = 'school-novri-cart-demo-v1';
  const seeds = [
    { productId: 'tricou-polo-alb', schoolId: 'liceul-teoretic-mihai-ionescu', size: '10', quantity: 1 },
    { productId: 'bluza-polo', schoolId: 'liceul-teoretic-mihai-ionescu', size: '10', quantity: 1 }
  ];
  const keyOf = (item) => [item.productId, item.schoolId, item.size].join('|');
  function normalize(items) {
    const unique = new Map();
    for (const item of items) {
      if (!item || typeof item !== 'object') continue;
      const product = catalog.getProduct(item.productId);
      const school = catalog.getSchool(item.schoolId);
      const quantity = Number(item.quantity);
      if (!product || !school || !school.productIds.includes(product.slug) || !product.sizes.includes(item.size) || !Number.isFinite(quantity)) continue;
      const valid = { productId: product.slug, schoolId: school.slug, size: item.size, quantity: Math.max(1, Math.min(99, Math.round(quantity))) };
      unique.set(keyOf(valid), valid);
    }
    return [...unique.values()];
  }
  let items = normalize(seeds);
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey));
    if (saved && saved.version === 1 && Array.isArray(saved.items)) items = normalize(saved.items);
  } catch { /* A blocked or damaged session store falls back to the sample cart. */ }

  const getItems = () => items.map((item) => ({ ...item }));
  function publish() {
    try { window.sessionStorage.setItem(storageKey, JSON.stringify({ version: 1, items })); }
    catch { /* Private/offline previews can still edit the current page's demo. */ }
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#school-uniforms-landing [data-school-cart-count]').forEach((badge) => { badge.textContent = count; });
    document.dispatchEvent(new CustomEvent('school-cart-change'));
  }
  function setQuantity(key, quantity) {
    const item = items.find((entry) => keyOf(entry) === key);
    if (!item || !Number.isFinite(quantity)) return;
    item.quantity = Math.max(1, Math.min(99, Math.round(quantity)));
    publish();
  }
  function remove(key) {
    items = items.filter((item) => keyOf(item) !== key);
    publish();
  }
  function restore(item, index) {
    if (items.some((entry) => keyOf(entry) === keyOf(item))) return;
    const valid = normalize([item]);
    if (!valid.length) return;
    items.splice(Math.max(0, Math.min(index, items.length)), 0, valid[0]);
    publish();
  }
  function reset() { items = normalize(seeds); publish(); }
  window.SchoolCartDemo = Object.freeze({ getItems, keyOf, setQuantity, remove, restore, reset });
  publish();
  // Restore the badge when returning from a different page via browser Back.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(storageKey));
      if (saved && saved.version === 1 && Array.isArray(saved.items)) items = normalize(saved.items);
    } catch { /* Keep the current in-memory demo. */ }
    publish();
  });
})();
