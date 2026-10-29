# 11 · Shadow DOM, Templates und Slots

`<product-card>` in `start/product-card.js` überschreibt seinen Inhalt per `innerHTML`, und jedes globale CSS für `button` färbt seinen Button mit. Shadow DOM kapselt Markup und Styles. Slots holen die Inhalte der Seite gezielt wieder hinein, `::part` öffnet einzelne Elemente fürs Styling von außen.

## Aufgabe

1. Leg ein `<template>` mit `<style>`, einem `article`, den Slots `name` und `price`, einem Default-Slot und einem Button mit `part="buy"` an.
2. Häng im `constructor` eine offene Shadow Root an (`attachShadow({ mode: 'open' })`) und klon das Template hinein. Der Light DOM bleibt unangetastet.
3. Melde einen Klick auf den Button als `cart:add` mit `detail: { productId }`, `bubbles: true` und `composed: true`, damit das Event die Shadow Root verlässt.
4. Style den Button von außen nur über `product-card::part(buy)`.

Bonus: Schreib eine Karte als Declarative Shadow DOM (`<template shadowrootmode="open">`) direkt ins HTML. Sie rendert, bevor JavaScript lädt.

## Prüfen

```bash
npm run test:start -- exercises/11-shadow-dom
```
