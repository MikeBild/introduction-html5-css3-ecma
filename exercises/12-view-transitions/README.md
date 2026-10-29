# 12 · View Transitions

Wenn du die Produktliste nach Preis sortierst oder filterst, springen die Karten ohne Übergang an ihren neuen Platz. Mit der View Transition API animiert der Browser vom alten zum neuen Zustand: Du änderst nur das DOM, er übernimmt den Rest. Same-Document View Transitions sind seit Oktober 2025 Baseline.

## Aufgabe

1. Lass `transition(update)` die Änderung über `document.startViewTransition(update)` ausführen und auf `updateCallbackDone` warten.
2. Führ `update` direkt aus, wenn der Browser die API nicht kennt oder `prefers-reduced-motion: reduce` gesetzt ist.
3. Lass `nameCards(cards)` jeder Karte den `view-transition-name` `card-<data-product-id>` geben. Jeder Name darf nur einmal auf der Seite vorkommen.
4. Probier unter `npm start` die Sortierung im Shop aus und verlangsame die Animation in den DevTools (Animations-Panel).

## Prüfen

```bash
npm run test:start -- exercises/12-view-transitions
```
