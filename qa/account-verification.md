# Pop-up Cont — 10 septembrie 2026

- Toate cele 14 pagini: „Cont” din header deschide fereastra, X o închide; „Contul meu” din footer deschide aceeași fereastră, Escape o închide și restabilește focusul.
- Toate cele 14 pagini la 390 px: „Contul meu” din meniul mobil închide meniul, deschide fereastra și readuce focusul pe Meniu după închidere.
- Enter deschide din link. E-mailul primește focusul inițial. Tab și Shift+Tab parcurg circular controalele, atât la autentificare, cât și la recuperare.
- Formularul gol este oprit de validare. Date fictive valide afișează mesajul de autentificare demo. Recuperarea afișează explicit că nu s-a trimis e-mail.
- E-mailul fictiv este păstrat vizual la trecerea la recuperare; închiderea și redeschiderea afișează câmpuri goale. Valorile live din inputuri au fost verificate vizual, deoarece proiecția DOM a instrumentului nu le expune fidel.
- Clickul pe fundal închide fereastra. Derularea documentului este restaurată după închidere.
- La 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px, fereastra este încadrată în viewport, fără overflow orizontal. La 375 × 480 px are derulare verticală proprie.
- Nu s-au observat erori sau avertismente în consola browserului.

Rezultate: `account-interactions.json`, `account-responsive.json`. Capturi: `account-login-375.png`, `account-login-1440.png`, `account-recovery-375.png`, `account-recovery-1440.png`.

Verificări statice: fragment identic și unic în fiecare pagină; trei declanșatoare corelate prin ARIA; câte un CSS/JS comun încărcat; fără ID-uri duplicate; JavaScript valid sintactic; `git diff --check`.
