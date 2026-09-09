# NOVRI — pagini de informații

Verificare la 9 septembrie 2026, în browserul local `http://127.0.0.1:4173/`.

## Conținut și structură

- Șapte pagini noi: index, Despre noi, livrare/plată, retur/schimb, termeni, confidențialitate și hartă.
- Toate cele 14 documente HTML au un singur H1, ID-uri unice, clase prefixate, imagini cu dimensiuni rezervate și fișiere locale existente. Linkurile locale și ancorele au fost verificate.
- Compararea textelor a confirmat păstrarea paragrafelor sursă pentru termeni, confidențialitate, Despre noi și pasajele de retur, ignorând spațiile și marcatorii de listă transformați în HTML semantic.
- Inventarul sursă este `information-source-content.json`; rezultatele structurale sunt în `information-static.json`.
- Sintaxa `information.js`, `contact.js` și `checkout.js`, precum și `git diff --check`, au trecut.

## Responsive

Au fost verificate cele șapte pagini la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px: 56 de afișări, fără overflow orizontal al documentului. Navigația orizontală proprie de pe mobil este intenționată. Textul articolului este limitat la 760 px pe desktop.

Capturi inspectate: `information-terms-desktop.png`, `information-index-desktop.png`, `information-about-desktop.png`, `information-return-mobile.png`, `information-privacy-mobile.png`. Măsurători: `information-responsive.json`.

## Interacțiuni

- Enter deschide cuprinsul mobil. Linkul pentru schimbarea mărimii actualizează fragmentul URL, derulează secțiunea la 24 px de marginea de sus și îi mută focusul.
- Escape închide meniul mobil și readuce focusul în buton.
- Indexul deschide Despre noi; imaginea locală s-a încărcat.
- Linkurile politicilor din contact și checkout deschid file noi. Valoarea fictivă „Test NOVRI” a rămas în formularul inițial; câmpurile au fost golite după verificare. Nu s-au trimis formulare.
- Linkul din footer deschide indexul. Harta afișează nouă școli din catalogul comun și deschide colecția corectă pentru Școala Nr. 7.
- Nu au fost raportate erori sau avertismente de consolă în fluxul verificat.

Rezultate: `information-interactions.json`. Verificările privesc demo-ul și designul; contradicțiile concrete din textele sursă sunt documentate în `uniforme-scolare-landing/INTEGRARE-INFORMATII.md` și nu au fost rezolvate prin rescriere juridică.
