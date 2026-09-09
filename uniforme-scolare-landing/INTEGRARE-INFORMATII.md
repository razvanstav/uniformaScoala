# Pagini de informații — NOVRI

Șapte pagini HTML separate completează demo-ul NOVRI. Textele sunt în HTML, pot fi citite fără JavaScript și pot fi transferate individual în template-urile OpenCart. Nu există backend, pachete sau proces de build.

## Pagini și corespondențe

| Fișier | Conținut | Sursa existentă |
| --- | --- | --- |
| `informatii.html` | Index cu acces la toate informațiile și contact | Pagină nouă de navigare |
| `despre-noi.html` | Prezentarea AUROCOM și datele companiei | `information/information&information_id=4` |
| `livrare.html` | Livrare, curieri, plată și prețuri | `information_id=6`, completat cu pasajele despre plată/prețuri din `information_id=5` |
| `retur.html` | Condiții de retur, schimb și contact | Secțiunea de retur din `information_id=5` |
| `termeni-si-conditii.html` | Termenii existenți, organizați în opt secțiuni | `information_id=5` |
| `confidentialitate.html` | Textul existent despre prelucrarea datelor, în 12 secțiuni | `information_id=3` |
| `harta-site.html` | Navigare în demo, școli și informații | Structură adaptată după `information/sitemap` |

Sursele au fost consultate la 9 septembrie 2026 pe [analitic.go.ro](https://analitic.go.ro/index.php?route=information/sitemap). Textele și linkurile observate sunt arhivate în `../qa/information-source-content.json`. Nu a fost copiat codul HTML, CSS sau JavaScript al temei sursă.

Pagina existentă `account/return/add` a fost inspectată pentru delimitarea scopului. Ea este un formular RMA de cont. `retur.html` prezintă condițiile de retur cerute și accesul la contact; nu depune cereri RMA și nu trimite date magazinului.

## Fișiere comune și ordine

1. `css/styles.css` — fonturi locale Archivo, header, footer, culori și accesibilitate.
2. `css/information.css` — titluri, layout editorial, navigație între pagini, cuprins, text, index și imaginea Despre noi.
3. `js/catalog.js` — catalogul demo comun.
4. `js/cart-state.js` — contorul coșului demo din header.
5. `js/navigation.js` — meniul comun.
6. `js/information.js` — cuprinsul inițial adaptat la ecran, focusul ancorelor și lista școlilor în hartă.

Scripturile au `defer`. Wrapper: `#school-uniforms-landing.school-information-page`. Clasele sunt prefixate `school-`. Nu sunt necesare fișierele CSS/JS de produs, categorie, checkout sau contact pentru randarea unei pagini de informații.

Pe desktop, navigația dintre pagini rămâne vizibilă în lateral, iar textul are maximum 760 px. Pe telefon, navigația permite scroll orizontal, iar cuprinsul este inițial închis. `details/summary` funcționează cu Enter/Space și fără JavaScript. Textele rămân afișate integral; cuprinsul controlează doar lista de ancore.

Lista școlilor din `harta-site.html` se generează din `SchoolCatalog.schools`; nu trebuie întreținută separat. Fără JavaScript există un link către directorul școlilor. Fotografia Despre noi reutilizează `assets/hero.jpg`, fotografia demonstrativă locală deja folosită pe homepage.

## Legături în restul demo-ului

- Footer-ul tuturor celor 14 pagini are linkuri locale către livrare, retur, termeni, confidențialitate, hartă și Despre noi. Titlul „Informații” deschide indexul.
- Linkurile de politici din contact și checkout deschid documentul complet într-o filă nouă, cu `rel="noopener"` și etichetă accesibilă care anunță acest lucru. Formularul inițial rămâne completat.
- Au fost eliminate exclusiv handlerele pentru dialogurile placeholder de politici. Dialogurile demonstrative de validare/autentificare/confirmare rămân, fără trimitere de date.
- Linkul de e-mail din condițiile de retur folosește adresa afișată de sursă: `vanzari@uniformascoala.ro`. În sursă, textul vizibil și `mailto:vanzari@meai.ro` nu coincideau. Datele companiei și adresele din texte nu au fost înlocuite cu date inventate pentru NOVRI.

## Conținut preluat și puncte de revizuit

Aceasta este o adaptare de design, nu o actualizare juridică a politicilor. Paragrafele sursă au fost păstrate, cu spațiere normalizată, titluri mai scurte și liste HTML semantice. Nu s-au modificat taxele, termenele, excepțiile sau obligațiile menționate de magazin.

Puncte concrete găsite în sursă, de clarificat înainte de publicarea versiunii finale:

- Retur: un pasaj menționează rambursarea în maximum 14 zile lucrătoare, altul în maximum 30 de zile de la retur. Textul menționează separat notificarea retragerii în 10 zile lucrătoare. Aceste formulări se găsesc în `#school-info-returnarea` și în pagina `retur.html`.
- Termenii trimit la O.G. 130/2000, Legea 449/2003 și OUG 34/14. Aplicabilitatea trimiterilor și a condițiilor privind etichetele, ambalajul, produsele personalizate, ridicarea de la sediu și numărul de retururi nu a fost verificată juridic în această etapă.
- Livrarea numește Urgent Cargus și Sameday; confidențialitatea numește Sameday și Fan ca destinatari ai datelor pentru curierat. Confirmă lista efectivă de curieri.
- Despre noi prezintă sediul social în Plosca; politica și adresa de retur folosesc Peretu. Confirmă formularea fiecărui tip de adresă, datele firmei și adresele de e-mail înainte de integrare.
- Textul Despre noi păstrează colaborările și formularea „peste 25 de ani” din sursă. Nu au fost reconfirmate parteneriatele.
- Textele despre date trebuie să descrie funcționarea magazinului final. Demo-ul nu implementează operațiunile de prelucrare descrise de documentele magazinului.

Nu există o pagină distinctă despre cookie-uri în lista de informații observată. Nu a fost inventată una.

## Integrare ulterioară

Transferă wrapper-ul, markup-ul și referințele de fișiere în template-ul OpenCart dedicat; nu duplica `html`, `head` sau `body`. Adaptează rutele locale și căile către assets la locația instalării. Dezactivarea Journal se face în etapa de integrare.

Textul fiecărei pagini se află în `.school-info-prose`, în interiorul secțiunilor `#school-info-*`. Dacă se înlocuiește cu textul gestionat din OpenCart, păstrează ID-urile/secțiunile sau regenerează cuprinsul cu ancorele corecte. Linkurile de politici din formulare trebuie să păstreze completările utilizatorului.

Header-ul, footer-ul și navigația laterală sunt HTML static, repetat intenționat pentru previzualizare fără build. În OpenCart pot deveni fragmente Twig comune. Contorul coșului se înlocuiește cu datele OpenCart când se integrează header-ul.

Paginile noi au `noindex, nofollow` pentru etapa demo. Eliminarea acestei directive, canonical-urile și publicarea politicilor actualizate aparțin versiunii finale.

Verificări: `../qa/information-responsive.json`, `information-static.json`, `information-interactions.json` și capturile `information-*.png`.
