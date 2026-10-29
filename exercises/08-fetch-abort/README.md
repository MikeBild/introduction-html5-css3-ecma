# 08 · fetch mit AbortController

`start/products-api.js` wartet notfalls ewig, ignoriert Fehlerstatus wie 503 und lässt eine alte Suche eine neue überholen. Jeder Request braucht ein Ende: einen Timeout, einen Abbruch durch den Aufrufer und eine klare Fehlermeldung.

## Aufgabe

1. Kombiniere in `loadProducts({ signal, timeoutMs, fetchFn })` das Signal des Aufrufers mit `AbortSignal.timeout(timeoutMs)` über `AbortSignal.any` und gib es an `fetch` weiter.
2. Wirf `HttpError` mit dem Status, wenn `response.ok` falsch ist. `fetch` selbst wirft bei 404 oder 503 nicht.
3. Lass die Funktion aus `createSearch(fetchFn)` jede vorige, noch laufende Suche mit einem `AbortController` abbrechen.
4. `fetchFn` ist nur für die Tests da, im Browser bleibt es `fetch`.

## Prüfen

```bash
npm run test:start -- exercises/08-fetch-abort
```
