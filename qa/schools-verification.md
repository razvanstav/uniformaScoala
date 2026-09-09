# NOVRI — verificare director școli

Data: 9 septembrie 2026. Pagină locală: `http://127.0.0.1:4173/scoli.html`.

## Responsive și aspect

Verificat în browser la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px. Nicio depășire orizontală a documentului. Grid: o coloană pe telefon, două pe tabletă, trei pe desktop. Un singur H1 la toate dimensiunile. Bara județelor permite scroll propriu pe telefon.

Header-ul comun a fost verificat separat la 1024 px pe toate cele șapte pagini; cele patru linkuri de navigație încap pe un rând. Emblemele sunt încărcate local la 120 × 120 px, cu dimensiuni rezervate. Toate cele șapte imagini s-au încărcat.

Capturi inspectate: `schools-desktop.png`, `schools-grid-desktop.png`, `schools-mobile.png`, `schools-grid-mobile.png`. Măsurători: `schools-responsive.json`.

## Interacțiuni

- Căutare fără diacritice și cu majuscule: `SANTIMBREANU` găsește școala corectă.
- Escape golește căutarea și păstrează focusul în câmp.
- Teleorman afișează cinci școli; combinat cu `nr 7`, afișează o singură școală.
- Refresh și Back restabilesc căutarea și județul din URL.
- Școala Nr. 7 deschide colecția corectă; produsul și întoarcerea la colecție păstrează contextul aceleiași școli.
- O căutare inexistentă afișează starea goală; resetarea restabilește toate cele nouă școli și focusul.
- Căutarea `Alexandria` găsește cele trei înregistrări care au localitatea completată în catalog.
- Butonul București poate fi activat cu Space; rezultatul are patru școli.
- Meniul mobil se închide cu Escape și readuce focusul în buton.
- Fără erori de consolă în fluxul verificat.

Rezultatele sunt salvate în `schools-interactions.json`. Sintaxa JS a fișierelor noi/modificate și `git diff --check` au trecut. Aceste verificări acoperă demo-ul local, nu integrarea viitoare în Journal/OpenCart.
