(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-cart-page');
  if (!root) return;
  const cart = window.SchoolCartDemo;
  const catalog = window.SchoolCatalog;
  const list = root.querySelector('#school-cart-items');
  const template = root.querySelector('#school-cart-row-template');
  const content = root.querySelector('#school-cart-content');
  const empty = root.querySelector('#school-cart-empty');
  const feedback = root.querySelector('#school-cart-feedback');
  const undo = root.querySelector('#school-cart-undo');
  const live = root.querySelector('#school-cart-live');
  const dialog = root.querySelector('#school-checkout-dialog');
  const number = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (cents) => `${number.format(cents / 100)} Lei`;
  const unitCents = (item) => Math.round(catalog.getProduct(item.productId).priceValue * 100);
  let removed = null;
  let recommendationKey = '';

  function buildRow(item) {
    const row = template.content.firstElementChild.cloneNode(true);
    const product = catalog.getProduct(item.productId);
    const school = catalog.getSchool(item.schoolId);
    row.dataset.cartKey = cart.keyOf(item);
    const url = catalog.productUrl(product, school);
    row.querySelector('.school-cart-row-image').href = url;
    const image = row.querySelector('img');
    image.src = `assets/${product.image}`;
    image.alt = product.alt;
    const name = row.querySelector('.school-cart-product-name');
    name.href = url;
    name.textContent = product.name;
    row.querySelector('.school-cart-row-options').textContent = `${product.color} / Mărime: ${item.size} ani`;
    const schoolLink = row.querySelector('.school-cart-row-school');
    schoolLink.href = catalog.categoryUrl(school);
    schoolLink.textContent = school.name;
    row.querySelector('.school-cart-row-price').textContent = `${money(unitCents(item))} / bucată`;
    row.querySelector('.school-cart-quantity').setAttribute('aria-label', `Cantitate pentru ${product.name}`);
    row.querySelector('input').setAttribute('aria-label', `Cantitate ${product.name}, ${item.size} ani`);
    row.querySelector('[data-school-cart-action="decrease"]').setAttribute('aria-label', `Scade cantitatea pentru ${product.name}`);
    row.querySelector('[data-school-cart-action="increase"]').setAttribute('aria-label', `Crește cantitatea pentru ${product.name}`);
    row.querySelector('[data-school-cart-action="remove"]').setAttribute('aria-label', `Elimină ${product.name} din coș`);
    return row;
  }
  function render() {
    const items = cart.getItems();
    const keys = items.map(cart.keyOf);
    const existing = [...list.children].map((row) => row.dataset.cartKey);
    if (keys.join('::') !== existing.join('::')) list.replaceChildren(...items.map(buildRow));
    let total = 0;
    let count = 0;
    items.forEach((item, index) => {
      const row = list.children[index];
      const lineTotal = unitCents(item) * item.quantity;
      total += lineTotal;
      count += item.quantity;
      row.querySelector('input').value = item.quantity;
      row.querySelector('[data-school-cart-action="decrease"]').disabled = item.quantity <= 1;
      row.querySelector('[data-school-cart-action="increase"]').disabled = item.quantity >= 99;
      row.querySelector('.school-cart-line-total').textContent = money(lineTotal);
      row.querySelector('.school-cart-line-total').setAttribute('aria-label', `Total produs: ${money(lineTotal)}`);
    });
    content.hidden = items.length === 0;
    empty.hidden = items.length !== 0;
    root.querySelector('#school-cart-item-count').textContent = count === 1 ? '1 articol' : `${count} articole`;
    root.querySelector('#school-cart-subtotal').textContent = money(total);
    root.querySelector('#school-cart-total').textContent = money(total);
    live.textContent = `Coș actualizat: ${count} articole. Total produse: ${money(total)}.`;
    const school = items.length ? catalog.getSchool(items[0].schoolId) : catalog.schools[0];
    root.querySelectorAll('[data-school-cart-continue]').forEach((link) => { link.href = catalog.categoryUrl(school); });
    const recommendations = catalog.schoolProducts(school).filter((product) => !items.some((item) => item.productId === product.slug)).slice(0, 3);
    const nextKey = school.slug + recommendations.map((product) => product.slug).join('|');
    if (recommendationKey !== nextKey) {
      root.querySelector('#school-cart-related').replaceChildren(...recommendations.map((product) => catalog.createProductCard(product, { school })));
      recommendationKey = nextKey;
    }
  }
  function commitQuantity(input) {
    const key = input.closest('.school-cart-row').dataset.cartKey;
    const item = cart.getItems().find((entry) => cart.keyOf(entry) === key);
    if (!item) return;
    const entered = input.value.trim();
    const numeric = Number(entered);
    const quantity = entered && Number.isFinite(numeric) ? Math.max(1, Math.min(99, Math.round(numeric))) : item.quantity;
    input.value = quantity;
    cart.setQuantity(key, quantity);
  }
  list.addEventListener('change', (event) => {
    if (event.target.matches('[data-school-cart-quantity]')) commitQuantity(event.target);
  });
  list.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.matches('[data-school-cart-quantity]')) {
      event.preventDefault();
      commitQuantity(event.target);
    }
  });
  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-school-cart-action]');
    if (!button) return;
    const key = button.closest('.school-cart-row').dataset.cartKey;
    const items = cart.getItems();
    const index = items.findIndex((item) => cart.keyOf(item) === key);
    const item = items[index];
    if (!item) return;
    const action = button.dataset.schoolCartAction;
    if (action === 'remove') {
      removed = { item, index };
      feedback.hidden = false;
      root.querySelector('#school-cart-message').textContent = `${catalog.getProduct(item.productId).name} a fost eliminat din coș.`;
      cart.remove(key);
      const next = list.children[Math.min(index, list.children.length - 1)];
      (next ? next.querySelector('.school-cart-remove') : undo).focus();
    } else {
      cart.setQuantity(key, item.quantity + (action === 'increase' ? 1 : -1));
      // If a boundary disables the button, keep keyboard focus inside the quantity control.
      if (button.disabled) button.parentElement.querySelector('input').focus({ preventScroll: true });
    }
  });
  undo.addEventListener('click', () => {
    if (!removed) return;
    const key = cart.keyOf(removed.item);
    cart.restore(removed.item, removed.index);
    removed = null;
    feedback.hidden = true;
    const row = [...list.children].find((element) => element.dataset.cartKey === key);
    if (row) row.querySelector('input').focus();
  });
  root.querySelector('#school-cart-reset').addEventListener('click', () => {
    removed = null;
    feedback.hidden = true;
    cart.reset();
    root.querySelector('#school-coupon-form').reset();
    root.querySelector('#school-coupon-status').textContent = '';
    list.querySelector('input')?.focus();
  });
  root.querySelector('#school-coupon-form').addEventListener('submit', (event) => {
    event.preventDefault();
    root.querySelector('#school-coupon-status').textContent = 'În acest demo nu se aplică reduceri. Codul va putea fi verificat în magazin.';
  });
  root.querySelector('#school-checkout-button').addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
  });
  root.querySelectorAll('[data-school-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  document.addEventListener('school-cart-change', render);
  render();
})();
