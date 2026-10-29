# 06 · Formulare und native Validierung

Das Checkout-Formular in `start/checkout.html` hat keine Labels, keine Typen und einen „Button“ aus `span`, der eine eigene Prüffunktion aufruft. Der Browser kann das alles selbst: Pflichtfelder, E-Mail-Format, Muster und eigene Meldungen über die Constraint Validation API.

## Aufgabe

1. Gib jedem Feld ein `label` mit `for` und eine passende `id`.
2. Setz `required`, `type="email"`, für die PLZ `pattern="\d{5}"` und für die Menge `type="number" min="1"`.
3. Ersetze den `span` durch `<button type="submit">`.
4. Lass `checkQuantity(input, stock)` per `setCustomValidity` melden, wenn die Menge den Bestand übersteigt, und die Meldung mit `''` wieder löschen.
5. Lass `readCheckout(form)` die Werte per `FormData` lesen, getrimmt, die Menge als Zahl.

## Prüfen

```bash
npm run test:start -- exercises/06-forms
```
