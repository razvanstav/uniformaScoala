# Căutarea școlilor — 10 septembrie 2026

Panoul „Alege județul” a fost eliminat din HTML, CSS și JavaScript. Căutarea are etichetă vizibilă, maximum 640 px, poziție centrală și chenar de focus. Școlile păstrează gruparea alfabetică pe județe.

Verificare în browser la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px: fără overflow orizontal, câmp centrat în container (abatere sub 0,01 px). Capturi: `schools-search-375.png` și `schools-search-1440.png`.

Probe de căutare: „teleorman” afișează 5 școli, „bucuresti” 4, „santimbreanu” 1, „Alexandria” 3. Un termen inexistent afișează starea fără rezultate. Resetarea, Escape și butonul × readuc toate cele 9 școli. Linkul vechi `?judet=Teleorman` completează vizibil căutarea și afișează cele 5 școli; golirea câmpului elimină parametrul. Conturul de focus este vizibil. Consola nu a raportat erori sau avertismente în probe.
