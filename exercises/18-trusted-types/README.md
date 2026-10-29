# 18 · Trusted Types

`start/reviews.js` setzt Kundenbewertungen per `innerHTML` ein. Eine Bewertung mit `<img onerror=…>` führt so Code im Shop aus: DOM-basiertes Cross-Site Scripting (DOM-XSS). Trusted Types machen solche Stellen sichtbar. Mit `require-trusted-types-for 'script'` in der CSP akzeptieren `innerHTML` und ähnliche Sinks nur noch Werte aus einer Policy. Trusted Types sind seit Februar 2026 Baseline.

## Aufgabe

1. Bau `renderReview(element, review)` ohne `innerHTML`: Elemente erzeugen, Text per `textContent`, dann `replaceChildren`.
2. Leg mit `createShopPolicy(factory)` die Policy `shop` über `factory.createPolicy` an. Ihr `createHTML` escaped `&`, `<`, `>`, `"` und `'`.
3. Gib ohne `factory` ein Objekt mit derselben `createHTML`-Funktion zurück.
4. Starte den Shop mit `CSP=1 npm start` (Report-Only) und such in der Konsole nach Trusted-Types-Verstößen. Welche Stellen setzen noch Strings in `innerHTML`?

## Prüfen

```bash
npm run test:start -- exercises/18-trusted-types
```
