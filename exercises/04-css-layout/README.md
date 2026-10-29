# 04 · Grid und Flexbox

`start/layout.css` baut das Produktraster noch mit `float` und festen Prozentbreiten: Auf schmalen Bildschirmen werden die Karten winzig, auf breiten bleiben es vier. Die Warenkorbzeile hängt an `float: right`.

## Aufgabe

1. Mach `.products` zum Grid mit `grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr))` und `gap: 1rem`. Ganz ohne Media Query.
2. Mach `.cart-line` zur Flexbox: Der Name wächst (`flex: 1`), die Summe steht am rechten Rand.
3. Entferne alle `float`s.
4. Probier im Browser aus: Wie viele Spalten bekommst du bei 960, 500 und 230 Pixel Breite?

## Prüfen

```bash
npm run test:start -- exercises/04-css-layout
```
