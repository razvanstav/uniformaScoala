(() => {
  'use strict';
  // Shared static demo catalog. Original school URLs are retained for later OpenCart integration.
  const schools = [
    {
      name: 'Liceul Teoretic "Mihai Ionescu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/liceul-teoretic-mihai-ionescu'
    },
    {
      name: 'Școala Gimnazială "M. Sântimbreanu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-m-santimbreanu'
    },
    {
      name: 'Școala Gimnazială Nr. 2 "Mihai Viteazul"',
      county: 'Teleorman',
      city: '',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-nr-2-mihai-viteazul'
    },
    {
      name: 'Școala Gimnazială "Mihai Eminescu"',
      county: 'Teleorman',
      city: 'Alexandria',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-mihai-eminescu'
    },
    {
      name: 'Școala Gimnazială Nr. 7',
      county: 'Teleorman',
      city: 'Alexandria',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-nr-7'
    },
    {
      name: 'Liceul Teologic Adventist "Ștefan Demetrescu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/liceul-teologic-adventist-stefan-demetrescu'
    },
    {
      name: 'Școala Gimnazială "Avram Iancu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-avram-iancu'
    },
    {
      name: 'Școala Gimnazială "Ștefan cel Mare"',
      county: 'Teleorman',
      city: '',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-stefan-cel-mare'
    },
    {
      name: 'Colegiul Național "AI Cuza" Alexandria',
      county: 'Teleorman',
      city: 'Alexandria',
      url: 'https://meai.ro/uniforme-scolare/colegiul-national-ai-cuza-alexandria'
    }
  ];
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
  // All memberships and size availability below are DEMO data, not live stock.
  const variants = {
    'tricou-polo-alb': { type: 'tricouri-polo', typeName: 'Tricouri polo', colorId: 'alb', sizes: ['6', '8', '10', '12', '14'] },
    'bluza-polo': { type: 'bluze', typeName: 'Bluze', colorId: 'bleumarin', sizes: ['8', '10', '12', '14'] },
    'pantaloni-scolari': { type: 'pantaloni', typeName: 'Pantaloni', colorId: 'bleumarin', sizes: ['6', '8', '10', '12'] },
    'hanorac-scolar': { type: 'hanorace', typeName: 'Hanorace', colorId: 'bleumarin', sizes: ['8', '10', '12', '14'] },
    'fusta-scolara': { type: 'fuste', typeName: 'Fuste', colorId: 'bleumarin', sizes: ['6', '8', '10'] },
    'tricou-polo-visiniu': { type: 'tricouri-polo', typeName: 'Tricouri polo', colorId: 'visiniu', sizes: ['10', '12', '14'] }
  };
  products.forEach((product) => Object.assign(product, variants[product.slug], {
    priceValue: Number(product.price.replace(' Lei', '').replace(',', '.'))
  }));
  schools.forEach((school) => {
    school.slug = school.url.split('/').pop();
    // Add productIds to a school record to give it an individual collection.
    // The demonstration defaults to the same six items for every school.
    school.productIds ??= products.map((product) => product.slug);
  });
  const getSchool = (slug) => schools.find((school) => school.slug === slug);
  const getProduct = (slug) => products.find((product) => product.slug === slug);
  const schoolProducts = (school) => products.filter((product) => school.productIds.includes(product.slug));

  function routeParams(school, filters = new URLSearchParams()) {
    const params = new URLSearchParams();
    if (school) params.set('scoala', school.slug);
    for (const key of ['marime', 'culoare', 'tip', 'sortare']) {
      for (const value of filters.getAll(key)) params.append(key, value);
    }
    return params;
  }
  function categoryUrl(school, filters) {
    return `categorie.html?${routeParams(school, filters)}`;
  }
  function productUrl(product, school, filters) {
    const params = routeParams(school, filters);
    params.set('produs', product.slug);
    return `produs.html?${params}`;
  }
  function createProductCard(product, { school, filters, heading = 'h2', eager = false } = {}) {
    const article = document.createElement('article');
    article.className = 'school-product-card';
    const link = document.createElement('a');
    link.className = 'school-product-link';
    link.href = productUrl(product, school, filters);
    const frame = document.createElement('div');
    frame.className = 'school-product-image';
    const image = document.createElement('img');
    image.src = `assets/${product.image}`;
    image.alt = product.alt;
    image.width = 900;
    image.height = 1125;
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';
    frame.append(image);
    const info = document.createElement('div');
    info.className = 'school-product-info';
    const text = document.createElement('div');
    const title = document.createElement(heading);
    title.className = 'school-product-name';
    title.textContent = product.name;
    const price = document.createElement('p');
    price.className = 'school-product-price';
    price.textContent = product.price;
    text.append(title, price);
    const arrow = document.createElement('span');
    arrow.className = 'school-product-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    info.append(text, arrow);
    link.append(frame, info);
    article.append(link);
    return article;
  }
  window.SchoolCatalog = Object.freeze({ schools, products, getSchool, getProduct, schoolProducts, categoryUrl, productUrl, createProductCard });
})();
