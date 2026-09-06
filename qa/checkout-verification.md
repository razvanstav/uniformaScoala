# Verificare checkout NOVRI — 6 septembrie 2026

Verificat în browser la `http://127.0.0.1:4173/checkout.html`.

- 375, 390, 430, 768, 1024, 1280, 1440, 1920 px: fără overflow orizontal; un H1; toate inputurile, selecturile și textarea vizibile au etichete. Repetat și cu înregistrarea și adresa separată deschise simultan: fără overflow. Rezultate în `checkout-responsive.json` și `checkout-interactions.json`.
- Inspecție vizuală desktop și mobil; fotografii proporționale, formular pe o coloană pe telefon, sumar înaintea confirmării, controale fără deformare. Capturi `checkout-desktop.png`, `checkout-desktop-detail.png`, `checkout-mobile.png`.
- Fără cont / Am cont / Cont nou; fieldset-urile ascunse sunt dezactivate. Login și recuperare afișează numai mesaje demo.
- Adresă separată și comutarea țării: selectul județului este înlocuit cu regiune text pentru alte țări; panourile ascunse nu blochează submit.
- Submit gol: 9 câmpuri nevalide în starea inițială, focus pe prenume; formular neexpediat.
- Parole diferite: mesaj și focus pe confirmare. Date fictive valide: dialog explicit că nu există comandă/cont/date trimise; parole golite; produsele păstrate.
- Newsletter implicit nebifat. Dialoguri politici și confirmare: Escape închide și restabilește focusul. Meniul mobil se închide cu Escape.
- Total inițial 120,41 Lei. Tricou ×2: 160,41 Lei; net produse 111,56 Lei, TVA 27,84 Lei. Cantitate 999 limitată la 99: 4.040,41 Lei.
- Eliminare tricou ×2, creștere bluză la ×2, undo: cantități [2, 2], total 215,40 Lei. Eliminare completă: coș gol, formular ascuns, contor 0. Undo din coșul gol: bluză ×2, total 135,40 Lei.
- Revenire în coș: aceleași cantități, produse 109,98 Lei. Reset demo și click Finalizare: checkout cu 2 produse, total 120,41 Lei, date de formular goale.
- Coșul gol persistă la reîncărcarea checkout-ului, cu contor 0 și formular ascuns. Resetarea ulterioară din coș restabilește preview-ul inițial.
- Consolă fără erori. `checkout.js`, `checkout-options.js` și `cart.js`: verificare de sintaxă Node. Parser HTML: fără ID-uri duplicate, clase fără prefix sau resurse locale lipsă. Formularul nu folosește fetch/XHR, servicii externe sau stocare a datelor personale.

Detalii: `checkout-interactions.json`. Preview-ul final păstrează cele două produse inițiale și formularul gol. Inspecția magazinului real s-a oprit înainte de orice submit; exemplarul temporar a fost eliminat.
