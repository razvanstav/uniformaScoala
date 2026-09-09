# Verificare contact NOVRI — 9 septembrie 2026

- Referința a fost inspectată în browser: formular, cele trei subiecte, acord, două telefoane, adresă, program și hartă. Nicio trimitere sau apel pe site-ul real.
- Layout testat la 375, 390, 430, 768, 1024, 1280, 1440, 1920 px: fără overflow orizontal, un H1, toate câmpurile au etichete. Rezultate: `contact-responsive.json`.
- Inspecție vizuală desktop și mobil: `contact-desktop.png`, `contact-mobile.png`, `contact-form-mobile.png` și `contact-map-mobile.png`.
- Submit gol: patru câmpuri marcate, focus pe nume, fără dialog de confirmare. Spații în nume/mesaj și e-mail invalid: mesaje specifice corecte.
- Formular valid cu date fictive: dialog de previzualizare explicită, fără mesaj expediat. Subiect SICAP afișează întrebarea originală integral; contor mesaj 51 / 3000.
- Escape închide dialogurile și readuce focusul pe butonul de trimitere, respectiv politica de confidențialitate.
- Butonul de acces rapid focalizează numele. CTA-ul pentru parteneri din homepage deschide pagina cu `subiect=scoala`, formular gol. CTA-ul local selectează subiectul și focalizează numele.
- Meniul mobil se deschide și se închide cu Escape, cu focusul restabilit.
- Inițial nu există iframe. Activarea hărții creează un singur iframe cu titlu și fără overflow. Harta reală se afișează corect la 390 px; înălțimea interioară rămâne 338 px în cadrul rezervat de 340 px.
- Consola browserului: fără erori. Detalii: `contact-interactions.json`.
- Verificare statică a celor șase pagini: un H1 per pagină, fără ID-uri duplicate, clase fără prefix sau resurse locale lipsă. Cele cinci pagini existente au linkuri valide către contact; homepage-ul include și ruta de parteneriat.
- `contact.js`: sintaxă validă, fără fetch/XHR, stocare sau trimitere prin beacon. `contact.css`: selectori izolați, fără `!important`. `git diff --check` fără erori.

Formularul rămâne demo. Linkurile telefonice și harta sunt reale, dar nu s-au efectuat apeluri sau trimiteri de mesaje. Preview-ul final este lăsat cu formular gol și harta neactivată.
