# Toate școlile — subcategorii NOVRI

`scoli.html` afișează școlile ca subcategorii. Fiecare școală deschide `categorie.html?scoala=...`, unde se află colecția de produse și filtrele ei. Aspectul folosește aceleași fonturi locale, culori, margini și navigație NOVRI.

## Fișiere separate

| Fișier | Rol |
| --- | --- |
| `scoli.html` | Căutare centrată, grupuri de școli pe județe, template de card, CTA pentru parteneri |
| `css/styles.css` | Stiluri comune, header, footer, fonturi și accesibilitate |
| `css/schools.css` | Layout-ul directorului, grupuri pe județe și responsive |
| `js/catalog.js` | Lista comună `schools`, embleme și rute demo |
| `js/cart-state.js` | Contorul comun al coșului demonstrativ |
| `js/navigation.js` | Meniul comun |
| `js/schools.js` | Generarea listei, căutare și stare în URL |
| `assets/schools/` | Cele șapte embleme locale și sursele acestora |

CSS-ul comun se încarcă primul. Scripturile se încarcă în ordinea din tabel, cu `defer`. Pagina nu necesită `main.js`, `category.js` sau `category.css`.

Wrapper-ul este `#school-uniforms-landing.school-directory-page`. Toate clasele sunt prefixate `school-`, iar stilurile sunt izolate în wrapper. Nu există pachete, framework-uri, PHP, API sau build.

## Școli și surse

Lista se editează exclusiv în `const schools` din `js/catalog.js`. Nu există o a doua listă de opțiuni în HTML. Directorul și selectorul de pe homepage folosesc aceleași nouă școli.

[Pagina existentă de subcategorii](https://uniformascoala.ro/index.php?route=product/category&path=62), consultată la 9 septembrie 2026, afișează șapte școli. Demo-ul păstrează și cele două școli din brief care nu apar pe acea pagină: Liceul Teoretic „Mihai Ionescu” și Colegiul Național „AI Cuza” Alexandria. Pentru acestea, numele este afișat tipografic în locul emblemei.

Emblemele afișate pe site-ul existent au fost salvate local, fără modificare, la rezoluția disponibilă de 120 × 120 px. Proveniența fiecărui fișier este în [assets/schools/SOURCES.md](assets/schools/SOURCES.md). Nu s-au folosit imagini sau cod Milano.

Exemplu de înregistrare:

```js
{
  name: 'Școala Gimnazială "M. Sântimbreanu"',
  county: 'București',
  city: 'București',
  url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-m-santimbreanu',
  emblem: 'schools/m-santimbreanu.png',
  sourceUrl: 'https://uniformascoala.ro/index.php?route=product/category&path=62_63'
}
```

`emblem` și `sourceUrl` sunt opționale. Calea emblemei este relativă la `assets/`. `url` păstrează adresa originală din brief, iar `slug` este derivat din ea. `sourceUrl` documentează categoria observată pe magazinul existent. Linkurile demo sunt generate de `SchoolCatalog.categoryUrl(school)`; niciunul dintre aceste două URL-uri externe nu este deschis automat de card.

Județele și școlile sunt ordonate cu `Intl.Collator('ro')`. Un județ gol este grupat la final sub „Județ neprecizat”. Localitatea este afișată dacă există; altfel se afișează județul. Datele de localizare rămân cele din catalog, fără completări presupuse.

## Navigare și interacțiuni

- Meniul și footer-ul tuturor paginilor includ „Toate școlile”. Homepage-ul are și link sub selector.
- „Schimbă școala” din colecție deschide directorul. Un produs fără școală selectată trimite tot aici; în contextul unei școli, păstrează întoarcerea la colecția ei.
- Căutarea include nume, localitate și județ, fără diferențe de majuscule sau diacritice. Toate cuvintele introduse trebuie să se regăsească în înregistrare.
- Un singur câmp filtrează școlile; panoul separat cu butoane de județ a fost eliminat. Grupurile fără rezultate sunt ascunse; contorul, mesajul gol și resetarea se actualizează local.
- Parametrul `q` păstrează căutarea la reîncărcare și la revenirea din colecție. Linkurile vechi cu `judet` afișează județul recunoscut direct în câmp, alături de căutarea existentă. Valorile necunoscute de județ sunt ignorate. Directorul nu scrie cookie-uri sau storage.
- Câmpul are etichetă vizibilă și chenar de focus. Escape golește căutarea. Contorul are `aria-live`, iar resetarea readuce focusul în căutare.
- CTA-ul „Hai să vorbim” deschide formularul local cu subiectul pentru școli preselectat.
- Fără JavaScript se afișează un link către lista existentă a magazinului.

Pe telefon este o școală pe rând, de la 600 px sunt două, iar de la 1024 px sunt trei. Căutarea apare centrată sub header: maximum 640 px pe desktop, lățimea disponibilă pe mobil și înălțime de 60–64 px. Eticheta și contorul sunt centrate. Județele rămân titlurile grupurilor din listă, în ordine alfabetică. Introducerea editorială și breadcrumb-ul au fost eliminate, iar H1-ul „Toate școlile” este păstrat pentru accesibilitate, ascuns vizual. Imaginile au dimensiuni definite; emblemele de mai jos sunt lazy. Tranzițiile respectă `prefers-reduced-motion`.

## Puncte pentru integrarea ulterioară

1. Transferă wrapper-ul și referințele CSS/JS în template-ul dedicat OpenCart. Elementele standalone `html`, `head` și `body` nu se dublează. Adaptează căile relative ale fișierelor și dezactivează Journal pentru acest template în etapa de integrare.
2. Înlocuiește datele demo cu subcategoriile OpenCart. Câmpurile relevante sunt numele, URL-ul categoriei, imaginea și metadatele de județ/localitate. Generatorul poate primi aceleași câmpuri sau lista poate fi randată în Twig, păstrând markup-ul.
3. Cardul este definit în `#school-directory-card-template`; grupurile se află în `#school-directory-groups`. Titlurile județelor sunt `h2`, iar numele școlilor `h3`.
4. Controalele sunt `#school-directory-search`, `#school-directory-count` și `#school-directory-empty`. Adaptarea listei server trebuie să păstreze etichetele, stările ARIA și mesajul fără rezultate.
5. Înlocuiește `SchoolCatalog.categoryUrl` cu rutele finale. Nu folosi implicit adresele MEAI din brief în locul categoriilor confirmate ale magazinului.
6. Înlocuiește contorul coșului demo când se integrează navigația comună. Directorul nu modifică produse, stoc sau coș.
7. Elimină `noindex, nofollow` doar pentru pagina finală publicată, după completarea metadatelor și a rutelor reale.

Colecțiile demo continuă să folosească cele șase produse existente, dacă o școală nu definește `productIds`. Această pagină nu introduce inventar sau asocieri reale noi. Capturile și verificările sunt în `../qa/schools-*`.
