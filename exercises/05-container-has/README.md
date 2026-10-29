# 05 · Container Queries und :has()

Die Produktkarte in `start/card.css` wechselt bei 40rem Viewport-Breite ins Querformat, egal ob sie in der breiten Liste oder in der schmalen Seitenleiste steht. Für „ausverkauft“ und „Formular hat Fehler“ setzt JavaScript Klassen.

## Aufgabe

1. Mach jeden Listenplatz `.cards > li` zum Container mit `container-type: inline-size`.
2. Ersetze die Media Query durch `@container (inline-size >= 28rem)`.
3. Dimme Karten mit `.card:has(.sold-out)` statt mit der Klasse `.is-sold-out`.
4. Zeig `.error-summary` mit `form:has(:user-invalid)`, also erst nachdem jemand ein Feld falsch ausgefüllt hat.
5. Lösch das JavaScript, das bisher die Klassen gesetzt hat, gedanklich mit: Es wird nicht mehr gebraucht.

## Prüfen

```bash
npm run test:start -- exercises/05-container-has
```
