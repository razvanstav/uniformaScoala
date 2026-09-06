# NOVRI — Uniforme școlare, versiunea statică 1

Deschide `index.html` direct în browser. Toate fișierele necesare sunt locale; pagina nu cere instalare, build sau conexiune la un serviciu extern. Pentru previzualizarea din workspace se poate folosi `node qa/serve.cjs`, executat din directorul părinte, apoi http://127.0.0.1:4173/.

## Structură

```text
uniforme-scolare-landing/
  index.html
  produs.html
  css/styles.css
  css/product.css
  js/main.js
  js/navigation.js
  js/product.js
  assets/
    product-01.jpg … product-06.jpg
    hero.jpg
    logo.svg
    image-prompts.md
    fonts/
      archivo-expanded-latin.woff2
      archivo-expanded-latin-ext.woff2
      OFL.txt
```

## Referința vizuală

Analiză vizuală și măsurători ale paginii [Milano / Shirts](https://milano-template.modulify.website/category/shirts), 5 septembrie 2026. Nu s-au copiat HTML, CSS, JavaScript sau imagini de pe Milano.

- Intro centrat, mult spațiu deasupra, font Archivo Expanded, navigație discretă.
- La 1440 px, referința are un heading de 64 px, margini laterale de aproximativ 66 px, spații de 30 px între produse și fotografii de aproximativ 301 × 360 px. Cele trei produse ocupă trei poziții dintr-un grid de patru coloane.
- La 390 px, referința folosește un produs pe rând, margini de 14 px și un heading de 28 px. Footer-ul original este închis la culoare, cu o bandă decorativă și newsletter.
- Adaptările cerute pentru NOVRI: fundal off-white mai deschis, titlu mai mare, trei coloane complete pe desktop, două pe tabletă, una pe telefon, selector de școli și un titlu static pentru selecția de produse. Footer-ul alb, bannerul și CTA-ul pentru parteneri păstrează ierarhia editorială, cu conținutul din brief. Newsletter-ul, banda animată și funcțiile de cumpărare din referință nu au fost reproduse.

## Modificări ulterioare

- **Pagini de produs demo:** toate cele șase produse de pe homepage duc la `produs.html?produs=...`. Datele sunt în array-ul `products` din `js/product.js`. Fotografia, numele, culoarea, prețul și produsele asociate corespund produsului ales. Un parametru absent sau necunoscut afișează tricoul polo alb. Fără JavaScript, HTML-ul prezintă tricoul alb ca exemplu static.
- **Interacțiuni produs:** mărimi demonstrative selectabile prin radio buttons native, inclusiv din tastatură; secțiuni native `details/summary`; link înapoi la colecție și CTA către selectorul de școli. Fără adăugare în coș, cantități, stoc în timp real sau comenzi. Mărimile din demo sunt exemple, nu disponibilitate confirmată.
- **Datele tricoului alb:** denumirea, prețul de 40,00 Lei și compoziția de bumbac 100% au fost consultate pe [pagina produsului existent](https://uniformascoala.ro/index.php?route=product/product&path=69_59&product_id=73), la 6 septembrie 2026. Homepage-ul are același nume și preț. Celelalte produse păstrează prețurile demonstrative din brief. Fotografiile sunt cele locale generate anterior; nu sunt imagini preluate de pe magazin.
- **Navigație comună:** `js/navigation.js` gestionează meniul și linkurile placeholder pe ambele pagini. `js/main.js` gestionează numai selectorul de școli de pe homepage. Pagina de produs încarcă `css/styles.css` + `css/product.css` și `js/navigation.js` + `js/product.js`. Header-ul și footer-ul rămân HTML semantic, fără încărcare prin JavaScript.
- **Hero superior:** compoziție editorială inspirată din captura Milano furnizată ulterior, cu textul „Pregătiți pentru fiecare zi de școală”. Reutilizează fotografia locală `product-01.jpg`; pe telefon, fotografia apare sub text. CTA-ul duce la selectorul școlilor.
- **Coș:** linkul `.school-cart-link` conține un SVG și contorul static `#school-cart-count` (disponibil și prin `[data-school-cart-count]`). La integrare, înlocuiește `href` și textul contorului cu datele OpenCart. Denumirea accesibilă include automat valoarea afișată. Nu există logică de coș în prototip.
- **Școli:** editează exclusiv `const schools` din `js/main.js`. Fiecare școală are `name`, `county`, `city` și `url`. Dropdown-ul grupează automat după `county`, sortează județele și școlile alfabetic cu regulile limbii române și afișează localitatea sub numele școlii atunci când este diferită de județ. Etichetele județelor au chenar și rămân vizibile la derularea grupului. Selectarea navighează la `school.url`. Pentru o locație neconfirmată, lasă câmpul gol; școala rămâne accesibilă în grupul final „Județ neprecizat”.
- **Căutare opțională în școli:** schimbă `selectorSettings.searchEnabled` din `false` în `true`. Caută după școală, județ sau localitate, inclusiv fără diacritice, și ascunde grupurile fără rezultate. Implicit, câmpul nu este afișat.
- **Produse și cont:** înlocuiește `href="#"` direct în HTML. Linkurile devin active fără alte schimbări; handlerul ignoră doar placeholder-ele cu valoarea exactă `#`.
- **Fotografii:** înlocuiește JPEG-urile păstrând denumirile. Produsele au 900 × 1125 px (4:5), iar bannerul 1600 × 1000 px. Actualizează atributele `width`, `height` și `alt` dacă se schimbă imaginile.
- **Aspect:** culorile și marginile de bază sunt variabile `--school-*` pe wrapper. Pragurile principale sunt 600 px și 1024 px; ajustarea secundară desktop este la 1280 px.

## Materiale demonstrative

Cele șapte fotografii sunt generate cu instrumentul integrat ImageGen, exclusiv pentru această previzualizare. Nu reprezintă inventarul real NOVRI. Prompturile exacte și corespondența imaginilor sunt în `assets/image-prompts.md`. Prețurile sunt exemplele din brief. `logo.svg` este un wordmark NOVRI provizoriu desenat vectorial, care poate fi înlocuit cu logo-ul oficial.

Archivo este găzduit local, cu caracterele românești incluse. Sursă: [Google Fonts / Archivo](https://fonts.google.com/specimen/Archivo). Licența SIL Open Font License este inclusă în `assets/fonts/OFL.txt`.

## Interacțiuni și accesibilitate

- Enter / Space deschid selectorul și activează școala focalizată.
- Săgețile sus / jos parcurg lista; Home / End sar la început / sfârșit. Tastarea caută după începutul numelui.
- Escape închide selectorul și restabilește focusul. Tab iese natural din listă, fără blocarea tastaturii. Clickul exterior închide lista.
- Lista are scroll propriu, iar înălțimea se adaptează la spațiul vizibil.
- Județele sunt grupuri ARIA etichetate; navigarea cu săgeți traversează numai școlile, iar antetul județului nu ascunde opțiunea focalizată.
- Meniul mobil se deschide din buton, se închide cu Escape, la click exterior sau la ieșirea focusului.
- CTA-ul editorial derulează la selector și îi mută focusul. Mișcarea redusă dezactivează tranzițiile și derularea lină.
- Un singur H1, limbă română, landmarks semantice, focus vizibil și link „Sari la conținut”.

## Limita acestei etape

Doar HTML5, Vanilla CSS și Vanilla JavaScript. Fără pachete, framework-uri, PHP, baze de date, API-uri, autentificare sau coș funcțional. Produsele sunt introduse prin titlul static „O parte din colecția NOVRI”; nu există bară de categorii sau filtre.

Pentru integrarea viitoare, wrapper-ul `#school-uniforms-landing` și referințele către CSS/JS vor fi introduse în template-ul dedicat. Toți selectorii paginii sunt izolați în wrapper, clasele sunt prefixate `school-`, iar familia fontului are un nume propriu. Nu există `!important`. Marginea inline a elementului `body` aparține doar documentului standalone și nu trebuie transferată în OpenCart. Dezactivarea Journal și verificarea în tema reală rămân pentru etapa următoare.

Validarea și capturile de browser sunt în directorul `../qa/`. Fișierele paginii, inclusiv fotografiile și fonturile, însumează aproximativ 1 MB; nu există cereri de rețea externe pentru randare. Deschiderea linkurilor către NOVRI necesită internet.
