# Meniu mobil și titluri interioare — 9 septembrie 2026

## Problema reprodusă

Pe homepage la 390 px, patru clickuri consecutive pe iconița hamburger/X lăsau meniul deschis de fiecare dată. La activarea cu pointerul, focusul ajungea temporar pe document; microtask-ul din `focusout` închidea meniul înaintea handlerului de click, care îl redeschidea imediat.

`navigation.js` închide acum meniul la ieșirea focusului numai dacă `relatedTarget` este un element din afara header-ului. Clickul exterior are în continuare propriul handler. Butonul își actualizează și textul vizibil: „Meniu” / „Închide”.

## Probe în browser

- Pe toate cele 14 pagini, la 390 × 844 px: patru clickuri pe iconiță produc deschis / închis / deschis / închis; `hidden` și `aria-expanded` corespund.
- Enter și Space deschid meniul; Space îl și închide. Escape îl închide și readuce focusul pe buton.
- Clickul pe textul butonului funcționează în ambele sensuri.
- Tab în afara header-ului și clickul pe o zonă exterioară închid meniul.
- Linkul „Toate școlile” deschide `scoli.html`, cu meniul închis.
- Trecerea de la mobil cu meniul deschis la 1024 px afișează navigația desktop și ascunde butonul. Revenirea la 390 px restabilește meniul mobil închis.
- Captura la 375 px confirmă că logo-ul, coșul și butonul „Închide” încap în header.

Rezultate: `navigation-interactions.json`, inclusiv starea reprodusă înaintea corecției.

## Titluri și responsive

Titlurile interioare folosesc 22–32 px și introduceri compacte. Homepage-ul și contactul păstrează dimensiunile mari. Pagina școlilor păstrează alegerea județului imediat sub header. Textele articolelor de informații și condițiile comerciale nu sunt modificate.

Verificate toate cele 14 pagini la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px: 112 combinații fără overflow orizontal al documentului sau titlului, cu un singur H1 și fără imagini vizibile defecte. H1-ul ascuns vizual din directorul școlilor este exclus din măsurarea încadrării titlului. Cele două elemente `img` ascunse, fără `src`, pentru școli fără emblemă nu sunt imagini defecte.

Rezultate: `compact-headings-responsive.json`. Capturi: `compact-information-375.png`, `navigation-open-375.png`, `compact-checkout-375.png`, `compact-product-375.png`, `compact-cart-1440.png`, `compact-category-1440.png`, `compact-information-1440.png`.

Verificări de cod: sintaxa `navigation.js`, un singur buton/meniu/script comun pe fiecare pagină, atributele ARIA corelate, conținutul secțiunilor informative neschimbat și `git diff --check`.
