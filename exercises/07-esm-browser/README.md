# 07 · ES Modules im Browser ohne Build

`start/index.html` lädt zwei klassische Skripte in fester Reihenfolge, und der Warenkorb hängt global an `window`. Seit Jahren können alle Browser ES Modules, und mit einer Import Map gibt es auch Bare Specifiers wie `shop/cart.js` – ganz ohne Bundler.

## Aufgabe

1. Mach `addItem`, `removeItem` und `totalCents` in `start/lib/cart.js` zu Pure Functions: Sie liefern einen neuen Warenkorb und ändern den alten nicht. `addItem` erhöht die Menge, wenn das Produkt schon drin ist.
2. Lade `main.js` in `start/index.html` mit `<script type="module">`.
3. Leg eine Import Map an, die `shop/` auf `./lib/` abbildet, und importier in `main.js` aus `'shop/cart.js'`.
4. Ergänz `<link rel="modulepreload" href="./lib/cart.js">`, damit der Browser das Modul früh lädt.
5. Öffne die Seite über `npm start` unter `http://localhost:3000/exercises/07-esm-browser/start/` und schau dir im Network-Tab an, welche Dateien wann laden.

## Prüfen

```bash
npm run test:start -- exercises/07-esm-browser
```
