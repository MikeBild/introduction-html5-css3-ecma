# 09 · Streams statt warten

Der Server liefert unter `/api/products/stream` die Produkte als NDJSON, also ein JSON-Objekt je Zeile, mit kleiner Verzögerung. `start/ndjson.js` wartet mit `response.text()`, bis alles da ist, und stolpert über die leere letzte Zeile.

## Aufgabe

1. Lies `response.body` über `pipeThrough(new TextDecoderStream())` und `getReader()` in einer Schleife.
2. Sammel den Text in einem Puffer, zerleg ihn an `\n` und behalte die unvollständige letzte Zeile für den nächsten Chunk.
3. Liefere jedes Objekt per `yield`, sobald seine Zeile vollständig ist. Überspring Leerzeilen.
4. Verarbeite am Ende den Rest im Puffer, falls die letzte Zeile keinen Zeilenumbruch hat.
5. Gib den Reader im `finally` mit `releaseLock()` frei.

Asynchrone Iteration direkt über `response.body` (`for await`) ist seit September 2026 Baseline. Die Schleife mit `getReader()` läuft auch in älteren Browsern.

## Prüfen

```bash
npm run test:start -- exercises/09-streams
```

Im Browser: `npm start`, dann in der Konsole `for await (const p of readNdjson(await fetch('/api/products/stream'))) console.log(p)`.
