# Pop-up Cont — NOVRI

Componentă comună pentru autentificare și recuperarea parolei, numai pentru previzualizarea designului. Linkurile „Cont” din header și „Contul meu” din meniul mobil/footer o deschid pe toate cele 14 pagini.

## Fișiere separate

- `components/account-dialog.html`: fragmentul HTML de integrat o singură dată în wrapper-ul `#school-uniforms-landing`, în afara celorlalte formulare. În demo, aceeași copie este inclusă static în fiecare pagină, pentru funcționare fără build sau cereri de încărcare a fragmentelor. La editarea fragmentului, actualizează și copiile din paginile demo.
- `css/account.css`: stilurile izolate ale ferestrei, încărcate după `css/styles.css`.
- `js/account.js`: deschidere, închidere, schimbarea ecranului și validarea demonstrativă. Se încarcă cu `defer`, după `js/navigation.js`.

Deschiderea este legată explicit de un link cu `href="#school-account-dialog"`, `data-school-account-open`, `aria-haspopup="dialog"` și `aria-controls="school-account-dialog"`. Un URL real care înlocuiește acest `href` este lăsat să navigheze normal.

## Comportament

Fereastra folosește `dialog.showModal()`, cu fundal inactiv. Focusul inițial este pe e-mail. Tab și Shift+Tab parcurg circular controalele vizibile; parola este ascunsă și dezactivată în recuperare. X, Escape și clickul început și încheiat în afara ferestrei o închid. Clickul pe spațiul interior al ferestrei nu o închide.

Închiderea readuce focusul pe linkul de deschidere. Pentru contul deschis din meniul mobil, focusul revine pe butonul Meniu, deoarece meniul se închide la activarea linkului. Derularea documentului este blocată temporar; proprietățile inline `overflow` și `scrollbar-gutter` de pe elementul `html` sunt restaurate la închidere. Fereastra are derulare proprie când înălțimea ecranului este mică.

Formularul validează câmpurile obligatorii și formatul e-mailului. Autentificarea afișează un mesaj demo, fără verificarea unui cont; recuperarea precizează că nu s-a trimis niciun e-mail. Parola se golește la trimiterea demo și la schimbarea ecranului. Formularul se resetează la închiderea ferestrei.

Nu există apeluri API, scrieri în storage, conturi, sesiuni de autentificare sau e-mailuri trimise. `method="dialog"` este o protecție suplimentară împotriva trimiterii formularului dacă handlerul JS lipsește. `autocomplete="off"` este folosit în demo; comportamentul managerelor de parole depinde de browser.

## Integrare OpenCart ulterioară

Include fragmentul într-un template Twig comun, o singură dată pe pagină, cu fișierele CSS/JS aferente. Leagă trimiterea de autentificarea și recuperarea existente în OpenCart și înlocuiește mesajele demo cu rezultatul real al serverului. Configurează `autocomplete="username"` / `autocomplete="current-password"` pentru formularul real și păstrează validarea pe server.

Contul autentificat va necesita starea furnizată de OpenCart și linkurile reale către profil/comenzi. Acestea nu sunt simulate aici. Formularul „Am cont” din checkout este separat și rămâne neschimbat în această etapă.

Verificările și capturile sunt în `../qa/account-*`.
