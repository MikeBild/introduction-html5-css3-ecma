# 13 · Storage und Offline mit Service Worker

Der Warenkorb soll einen Reload überstehen, und der Shop soll offline wenigstens die zuletzt geladenen Produkte zeigen. Dafür brauchst du zwei Dinge: einen robusten Speicher für kleine Daten und eine bewusste Cache-Strategie im Service Worker.

## Aufgabe

1. Lass `createCartStorage(storage, key)` den Warenkorb als `{ version: 1, items }` speichern. `load()` liefert `[]` bei fehlenden Daten, kaputtem JSON oder einer anderen Version. `save()` liefert `false`, statt zu werfen, wenn der Speicher voll ist.
2. Schreib `cacheFirst(request, cache, fetchFn)`: Treffer aus dem Cache liefern, sonst laden und nur erfolgreiche Antworten cachen.
3. Schreib `networkFirst(request, cache, fetchFn)`: laden und cachen; wenn das Netz fehlt, den letzten Stand aus dem Cache liefern.
4. Vervollständige `start/sw.js`: App Shell bei `install` cachen, alte Caches bei `activate` löschen, `/api/` mit `networkFirst`, alles andere mit `cacheFirst` beantworten.
5. Probier es unter `npm start` aus: DevTools → Application → Service Workers, dann im Network-Tab „Offline“ wählen und neu laden.

## Prüfen

```bash
npm run test:start -- exercises/13-storage-offline
```

Die Tests prüfen Speicher und Strategien mit der echten Cache API im Browser. Den Service Worker selbst prüfst du im Browser.
