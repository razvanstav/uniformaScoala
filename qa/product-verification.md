# NOVRI — pagini de produs demo

Verificare în browser la 6 septembrie 2026.

- 375, 390, 430, 768, 1024, 1280, 1440, 1920 px: fără overflow orizontal, un singur H1, fotografie încărcată, cinci opțiuni de mărime încadrate. O coloană pe telefon, două începând de la 768 px.
- Inspecție vizuală a paginii la 390 și 1440 px; capturi în `product-mobile.png` și `product-desktop.png`.
- Toate cele șase URL-uri afișează numele, prețul și fotografia corespunzătoare, plus trei produse asociate. Rezultatele sunt în `product-routes.json`.
- Click pe primul produs de pe homepage deschide tricoul polo alb. CTA-ul paginii de produs revine la selectorul de școli de pe homepage.
- Mărimea se selectează prin click și taste săgeată; 8 ani → ArrowRight → 10 ani. Contorul coșului rămâne 0.
- Enter deschide secțiunea „Cum alegi mărimea”. Selectorul școlilor se deschide cu Enter/Space și se închide cu Escape; nouă școli în grupurile București și Teleorman. Meniul mobil se deschide și se închide cu Escape.
- Încărcarea finală a paginii de produs într-o filă nouă: fără erori JavaScript. Sintaxa celor trei fișiere JavaScript verificată cu `node --check`; `git diff --check` trece.

Datele tricoului alb provin din pagina furnizată de utilizator: https://uniformascoala.ro/index.php?route=product/product&path=69_59&product_id=73. Numele, prețul 40,00 Lei și bumbacul 100% au fost verificate în browser. Opțiunile reale de mărime nu erau afișate în lista sursă; cele din demo sunt explicit orientative. Fotografiile rămân materialele demonstrative locale.

Nu au fost introduse funcții de cumpărare, API-uri, backend, librării sau pachete. Site-ul public nu a fost modificat.
