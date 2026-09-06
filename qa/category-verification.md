# NOVRI — colecția unei școli, 6 septembrie 2026

## Responsive și aspect

Verificat în browser la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px. Niciun overflow orizontal, un singur H1, titlu încadrat inclusiv pentru Liceul Teologic Adventist „Ștefan Demetrescu”. Un produs pe telefon, două la 768 px, trei de la 1024 px. Filtrele sunt ascunse inițial pe mobil și afișate în coloană pe desktop. Rezultate exacte în `category-responsive.json`.

Inspecție vizuală: intro și grid desktop, coloană de filtre și panou mobil. Capturi: `category-desktop.png`, `category-filters-desktop.png`, `category-filters-mobile.png`.

## Interacțiuni

- Selectorul de pe homepage deschide categoria locală a școlii alese. Verificat traseul către „Ștefan Demetrescu”: numele corect, șase produse demo.
- Bleumarin → 4 produse; Bleumarin + 14 ani → 2 produse.
- Adăugarea Fuste la combinația de mai sus → 0 produse și stare fără rezultate. Eliminarea filtrului Fuste → 2 produse.
- Tipuri multiple Bluze + Hanorace → 2 produse (OR); grupurile diferite se combină prin AND.
- Sortare descrescătoare: Hanorac 67,00 Lei, apoi Bluză 54,99 Lei. Crescătoare: ordinea inversă.
- Click pe produs și revenire prin CTA păstrează școala, mărimea, culoarea și sortarea.
- Resetare → 6 produse și zero checkbox-uri selectate. Reîncărcarea păstrează filtrele și valoarea sortării din URL.
- Mobile: checkbox-uri din tastatură, panou deschis din buton, „Vezi produsele” și Escape închid panoul și restabilesc focusul pe „Filtre”.
- Browser console: fără erori JavaScript pe paginile verificate.

Rezultatele interacțiunilor sunt în `category-interactions.json`. Sintaxa `catalog.js`, `category.js`, `product.js`, `main.js` verificată cu `node --check`; `git diff --check` trece.

Colecțiile, asocierile produs–școală și mărimile sunt demonstrative. Filtrarea este locală, fără API, backend sau coș. Pagina publică OpenCart nu a fost modificată.
