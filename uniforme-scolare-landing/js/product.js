(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-product-page');
  if (!root) return;

  // Static presentation data only. Polo details/price follow the supplied product page;
  // other prices and photographs remain the homepage's illustrative examples.
  const { products, getSchool, schoolProducts, categoryUrl, createProductCard } = window.SchoolCatalog;
  const params = new URLSearchParams(window.location.search);
  const school = getSchool(params.get('scoala'));
  const requested = params.get('produs');
  const product = products.find((item) => item.slug === requested) || products[0];
  const setText = (id, text) => { root.querySelector(id).textContent = text; };
  document.title = `${product.name} — NOVRI`;
  document.querySelector('meta[name="description"]').content = product.description;
  setText('#school-detail-title', product.name);
  setText('#school-product-crumb', product.name);
  setText('#school-detail-price', product.price);
  setText('#school-detail-description', product.description);
  setText('#school-detail-material', product.details);
  setText('#school-detail-color', product.color);
  setText('#school-detail-index', `${String(products.indexOf(product) + 1).padStart(2, '0')} / 06`);
  root.querySelector('#school-color-swatch').style.backgroundColor = product.swatch;
  const photo = root.querySelector('#school-detail-image');
  photo.src = `assets/${product.image}`;
  photo.alt = product.alt;

  // Preserve the selected school and category filters throughout product navigation.
  if (school) {
    const collectionUrl = categoryUrl(school, params);
    const crumb = root.querySelector('.school-breadcrumbs a:nth-of-type(2)');
    crumb.href = collectionUrl;
    crumb.textContent = school.name;
    const cta = root.querySelector('.school-detail-cta');
    cta.href = collectionUrl;
    cta.firstChild.textContent = 'Revin la colecția școlii ';
    root.querySelector('.school-related-heading a').href = collectionUrl;
    root.querySelector('.school-detail-cta-note').textContent = school.name;
  }
  root.querySelectorAll('input[name="school-size"]').forEach((input) => {
    const available = product.sizes.includes(input.value.replace(' ani', ''));
    input.disabled = !available;
    input.closest('label').hidden = !available;
  });
  const related = root.querySelector('#school-related-products');
  const selection = school ? schoolProducts(school) : products;
  selection.filter((item) => item !== product).slice(0, 3).forEach((item) => {
    related.append(createProductCard(item, { school, filters: params, heading: 'h3' }));
  });
})();