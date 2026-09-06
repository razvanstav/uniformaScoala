# Coș NOVRI — template demonstrativ

`cos.html` este pagina separată de coș, în același stil cu homepage-ul, colecția și produsul. Iconița de coș din toate paginile duce aici. Nu există comenzi, plăți, API sau integrare OpenCart în această etapă.

## Fișiere și ordine de încărcare

| Fișier | Rol |
| --- | --- |
| `cos.html` | Template semantic, produse, sumar, voucher, stare goală, link către checkout |
| `css/styles.css` | Aspectul comun NOVRI |
| `css/cart.css` | Layout-ul coșului, cantități, sumar și responsive |
| `js/catalog.js` | Produse, școli, prețuri și URL-uri demonstrative comune |
| `js/cart-state.js` | Stare locală demonstrativă și contorul din header |
| `js/navigation.js` | Meniul comun |
| `js/cart.js` | Afișarea coșului, totaluri și interacțiuni |

CSS-ul comun se încarcă înainte de `cart.css`. Scripturile se încarcă în ordinea din tabel, toate cu `defer`. Nu sunt necesare CSS-ul sau scripturile de categorie/produs pentru pagina de coș. Celelalte pagini încarcă `cart-state.js` după catalog, pentru contorul comun.

Wrapper-ul este `#school-uniforms-landing.school-cart-page`; toate clasele sunt prefixate `school-`. Header-ul și footer-ul sunt incluse în HTML. La integrare, transferă wrapper-ul și referințele către assets în template-ul dedicat, fără a dubla documentul gazdă `html/head/body`. Dezactivarea Journal pentru acest template se face ulterior.

## Modelul demo

Lista `seeds` din `js/cart-state.js` definește două produse exemplu. Fiecare linie conține:

```js
{
  productId: 'tricou-polo-alb',
  schoolId: 'liceul-teoretic-mihai-ionescu',
  size: '10',
  quantity: 1
}
```

Produsele, școala și mărimea sunt verificate față de catalogul demo. Cheia unei linii combină produsul, școala și mărimea. Cantitățile acceptate sunt întregi între 1 și 99. Datele invalide din stocarea locală sunt ignorate sau normalizate.

Starea se păstrează numai în `sessionStorage`, cheia `school-novri-cart-demo-v1`. Modificările persistă la refresh și la navigarea între pagini în aceeași filă. Coșul gol rămâne gol la reîncărcare. Nu există sincronizare între dispozitive, conturi sau file independente. Dacă stocarea este blocată, coșul funcționează în memoria paginii curente. Nu se stochează adrese, date personale, coduri de voucher sau date de plată.

Butonul „Resetează coșul demo” restabilește cele două exemple. Nu există butoane de adăugare în coș pe produsele demo și nu se presupune că această listă reprezintă cumpărăturile reale ale utilizatorului.

## Interacțiuni

- Butoane +/− și introducere numerică directă; Enter sau ieșirea din câmp confirmă cantitatea.
- Cantitățile goale/invalide revin la valoarea anterioară; cele în afara intervalului sunt limitate la 1–99.
- Eliminare și anularea ultimei eliminări. Restaurarea nu suprascrie modificările făcute între timp pe celelalte linii.
- Contorul din header reprezintă suma cantităților, nu numărul de produse distincte.
- Totalurile sunt calculate în bani întregi, apoi formatate în lei. Livrarea nu este inclusă, nu se calculează taxe separate și nu se estimează un cost de transport fictiv.
- Voucherul afișează un mesaj demonstrativ și nu aplică reduceri.
- „Finalizare comandă” deschide pagina separată `checkout.html`, care folosește aceeași stare a coșului. Formularul este demonstrativ și nu trimite comenzi; vezi [INTEGRARE-CHECKOUT.md](INTEGRARE-CHECKOUT.md).
- Produsele și numele școlii au linkuri către paginile demo corespunzătoare. „Continuă cumpărăturile” duce la colecția școlii din prima linie; în coșul gol se folosește prima școală demo.

## Puncte de înlocuit în OpenCart

`window.SchoolCartDemo` expune `getItems`, `keyOf`, `setQuantity`, `remove`, `restore`, `reset`. Actualizările emit evenimentul `school-cart-change`. Acestea sunt funcții ale previzualizării locale, nu API-uri ale magazinului.

La integrare, înlocuiește `cart-state.js` cu un adaptor pentru coșul real și elimină datele seed, stocarea demo și butonul de resetare. Nu lăsa contorul demonstrativ să suprascrie datele OpenCart. Prețurile, taxele, reducerile, disponibilitatea și costul livrării trebuie furnizate de magazin.

În `cos.html`:

- `#school-cart-row-template`: markup-ul unei linii de produs;
- `#school-cart-items`: lista produselor;
- `#school-cart-subtotal`, `#school-cart-total`: valorile sumarului;
- `[data-school-cart-count]`: contorul comun;
- `#school-coupon-form`: zona viitorului voucher;
- `#school-checkout-button`: linkul actual către `checkout.html`, de înlocuit cu ruta reală la integrare.

Nu există framework-uri, pachete, build tools sau servicii externe. Fotografiile sunt aceleași materiale demonstrative locale din restul proiectului.
