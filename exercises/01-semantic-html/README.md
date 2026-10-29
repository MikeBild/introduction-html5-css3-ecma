# 01 · Semantisches HTML

Die Produktliste in `start/products.html` besteht nur aus `div` und `span` mit `onclick`. Für Screenreader, Tastatur und Suchmaschinen ist das eine Wand ohne Struktur. Richtige Elemente bringen Rolle, Fokus und Tastaturbedienung gratis mit.

## Aufgabe

1. Ersetze die Kopf-, Haupt- und Fußbereiche durch `header`, `nav`, `main` und `footer`.
2. Mach „Werkzeug“ zur einzigen `h1` und jeden Produktnamen zur `h2`.
3. Stell die Produkte als Liste dar: `ul > li > article`.
4. Mach aus Navigations-`span`s echte Links (`a href`) und aus „In den Warenkorb“ einen `button type="button"`. Kein `onclick` mehr im Markup.
5. Gib jedem `img` einen beschreibenden `alt`-Text.

## Prüfen

```bash
npm run test:start -- exercises/01-semantic-html
```
