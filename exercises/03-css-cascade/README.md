# 03 · Custom Properties, Cascade Layers, Nesting

In `start/shop.css` gewinnt der Reset mit `#app button` gegen jede Klasse: Der Kaufen-Button bleibt farblos. Der übliche Ausweg wäre `!important` oder eine noch längere Selektorkette. Cascade Layers lösen das anders: Die Reihenfolge der Layers schlägt die Spezifität.

## Aufgabe

1. Schreib als erste Regel `@layer reset, base, components, utilities;`.
2. Leg die Farben, den Radius und den Abstand als Custom Properties in `:root` ab (Layer `base`), mindestens `--color-accent: #1d4ed8`.
3. Pack den Reset in `@layer reset`, `.button` in `@layer components` und `.hidden` in `@layer utilities`.
4. Schachtel `:hover` und `.toolbar &` mit CSS Nesting in die Regel für `.button`.
5. Verzichte auf `!important`.

## Prüfen

```bash
npm run test:start -- exercises/03-css-cascade
```
