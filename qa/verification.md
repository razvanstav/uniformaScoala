# Verificare versiune statică — 5 septembrie 2026

Testare efectuată în browserul integrat Chromium, cu viewport-uri explicite. Nu reprezintă testare pe dispozitive fizice sau validare în OpenCart/Journal.

| Viewport | Coloane produse | Overflow orizontal al paginii | Navigație |
| --- | --- | --- | --- |
| 375 px | 1 | Nu | Meniu mobil |
| 390 px | 1 | Nu | Meniu mobil |
| 430 px | 1 | Nu | Meniu mobil |
| 768 px | 2 | Nu | Meniu mobil |
| 1024 px | 3 | Nu | Desktop |
| 1280 px | 3 | Nu | Desktop |
| 1440 px | 3 | Nu | Desktop |
| 1920 px | 3 | Nu | Desktop |

Măsurătorile DOM sunt salvate în `responsive-checks.json`. Scrollbar-ul vertical al browserului rezervă 15 px, astfel încât lățimea utilă este cu 15 px mai mică decât viewport-ul configurat. Overflow-ul intern al barei de categorii este intenționat și nu mărește pagina.

Verificat vizual: intro, proporțiile fotografiilor, grid, banner editorial, avantaje, CTA pentru parteneri și footer. Capturile `viewport-*.png` documentează cele opt dimensiuni; `desktop-full.png` arată compoziția completă.

Verificări de interacțiune:

- Selector generat din cele 9 școli, listă cu scroll, fără deplasarea grid-ului.
- Space și Enter deschid; Arrow Down / Up mută focusul; Home / End funcționează; Escape închide și readuce focusul; Tab iese din listă.
- Clickul exterior închide selectorul.
- Enter pe prima școală navighează la `https://meai.ro/uniforme-scolare/liceul-teoretic-mihai-ionescu`.
- Meniul mobil se deschide, focalizează primul link și se închide cu Escape.
- CTA-ul bannerului focalizează selectorul și derulează la 26 px de partea superioară.
- Căutarea opțională a fost activată temporar pentru test: „santimbreanu” găsește „M. Sântimbreanu”; textul fără corespondent afișează starea goală. Configurația livrată este `false`.

Verificări de fișiere: sintaxă JavaScript validă, un H1, imagini cu alt/dimensiuni, asset-uri locale existente, fără scripturi externe, fără pachete sau build. Fonturile și toate cele nouă elemente img s-au încărcat în browser. Preferința pentru mișcare redusă este respectată în CSS și în handlerul de scroll.

Fotografiile și wordmark-ul sunt materiale demonstrative; produsele și prețurile nu sunt sincronizate cu magazinul.

## Actualizare: grupare pe județe

- Nouă școli în două grupuri, sortate în limba română: București (4) și Teleorman (5).
- Etichete bordurate, antete sticky în interiorul grupului, localitate secundară unde este cunoscută și nu se repetă în nume.
- Testat pe mobil la 390 px: Space, Arrow Down peste granița grupurilor, End și Escape. Opțiunea focalizată rămâne vizibilă sub antet; ultimul rând rămâne în viewport.
- Căutare opțională: „teleorman” → 5 școli; „bucuresti” → 4; „alexandria” → 3; fără rezultat → zero grupuri vizibile. Redeschiderea resetează toate grupurile. Câmpul rămâne dezactivat în versiunea livrată.
- Sintaxă JavaScript validă. Sursele localităților sunt în `school-locations.md`.
