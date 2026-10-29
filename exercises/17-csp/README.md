# 17 · Content Security Policy

Die Policy in `start/csp.js` erlaubt `unsafe-inline` und `unsafe-eval`. Damit läuft jedes eingeschleuste Inline-Skript, und die Policy schützt kaum. Eine strikte Policy arbeitet mit einer Nonce: Nur Skripte, die diese Zufallszahl tragen, dürfen laufen.

## Aufgabe

1. Lass `createNonce()` 16 Zufallsbytes aus `crypto.getRandomValues` als Base64 liefern.
2. Lass `buildCsp({ nonce })` `script-src 'nonce-…' 'strict-dynamic'` setzen, ohne `unsafe-inline` und `unsafe-eval`.
3. Ergänz `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'` und `require-trusted-types-for 'script'`.
4. Starte den Server mit `CSP=1 npm start`. Er schickt die Policy aus `solution/csp.js` als `Content-Security-Policy-Report-Only` und setzt die Nonce in jedes `<script>` der Shop-Seite. So meldet der Browser Verstöße, blockiert aber nichts – der übliche erste Schritt mit einer neuen Policy.
5. Öffne die Konsole: Welche Verstöße meldet der Browser? Mit `CSP=enforce npm start` setzt der Server die Policy durch.

## Prüfen

```bash
npm run test:start -- exercises/17-csp
```
