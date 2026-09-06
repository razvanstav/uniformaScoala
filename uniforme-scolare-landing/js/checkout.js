(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-checkout-page');
  if (!root) return;
  const cart = window.SchoolCartDemo;
  const catalog = window.SchoolCatalog;
  const options = window.SchoolCheckoutOptions;
  if (!cart || !catalog || !options) return;
  const find = (selector) => root.querySelector(selector);
  const form = find('#school-checkout-form');
  const list = find('#school-checkout-items');
  const template = find('#school-checkout-item-template');
  const dialog = find('#school-checkout-dialog');
  const error = find('#school-checkout-error');
  const submit = find('#school-checkout-submit');
  const number = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (cents) => `${number.format(cents / 100)} Lei`;
  const unitCents = (item) => Math.round(catalog.getProduct(item.productId).priceValue * 100);
  // Presentation settings observed on the reference checkout, not a tax/quote service.
  const demo = { shippingGrossCents: 2542, vatPercent: 21 };
  const romania = options.countries.find((country) => country.name === 'Romania').id;
  let removed = null;

  function setPanel(panel, visible) {
    panel.hidden = !visible;
    panel.disabled = !visible;
  }
  function clearErrors() {
    error.hidden = true;
    form.querySelectorAll('[aria-invalid]').forEach((input) => {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    });
  }
  function updateRegion(prefix) {
    const domestic = find(`#school-${prefix}-country`).value === romania;
    const select = find(`#school-${prefix}-region`);
    const input = find(`#school-${prefix}-region-other`);
    select.parentElement.hidden = !domestic;
    select.disabled = !domestic;
    input.hidden = domestic;
    input.disabled = domestic;
    find(`#school-${prefix}-region-label`).htmlFor = domestic ? select.id : input.id;
  }
  for (const prefix of ['billing', 'shipping']) {
    const countrySelect = find(`#school-${prefix}-country`);
    const regionSelect = find(`#school-${prefix}-region`);
    options.countries.forEach((country) => {
      countrySelect.add(new Option(country.name === 'Romania' ? 'România' : country.name, country.id));
    });
    countrySelect.value = romania;
    regionSelect.add(new Option('Alege județul', ''));
    options.romaniaRegions.forEach((region) => regionSelect.add(new Option(region.name, region.id)));
    countrySelect.addEventListener('change', () => { updateRegion(prefix); clearErrors(); });
    updateRegion(prefix);
  }
  function updateAccount() {
    const mode = form.querySelector('[name="account"]:checked').value;
    setPanel(find('#school-login-fields'), mode === 'login');
    setPanel(find('#school-register-fields'), mode === 'register');
    // Never retain credentials when leaving an optional account panel.
    if (mode !== 'login') {
      find('#school-login-password').value = '';
      find('#school-login-status').textContent = 'Pentru previzualizare, folosește doar date fictive.';
    }
    if (mode !== 'register') {
      find('#school-password').value = '';
      find('#school-password-confirm').value = '';
      find('#school-password-confirm').setCustomValidity('');
    }
    clearErrors();
  }
  form.querySelectorAll('[name="account"]').forEach((radio) => radio.addEventListener('change', updateAccount));
  function updateAddress() {
    const same = find('#school-same-address');
    setPanel(find('#school-shipping-fields'), !same.checked);
    same.setAttribute('aria-expanded', String(!same.checked));
    clearErrors();
  }
  find('#school-same-address').addEventListener('change', updateAddress);
  find('#school-login-button').addEventListener('click', () => {
    find('#school-login-status').textContent = 'Autentificarea este doar prezentată în acest demo. Nu se verifică și nu se trimit datele introduse.';
    find('#school-login-password').value = '';
  });
  find('#school-forgot-button').addEventListener('click', () => {
    find('#school-login-status').textContent = 'Recuperarea parolei va fi disponibilă în magazin. Nu a fost trimis niciun e-mail.';
  });
  function openDialog(title, description) {
    find('#school-dialog-title').textContent = title;
    find('#school-dialog-description').textContent = description;
    if (!dialog.open) dialog.showModal();
  }
  root.querySelectorAll('[data-school-policy]').forEach((button) => button.addEventListener('click', () => {
    const title = button.dataset.schoolPolicy === 'privacy' ? 'Confidențialitate' : 'Termeni și condiții';
    openDialog(title, 'Aici va fi afișat documentul magazinului la integrare. În această previzualizare nu sunt colectate sau trimise date și nu se încheie o comandă.');
  }));
  root.querySelectorAll('[data-school-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()));

  function buildRow(item) {
    const row = template.content.firstElementChild.cloneNode(true);
    const product = catalog.getProduct(item.productId);
    const school = catalog.getSchool(item.schoolId);
    row.dataset.cartKey = cart.keyOf(item);
    const url = catalog.productUrl(product, school);
    row.querySelector('.school-checkout-item-image').href = url;
    const image = row.querySelector('img');
    image.src = `assets/${product.image}`;
    image.alt = product.alt;
    const name = row.querySelector('.school-checkout-item-name');
    name.href = url;
    name.textContent = product.name;
    row.querySelector('.school-checkout-item-options').textContent = `${product.color} / Mărime: ${item.size} ani${product.model ? ` / Model: ${product.model}` : ''}`;
    row.querySelector('.school-checkout-item-school').textContent = school.name;
    row.querySelector('.school-checkout-unit-price').textContent = `${money(unitCents(item))} / bucată`;
    row.querySelector('.school-checkout-quantity').setAttribute('aria-label', `Cantitate pentru ${product.name}`);
    row.querySelector('input').setAttribute('aria-label', `Cantitate — ${product.name}`);
    row.querySelector('[data-school-quantity="decrease"]').setAttribute('aria-label', `Scade cantitatea — ${product.name}`);
    row.querySelector('[data-school-quantity="increase"]').setAttribute('aria-label', `Crește cantitatea — ${product.name}`);
    row.querySelector('[data-school-quantity="remove"]').setAttribute('aria-label', `Elimină — ${product.name}`);
    return row;
  }
  function render() {
    const items = cart.getItems();
    form.hidden = !items.length;
    find('#school-checkout-empty').hidden = !!items.length;
    submit.disabled = !items.length;
    const keys = items.map(cart.keyOf);
    if ([...list.children].map((row) => row.dataset.cartKey).join() !== keys.join()) {
      list.replaceChildren(...items.map(buildRow));
    }
    let gross = 0;
    let count = 0;
    items.forEach((item, index) => {
      const row = list.children[index];
      const line = unitCents(item) * item.quantity;
      row.querySelector('input').value = item.quantity;
      row.querySelector('[data-school-quantity="decrease"]').disabled = item.quantity <= 1;
      row.querySelector('[data-school-quantity="increase"]').disabled = item.quantity >= 99;
      row.querySelector('.school-checkout-line-total').textContent = money(line);
      gross += line;
      count += item.quantity;
    });
    const shipping = items.length ? demo.shippingGrossCents : 0;
    const net = Math.round(gross * 100 / (100 + demo.vatPercent));
    const shippingNet = Math.round(shipping * 100 / (100 + demo.vatPercent));
    const total = gross + shipping;
    find('#school-order-count').textContent = `${count} ${count === 1 ? 'produs' : 'produse'}`;
    find('#school-shipping-price').textContent = money(demo.shippingGrossCents);
    find('#school-checkout-subtotal').textContent = money(net);
    find('#school-checkout-shipping-net').textContent = money(shippingNet);
    find('#school-checkout-tax-label').textContent = `TVA (${demo.vatPercent}%)`;
    find('#school-checkout-tax').textContent = money(total - net - shippingNet);
    find('#school-checkout-total').textContent = money(total);
    find('#school-checkout-live').textContent = `${count} produse. Total demonstrativ cu livrare: ${money(total)}.`;
    find('#school-checkout-empty-undo').hidden = !removed;
  }
  function commitQuantity(input) {
    const key = input.closest('.school-checkout-item').dataset.cartKey;
    const item = cart.getItems().find((entry) => cart.keyOf(entry) === key);
    if (!item) return;
    const value = Number(input.value);
    if (!input.value || !Number.isFinite(value)) input.value = item.quantity;
    else cart.setQuantity(key, value);
  }
  list.addEventListener('change', (event) => {
    if (event.target.matches('input')) commitQuantity(event.target);
  });
  list.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.matches('input')) {
      event.preventDefault();
      commitQuantity(event.target);
    }
  });
  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-school-quantity]');
    if (!button) return;
    const key = button.closest('.school-checkout-item').dataset.cartKey;
    const items = cart.getItems();
    const index = items.findIndex((item) => cart.keyOf(item) === key);
    const item = items[index];
    if (!item) return;
    const action = button.dataset.schoolQuantity;
    if (action === 'remove') {
      removed = { item, index };
      find('#school-checkout-removed').hidden = false;
      cart.remove(key);
      const next = list.children[Math.min(index, list.children.length - 1)];
      (next ? next.querySelector('.school-checkout-remove') : find('#school-checkout-empty-title')).focus();
    } else {
      cart.setQuantity(key, item.quantity + (action === 'increase' ? 1 : -1));
      if (button.disabled) button.parentElement.querySelector('input').focus({ preventScroll: true });
    }
  });
  function undo() {
    if (!removed) return;
    const previous = removed;
    removed = null;
    find('#school-checkout-removed').hidden = true;
    cart.restore(previous.item, previous.index);
    const row = [...list.children].find((entry) => entry.dataset.cartKey === cart.keyOf(previous.item));
    row?.querySelector('input').focus();
  }
  find('#school-checkout-undo').addEventListener('click', undo);
  find('#school-checkout-empty-undo').addEventListener('click', undo);

  function checkPasswords() {
    const confirm = find('#school-password-confirm');
    const mismatch = !find('#school-register-fields').disabled && confirm.value !== find('#school-password').value;
    confirm.setCustomValidity(mismatch ? 'Parolele nu coincid.' : '');
  }
  form.addEventListener('input', (event) => {
    if (event.target.type === 'password') checkPasswords();
    if (event.target.validity?.valid) {
      event.target.removeAttribute('aria-invalid');
      event.target.removeAttribute('aria-describedby');
    }
  });
  form.addEventListener('submit', (event) => {
    // Always stop submission; method="dialog" is an additional non-network fallback.
    event.preventDefault();
    if (!cart.getItems().length) return;
    clearErrors();
    checkPasswords();
    const invalid = [...form.elements].filter((input) => input.willValidate && !input.validity.valid);
    if (invalid.length) {
      error.hidden = false;
      error.textContent = invalid[0].validity.customError ? invalid[0].validationMessage : 'Verifică toate câmpurile marcate: completează datele obligatorii, o adresă de e-mail validă și cele două acorduri.';
      invalid.forEach((input) => {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', error.id);
      });
      invalid[0].focus();
      return;
    }
    find('#school-password').value = '';
    find('#school-password-confirm').value = '';
    find('#school-login-password').value = '';
    openDialog('Previzualizare completă.', 'Formularul a fost verificat doar pe acest dispozitiv. Nu a fost plasată nicio comandă, nu s-a creat un cont și nu au fost trimise date. Produsele rămân în coșul demonstrativ.');
  });
  document.addEventListener('school-cart-change', render);
  updateAccount();
  updateAddress();
  render();
})();
