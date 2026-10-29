# 02 · Accessibility mit Tastatur und Screenreader

Der Warenkorb öffnet sich als Overlay. In `start/cart-dialog.js` setzt der Code nur das Attribut `open`: Der Fokus bleibt hinter dem Overlay, Escape tut nichts, und nach dem Schließen weiß niemand, wo er steht. Die Bestätigung kommt per `alert` und reißt alle aus dem Fluss.

## Aufgabe

1. Lass `openCart(dialog, trigger)` den Dialog mit `showModal()` öffnen. Der Browser setzt den Fokus hinein (`autofocus`), macht den Rest inert und schließt mit Escape.
2. Gib den Fokus beim Ereignis `close` an `trigger` zurück.
3. Lass `announce(region, text)` die Meldung in eine Live Region mit `aria-live="polite"` schreiben, statt `alert` zu rufen.
4. Bedien danach die Seite unter `npm start` fünf Minuten nur mit der Tastatur.

## Prüfen

```bash
npm run test:start -- exercises/02-accessibility
```
