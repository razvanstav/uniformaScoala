# Contact NOVRI — template demonstrativ

`contact.html` păstrează identitatea NOVRI: fontul Archivo local, titlu editorial, fundal off-white, separatoare fine, header și footer comune. Pagina are fișiere proprii și nu depinde de CSS-ul sau JavaScript-ul checkout-ului.

## Fișiere și încărcare

| Fișier | Rol |
| --- | --- |
| `contact.html` | Date publice, formular, locație și dialog demonstrativ |
| `css/styles.css` | Designul comun NOVRI |
| `css/contact.css` | Aspectul și responsive-ul paginii de contact |
| `js/catalog.js` | Catalogul demonstrativ comun |
| `js/cart-state.js` | Contorul demonstrativ din header |
| `js/navigation.js` | Meniul comun |
| `js/contact.js` | Subiecte, validare locală, dialoguri și încărcarea hărții |

Păstrează ordinea din tabel; scripturile folosesc `defer`. Wrapper: `#school-uniforms-landing.school-contact-page`. Toate clasele au prefixul `school-`. Nu există framework-uri, pachete, PHP, backend sau proces de build.

## Date și opțiuni observate

Sursă: [pagina de contact existentă](https://uniformascoala.ro/index.php?route=information/contact), inspectată în browser la 9 septembrie 2026. Nu s-a trimis formularul real și nu s-au apelat numerele.

| Element | Conținut păstrat |
| --- | --- |
| Societate | AUROCOM SRL |
| Adresă afișată | Str. Gării, Peretu, Teleorman |
| Link telefon din blocul contact | `+40771725856` — afișat 0771 725 856 |
| Telefon din secțiunea inferioară | `0745580180` — afișat 0745 580 180 |
| Program | Luni–Vineri 08:00–15:30; Sâmbătă–Duminică închis |
| Formular | Nume, e-mail, subiect opțional, mesaj, acord de confidențialitate, trimitere |
| Subiect 1 | Faceți și alte modele față de cele prezente pe site? |
| Subiect 2 | Putem schimba culorile produselor? |
| Subiect 3 | Putem comanda și prin SICAP? |
| Hartă | Același URL Google Maps embed al locației AUROCOM din pagina existentă |

Etichetele celor trei subiecte sunt scurtate în select pentru mobil; întrebarea originală apare integral dedesubt după selectare. Au fost adăugate „Uniforme pentru școala noastră” și „Altă întrebare” pentru navigarea din homepage și întrebări generale. Aceste opțiuni nu promit disponibilitatea vreunui serviciu. Nu a fost inventată o adresă de e-mail pentru companie.

Ambele numere de telefon sunt păstrate deoarece sursa le afișează distinct. Textul sursei indică Str. Gării, iar cardul Google Maps afișa o adresă care începea cu Strada Ghimfușești Nr. 1133A. Nu s-a ales o adresă nouă și nu s-a mutat pinul: datele text și harta sunt preluate ca atare pentru revizuire. Confirmă adresa și numerele finale la pregătirea versiunii publice.

## Comportament

- „Contact” și „Hai să vorbim” din meniul/footer-ul tuturor celor șase pagini duc la `contact.html`.
- „Devino partener” de pe homepage duce la `contact.html?subiect=scoala#school-contact-form`.
- Parametrul `subiect` acceptă numai valorile definite în `subjects` din `contact.js`; valorile necunoscute sunt ignorate. Textul introdus în formular nu este pus în URL.
- „Scrie-ne un mesaj” mută focusul direct pe nume. „Hai să colaborăm” selectează subiectul pentru școli și mută focusul pe nume, fără a suprascrie mesajul introdus.
- Numele, e-mailul, mesajul și acordul sunt obligatorii pentru previzualizare. Numele și mesajul formate numai din spații sunt respinse. E-mailul folosește validarea nativă a câmpului `type="email"`.
- Erorile sunt afișate lângă câmp, asociate prin `aria-describedby`; sumarul folosește `role="alert"`, iar focusul ajunge pe primul câmp nevalid. Limite: nume 100, e-mail 254, mesaj 3000 caractere.
- Selectul rămâne un control nativ stilizat, utilizabil cu tastatura. Contorul mesajului nu anunță fiecare caracter cititorului de ecran.
- Butonul „Trimite mesajul / Previzualizare” deschide un dialog care spune explicit că mesajul nu a fost trimis. Datele rămân în formular pentru editare și nu sunt stocate de aplicație, înregistrate în loguri sau expediate.
- Submit este întotdeauna oprit. `method="dialog"` previne și submiterile HTTP accidentale; butonul este inițial dezactivat fără JavaScript.
- Politica de confidențialitate deschide un dialog placeholder, fără text juridic inventat. Escape și butoanele de închidere restabilesc focusul.
- Telefonul folosește linkuri `tel:` normale; deschiderea lor este o acțiune explicită a vizitatorului.

## Hartă și performanță

La încărcarea paginii nu există iframe sau cereri externe pentru hartă. „Afișează harta” creează un singur iframe, cu titlu accesibil, dimensiuni rezervate și `referrerpolicy="no-referrer"`. Harta este serviciul extern Google Maps, independent de formular. Blocul are înălțime constantă înainte și după activare, pentru a evita salturile de layout.

Linkul „Deschide harta într-o filă nouă” rămâne disponibil, inclusiv fără JavaScript și când embed-ul este blocat. El folosește aceeași adresă publică de hartă; nu pornește navigarea din locația utilizatorului și nu solicită geolocație.

## Integrare ulterioară

1. Transferă wrapper-ul și referințele la resurse în template-ul dedicat OpenCart, fără a dubla `html/head/body`. Marginea inline a documentului standalone nu se transferă. Journal nu a fost modificat în această etapă.
2. Înlocuiește datele publice din HTML cu datele finale ale magazinului. Actualizează adresa hărții în `#school-contact-map-link`; scriptul o folosește și pentru embed.
3. Conectează `#school-contact-form` la endpoint-ul real de contact, cu validare server, protecție anti-abuz și gestionarea erorilor. Înlocuiește explicit handler-ul demo și `method="dialog"` doar în etapa backend.
4. Câmpurile dedicate sunt `#school-contact-name`, `#school-contact-email`, `#school-contact-subject`, `#school-contact-message`, `#school-contact-privacy`; butonul este `#school-contact-submit`.
5. Înlocuiește dialogul de politică cu documentul real. Afișează confirmarea de trimitere numai după răspunsul serverului.
6. Înlocuiește contorul din `cart-state.js` cu starea OpenCart când restul fluxului este integrat; pagina de contact nu modifică coșul.

Responsive: o coloană pe mobil/tabletă, date și formular alăturate de la 1024 px; câmpurile nume/e-mail trec pe două coloane de la 600 px. Verificările și capturile sunt în `../qa/contact-*`.
