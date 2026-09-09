# Colecția școlii — template NOVRI

Pagina este un demo static HTML5 / CSS / JavaScript. Nu modifică magazinul public și nu necesită pachete, build, API, PHP sau baze de date.

## Fișiere

| Fișier | Rol |
| --- | --- |
| `categorie.html` | Template separat: header, intro școală, filtre, produse, footer |
| `css/styles.css` | Aspect comun NOVRI: fonturi, header, carduri de produs, footer |
| `css/category.css` | Layout-ul colecției și filtrelor, inclusiv mobile |
| `js/catalog.js` | Date demo comune, URL-uri și generarea cardurilor |
| `js/cart-state.js` | Contorul coșului demo, păstrat în aceeași filă |
| `js/navigation.js` | Meniu comun și linkuri placeholder |
| `js/category.js` | Școala curentă, filtre, sortare, rezultate și stare în URL |

Ordinea scripturilor este `catalog.js`, `cart-state.js`, `navigation.js`, `category.js`, toate cu `defer`. CSS-ul comun se încarcă înainte de CSS-ul categoriei. Nu este necesar `product.css`, `product.js` sau `main.js` pentru această pagină.

Wrapper-ul template-ului este:

```html
<div id="school-uniforms-landing" class="school-category-page">
  <!-- Conținutul paginii categorie.html -->
</div>
```

Toate stilurile sunt în wrapper, clasele au prefixul `school-`. În template-ul OpenCart dedicat se păstrează wrapper-ul și fișierele de mai sus; nu se dublează elementele `html`, `head` sau `body` ale documentului gazdă. Referințele relative către assets trebuie adaptate la locația finală. Header-ul și footer-ul NOVRI sunt deja incluse în HTML. Dezactivarea Journal pe acest template rămâne pentru etapa de integrare.

## Date demonstrative

În `js/catalog.js` există o singură listă `schools` și o singură listă `products`, folosite de selector, directorul școlilor, colecție și pagina de produs.

Fiecare școală păstrează `name`, `county`, `city`, `url`. Câmpul `slug` se derivă din URL-ul original. Opțional, adaugă `productIds` direct în obiectul școlii pentru o colecție individuală:

```js
productIds: ['tricou-polo-alb', 'pantaloni-scolari', 'hanorac-scolar']
```

În lipsa listei, demo-ul afișează aceleași șase produse pentru fiecare școală. Această asociere, fotografiile și disponibilitatea mărimilor sunt orientative, nu inventar real.

Produsele au `slug`, `name`, `price`, `image`, `color`, `swatch`, `alt`, `description`, `details`. Obiectul `variants`, indexat după slug, definește `type`, `typeName`, `colorId`, `sizes`. Prețul numeric pentru sortare este derivat din textul prețului. La adăugarea unui produs, completează atât obiectul lui, cât și intrarea sa din `variants`.

Funcțiile `categoryUrl` și `productUrl` concentrează rutele demo. `school.url` păstrează URL-ul OpenCart original. Înlocuirea rutelor și a datelor cu cele din OpenCart se face ulterior, fără a modifica structura vizuală a filtrelor.

## Navigare

```text
index.html → selector școală
  → categorie.html?scoala=liceul-teoretic-mihai-ionescu
  → produs.html?scoala=liceul-teoretic-mihai-ionescu&produs=tricou-polo-alb
  → înapoi la colecția aceleiași școli
```

Alternativ, `scoli.html` grupează toate școlile pe județe și deschide aceeași colecție locală. „Schimbă școala” și breadcrumb-ul „Toate școlile” duc la acest director. Detalii în [INTEGRARE-SUBCATEGORII.md](INTEGRARE-SUBCATEGORII.md).

Un parametru `scoala` absent sau necunoscut pe categoria demo afișează prima școală. Filtrele se păstrează în query string; nu se utilizează localStorage, cookie-uri sau cereri către server.

## Filtre

- `tip`: tricouri-polo, bluze, pantaloni, hanorace, fuste.
- `marime`: valorile demo 6, 8, 10, 12, 14, afișate în ani.
- `culoare`: alb, bleumarin, visiniu.
- `sortare`: recomandate, pret-crescator, pret-descrescator, nume.

Opțiunile disponibile sunt derivate din colecția școlii. Mai multe valori din același grup se combină cu OR, iar grupurile între ele cu AND. De exemplu, Bleumarin + 14 ani afișează două produse din demo. Numerele de lângă tipuri și culori țin cont de celelalte grupuri de filtre. Nicio opțiune nu este dezactivată automat; combinațiile fără rezultate au mesaj și buton de resetare.

Filtrele active se pot elimina individual sau toate odată; resetarea păstrează ordinea de sortare aleasă. După schimbare, URL-ul se actualizează fără reîncărcare. Linkurile către produse includ școala și filtrele pentru revenire. Nu se transmite și nu se salvează o comandă.

## Responsive și accesibilitate

Sub 1024 px, filtrele se deschid într-un panou în fluxul paginii, din butonul „Filtre”. Butonul „Vezi produsele” și Escape îl închid și restabilesc focusul. Desktop-ul are coloană de filtre și grid cu trei produse; tableta are două produse, telefonul unul, în acord cu homepage-ul.

Checkbox-uri native, `fieldset`/`legend`, sortare cu `select` etichetat, `aria-expanded`/`aria-controls` și anunțarea numărului de rezultate prin `aria-live`. Imaginile au dimensiuni definite, iar cele de mai jos sunt încărcate lazy. Nu există animații noi sau integrare ecommerce.
