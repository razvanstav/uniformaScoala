# Checkout NOVRI — template demonstrativ

Pagina separată `checkout.html` continuă fluxul `index.html` → `categorie.html` → `produs.html`, respectiv `cos.html` → `checkout.html`. Butonul „Finalizare comandă” din coș deschide această pagină. Designul, fonturile, header-ul, footer-ul și fotografiile sunt comune cu restul NOVRI.

## Fișiere

| Fișier | Rol |
| --- | --- |
| `checkout.html` | Formular semantic, sumar, șablon produs, coș gol și dialoguri |
| `css/styles.css` | Stilurile comune NOVRI |
| `css/checkout.css` | Stilurile și responsive-ul checkout-ului |
| `js/catalog.js` | Produsele și școlile demonstrative |
| `js/cart-state.js` | Cantitățile și contorul comune cu pagina de coș |
| `js/navigation.js` | Meniul comun și linkurile placeholder |
| `js/checkout-options.js` | Listele publice de țări și județe observate pe site |
| `js/checkout.js` | Panouri condiționale, validare locală și sumar |

Păstrează ordinea CSS și JS din tabel; toate scripturile folosesc `defer`. Checkout-ul nu depinde de `cart.css` sau `cart.js`. Wrapper: `#school-uniforms-landing.school-checkout-page`. Toate clasele au prefixul `school-`. Nu există framework-uri, pachete, PHP, API-uri sau build tools.

## Opțiuni verificate pe site

