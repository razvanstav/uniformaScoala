# NOVRI — coș demo, 6 septembrie 2026

## Aspect și responsive

Verificat în browser la 375, 390, 430, 768, 1024, 1280, 1440 și 1920 px: fără overflow orizontal, un singur H1, fotografii încărcate. Desktop-ul are produse și sumar în două coloane; sub 1024 px sunt așezate vertical. Capturi: `cart-desktop.png`, `cart-mobile.png`, `cart-empty-mobile.png`. Inspecție vizuală suplimentară a dialogului de finalizare pe mobil.

## Calcule și interacțiuni

- Coș inițial: 1 tricou × 40,00 Lei + 1 bluză × 54,99 Lei = 94,99 Lei.
- Încă un tricou: 134,99 Lei, badge 3.
- 2 tricouri + 3 bluze: 244,97 Lei.
- Cantitatea 0 este limitată la 1; 999 este limitată la 99. Totalul pentru 99 tricouri + 3 bluze este 4.124,97 Lei.
- Câmpul de cantitate gol revine la cantitatea anterioară.
- Eliminarea tricoului, modificarea bluzei la 2 bucăți, apoi Undo: 2 tricouri + 2 bluze = 189,98 Lei. Restaurarea nu anulează celelalte modificări.
- Eliminarea ambelor produse arată coșul gol, ascunde sumarul și afișează badge 0. Coșul rămâne gol la refresh.
- Resetarea reface cele două exemple, total 94,99 Lei.
- După schimbarea cantității, badge 3 rămâne sincronizat în categorie, produs și homepage; revenirea în coș păstrează totalul 134,99 Lei.
- Voucherul afișează un mesaj de demo, fără reducere aplicată.
- Finalizarea deschide doar dialogul explicativ. Escape îl închide și redă focusul butonului de finalizare. Nu s-a plasat nicio comandă.
- Console fără erori JavaScript pe traseul verificat. Sintaxa `cart-state.js` și `cart.js` verificată cu `node --check`; `git diff --check` trece.

Rezultatele sunt salvate în `cart-responsive.json` și `cart-interactions.json`. Starea demonstrativă este locală, în sessionStorage; nu există API-uri, plăți, autentificare, costuri de transport sau taxe calculate din reguli reale.
