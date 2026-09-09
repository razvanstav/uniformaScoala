# Înregistrare cont — 10 septembrie 2026

Formularul reproduce opțiunile din captura furnizată: prenume, nume, e-mail, telefon, parolă, confirmare, newsletter Da/Nu și acord de confidențialitate. Aspectul folosește componenta comună NOVRI. Newsletter-ul pornește pe Nu, acordul este nebifat.

## Probe funcționale

- Pe toate cele 14 pagini, linkul „Înregistrare cont” din footer deschide direct ecranul de înregistrare și focalizează prenumele. Escape închide și restabilește focusul pe link.
- Pe toate cele 14 pagini la 390 px, Contul meu din meniul mobil → Înregistrare cont deschide formularul; X îl închide și readuce focusul pe Meniu.
- Formularul gol focalizează prenumele; un e-mail invalid este respins; parolele diferite afișează „Parolele nu coincid.”; lipsa acordului focalizează bifa de confidențialitate.
- Datele fictive valide afișează „Previzualizare: contul nu a fost creat. Datele nu au fost trimise.” Ambele câmpuri de parolă sunt golite, confirmat vizual. Nu a fost creat un cont și nu a fost trimisă o abonare.
- Tab/Shift+Tab rămân în dialog; X rămâne vizibil după derularea până la acord. Clickul pe fundal închide fereastra și restaurează derularea documentului.
- Revenirea la autentificare ascunde și dezactivează câmpurile de înregistrare. Autentificarea și recuperarea continuă să afișeze mesajele demo corecte.
- Linkul politicii are href local, `target="_blank"` și `rel="noopener"`; formularul a rămas deschis după click. Browserul de previzualizare din fundal nu a expus fila nouă în inventar, astfel că deschiderea acesteia nu a fost confirmată în această probă.

## Responsive

Verificat la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px, plus 375 × 480 px: dialogul rămâne în viewport, fără overflow orizontal. Conținutul derulează intern când este necesar; X este în afara zonei care derulează. Autentificarea și recuperarea au fost reverificate la 375 și 1440 px.

Rezultate: `account-registration-interactions.json`, `account-registration-responsive.json`. Capturi: `account-register-1440.png`, `account-register-375.png`, `account-register-375-bottom.png`.

Verificări de cod: fragment identic și unic pe toate paginile, patru declanșatoare pe pagină, ID-uri unice, câmpuri de înregistrare dezactivate inițial, fără trimitere de date/storage în scriptul contului, sintaxă JS validă și `git diff --check`.
