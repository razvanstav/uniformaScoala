(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-product-page');
  if (!root) return;

  // Static presentation data only. Polo details/price follow the supplied product page;
  // other prices and photographs remain the homepage's illustrative examples.
  const products = [
    {
      slug: 'tricou-polo-alb', name: 'Tricou Polo Copii — Alb', price: '40,00 Lei',
      image: 'product-01.jpg', color: 'Alb', swatch: '#ffffff',
      alt: 'Tricou polo alb, purtat cu pantaloni școlari bleumarin',
      description: 'Un clasic pentru fiecare zi de școală. Bumbac 100%, moale și respirabil, într-o croială care lasă loc de mișcare.',
      details: 'Tricou polo alb din bumbac 100%, cu mânecă scurtă și guler clasic. Se poate personaliza cu emblema școlii, la un cost suplimentar în funcție de complexitate.'
    },
    {
      slug: 'bluza-polo', name: 'Bluză Polo Unisex', price: '54,99 Lei',
      image: 'product-02.jpg', color: 'Bleumarin', swatch: '#1c2234',
      alt: 'Bluză polo bleumarin cu mânecă lungă, purtată cu fustă școlară',
      description: 'Guler clasic și mânecă lungă. O piesă ușor de asortat, pentru zilele mai răcoroase din timpul anului școlar.',
      details: 'Bluză polo cu mânecă lungă, prezentată în varianta bleumarin. Materialul, mărimile și personalizarea se confirmă pentru uniforma fiecărei școli.'
    },
    {
      slug: 'pantaloni-scolari', name: 'Pantaloni Școlari', price: '65,00 Lei',
      image: 'product-03.jpg', color: 'Bleumarin', swatch: '#1c2234',
      alt: 'Pantaloni școlari bleumarin, cu croială dreaptă',
      description: 'Linii simple, croială dreaptă și o culoare care se potrivește cu întreaga uniformă. Pentru fiecare zi de școală.',
      details: 'Pantaloni școlari prezentați în varianta bleumarin. Croiala, materialul și mărimile disponibile se confirmă în colecția școlii.'
    },
    {
      slug: 'hanorac-scolar', name: 'Hanorac Școlar', price: '67,00 Lei',
      image: 'product-04.jpg', color: 'Bleumarin', swatch: '#1c2234',
      alt: 'Hanorac școlar bleumarin cu fermoar, purtat peste un tricou polo alb',
      description: 'Un strat în plus pentru diminețile răcoroase. Hanoracul cu fermoar completează firesc uniforma de zi cu zi.',
      details: 'Hanorac bleumarin cu glugă și fermoar, prezentat peste un tricou polo alb. Verifică materialul și opțiunile de personalizare în colecția școlii.'
    },
    {
      slug: 'fusta-scolara', name: 'Fustă Școlară', price: '65,00 Lei',
      image: 'product-05.jpg', color: 'Bleumarin', swatch: '#1c2234',
      alt: 'Fustă școlară plisată, bleumarin, asortată cu un tricou polo alb',
      description: 'Pliuri ordonate și o linie clasică. O piesă care completează uniforma și păstrează identitatea școlii.',
      details: 'Fustă școlară plisată, prezentată în varianta bleumarin. Lungimea, materialul și mărimile se confirmă pentru uniforma școlii.'
    },
    {
      slug: 'tricou-polo-visiniu', name: 'Tricou Polo Vișiniu', price: '45,00 Lei',
      image: 'product-06.jpg', color: 'Vișiniu', swatch: '#682c3c',
      alt: 'Tricou polo vișiniu cu mânecă scurtă, purtat cu pantaloni bleumarin',
      description: 'O culoare distinctă, aceeași linie clasică. Tricoul polo vișiniu aduce identitate uniformei de fiecare zi.',
      details: 'Tricou polo vișiniu, cu mânecă scurtă și guler clasic. Materialul și emblema se confirmă pentru uniforma fiecărei școli.'
    }
  ];
  const requested = new URLSearchParams(window.location.search).get('produs');
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

  const related = root.querySelector('#school-related-products');
  products.filter((item) => item !== product).slice(0, 3).forEach((item) => {
    const article = document.createElement('article');
    article.className = 'school-product-card';
    const link = document.createElement('a');
    link.className = 'school-product-link';
    link.href = `produs.html?produs=${item.slug}`;
    const frame = document.createElement('div');
    frame.className = 'school-product-image';
    const image = document.createElement('img');
    image.src = `assets/${item.image}`;
    image.alt = item.alt;
    image.width = 900;
    image.height = 1125;
    image.loading = 'lazy';
    image.decoding = 'async';
    frame.append(image);
    const info = document.createElement('div');
    info.className = 'school-product-info';
    const text = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'school-product-name';
    title.textContent = item.name;
    const price = document.createElement('p');
    price.className = 'school-product-price';
    price.textContent = item.price;
    text.append(title, price);
    const arrow = document.createElement('span');
    arrow.className = 'school-product-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    info.append(text, arrow);
    link.append(frame, info);
    article.append(link);
    related.append(article);
  });
})();
