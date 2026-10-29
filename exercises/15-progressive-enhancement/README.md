# 15 · Progressive Enhancement

Der Checkout in `start/checkout.html` funktioniert nur mit JavaScript: ein Link mit `onclick`, kein `form`, kein `action`. Lädt das Skript nicht, weil das Netz wackelt oder ein Fehler alles stoppt, kann niemand bestellen. Progressive Enhancement dreht das um: Erst funktioniert es mit HTML, dann wird es mit JavaScript besser.

## Aufgabe

1. Bau ein echtes `<form method="post" action="/api/orders">` mit Labels, `name`-Attributen, `<button type="submit">` und einem `<output role="status">`.
2. Prüf unter `npm start` mit abgeschaltetem JavaScript: Der Server nimmt die Bestellung an und antwortet mit einer Seite.
3. Lass `enhanceForm(form, fetchFn)` den Submit abfangen und die `FormData` per `fetch` an `form.action` schicken. Zeig das Ergebnis im `output`.
4. Nenn bei einer Fehlerantwort den nächsten Schritt.
5. Ruf bei einem Netzfehler `form.submit()` auf und fall so auf den Weg ohne JavaScript zurück.

## Prüfen

```bash
npm run test:start -- exercises/15-progressive-enhancement
```