Inspecție prin interfața publică la 6 septembrie 2026: [checkout existent](https://uniformascoala.ro/index.php?route=checkout/checkout). Inițial pagina redirecționa către coșul gol. Un exemplar de Bluză Glat Copii — Verde, mărime 40, a fost adăugat temporar pentru acces la formular și eliminat după inspecție. Nu s-a trimis formularul, nu s-au introdus date personale și nu s-a plasat o comandă.

Au fost deschise modurile Guest, Register și Login, precum și adresa de livrare separată. Inventarul de mai jos descrie interfața vizibilă, nu funcționalitatea disponibilă după autentificare sau după completarea unei adrese reale.

| Secțiune existentă | Echivalent în demo |
| --- | --- |
| Guest / Login / Register | Fără cont / Am cont / Cont nou |
| Login: e-mail, parolă, autentificare, recuperare parolă | Panou condițional și mesaje demo; fără autentificare sau e-mail trimis |
| Prenume, nume, e-mail, telefon | Câmpuri etichetate; telefon opțional |
| Register: parolă și confirmarea parolei | Panou condițional, verificarea coincidenței numai local |
| Facturare: firmă, adresa 1, adresa 2, oraș, cod poștal, țară, regiune/județ | Aceleași câmpuri; firma și adresa 2 sunt opționale |
| Checkbox adrese identice | Afișează/ascunde adresa de livrare separată |
| Livrare separată: prenume, nume și toate câmpurile de adresă | Fieldset separat, dezactivat complet când nu este necesar |
| 253 țări/teritorii și 42 județe/regiuni pentru România | Opțiuni generate din `checkout-options.js`, cu ID-urile observate |
| Livrare cu taxă fixă, afișată 25,42 | Metodă selectată și tarif exemplu de 25,42 Lei cu TVA în total |
| Plata la livrare | Radio selectat; fără plată electronică |
| Produse, mărime, model, cantitate, preț unitar, total | Produse din coșul demo, opțiuni și cantități editabile; model afișat doar dacă produsul are `model` în catalog |
| Subtotal, livrare, TVA 21%, total | Sumar demonstrativ calculat în bani întregi |
| Comentariu la comandă | Textarea opțional |
| Newsletter, confidențialitate, termeni | Toate trei păstrate; implicit nebifate în demo |
| Confirm Order | Confirmă comanda / Previzualizare — validare și mesaj local |

Nu au fost observate alte metode de transport/plată pentru sesiunea verificată. Lista poate varia în magazin în funcție de client, adresă și configurație. Nu au fost inventate opțiuni de card, ridicare sau transfer bancar.

Etichetele geografice sunt date publice citite din controalele vizibile, nu cod sursă copiat. „Romania” este afișată „România”; celelalte etichete păstrează forma sursei. La alegerea altei țări, județul devine un câmp text pentru regiune: regiunile fiecărei țări nu au fost colectate și nu se încarcă prin API. Aceasta este o adaptare demonstrativă, nu o listă de destinații de livrare confirmate.

## Comportamentul demo

- Produsele și cantitățile se păstrează în aceeași filă prin `SchoolCartDemo`, exact ca pe `cos.html`.
- +/−, introducerea directă și Enter actualizează cantitatea, limitată la 1–99. Eliminarea are undo și păstrează modificările făcute între timp la celelalte produse.
- Eliminarea ultimului produs ascunde formularul și afișează coșul gol. Undo îl restabilește; refresh păstrează coșul gol.
- Câmpurile din panourile ascunse sunt dezactivate și nu blochează validarea. Alegerea altei țări comută selectul de județ cu un input de regiune.
- Validarea marchează câmpurile nevalide și mută focusul pe primul. Parolele trebuie să coincidă în modul Cont nou.
- Dialogurile native se închid cu Escape și restabilesc focusul. Linkurile de politici sunt placeholder-e explicite, fără texte juridice inventate.
- Newsletter-ul este opțional și nebifat. În sursă era bifat; demo-ul nu înscrie utilizatorul nicăieri, indiferent de selecție.
- Aplicația nu stochează și nu transmite datele formularului, parolele sau acordurile. Nu se înregistrează datele în loguri. Parolele se golesc la ieșirea din panoul respectiv și după confirmarea demonstrativă.
- Evenimentul `submit` este întotdeauna oprit. `method="dialog"` este o protecție suplimentară împotriva navigării/submiterii HTTP accidentale. Butonul este inițial dezactivat, formularul ascuns fără JavaScript. Nu există stare „comandă plasată”, identificator de comandă, autentificare sau plată reală.

## Totaluri demonstrative

Setările sunt la începutul `checkout.js`: `demo.shippingGrossCents = 2542`, `demo.vatPercent = 21`. Ele reproduc valorile vizibile în sesiunea verificată; nu sunt reguli fiscale sau oferte de transport pentru magazin.

Prețurile catalogului sunt tratate ca sume cu TVA. Sumarul calculează netul produselor și netul transportului prin rotunjire la ban; TVA este diferența până la totalul brut. Pentru cele două produse inițiale: 94,99 Lei produse + 25,42 Lei transport = **120,41 Lei**, defalcat în 78,50 Lei net produse + 21,01 Lei net transport + 20,90 Lei TVA.

Eticheta sursei de transport conține „fara TVA”, dar suma afișată lângă metodă este 25,42, iar în sumar netul este 21,01. Demo-ul face diferența explicită între prețul metodei cu TVA și rândul net al sumarului.

## Conectare ulterioară la OpenCart

1. Transferă wrapper-ul și resursele în template-ul dedicat; nu dubla `html/head/body` și nu transfera marginea inline standalone. Eliminarea Journal rămâne pentru etapa de integrare.
2. Înlocuiește `cart-state.js`, produsele seed și calculele demo cu datele magazinului. OpenCart trebuie să furnizeze prețurile, taxele, reducerile, stocul, transportul și metodele disponibile.
3. Înlocuiește `checkout-options.js` cu țările/regiunile permise în magazin. Maparea câmpurilor din HTML este separată (`billing-*`, `shipping-*`, `firstname`, `lastname`, `email`, `telephone`).
4. Înlocuiește handler-ele demo de autentificare, recuperare și înregistrare; gestionează securizat sesiunea și validarea serverului.
5. Înlocuiește dialogurile politicilor cu documentele reale și păstrează distinct acordurile obligatorii de opțiunea newsletter.
6. Înlocuiește explicit mecanismul de submit numai în etapa backend. Validarea vizuală actuală nu poate confirma o comandă sau un preț. `#school-checkout-submit` și `#school-checkout-form` sunt punctele dedicate.

Alte puncte utile: `#school-checkout-item-template`, `#school-checkout-items`, `#school-checkout-subtotal`, `#school-checkout-shipping-net`, `#school-checkout-tax`, `#school-checkout-total`. CSS-ul este mobile-first: o coloană sub 1024 px, formular și sumar alăturate de la 1024 px; pe mobil sumarul apare înaintea acordurilor și confirmării.
