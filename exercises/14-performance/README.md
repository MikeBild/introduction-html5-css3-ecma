# 14 · Core Web Vitals messen

Die Startseite in `start/index.html` lädt ausgerechnet das große Hero-Bild lazy, und keines der Bilder hat feste Maße. Das verschlechtert zwei der drei Core Web Vitals: Largest Contentful Paint (LCP) und Cumulative Layout Shift (CLS). Der dritte, Interaction to Next Paint (INP), misst, wie schnell die Seite auf Eingaben reagiert.

## Aufgabe

1. Lass `rate(name, value)` nach den offiziellen Grenzwerten bewerten: LCP bis 2.500 ms gut, bis 4.000 ms verbesserungswürdig; INP 200 und 500 ms; CLS 0,1 und 0,25.
2. Lass `observeLcp(report)` einen `PerformanceObserver` für `largest-contentful-paint` mit `buffered: true` anlegen und jeweils den letzten Eintrag melden. Gib eine Funktion zurück, die die Beobachtung beendet.
3. Lade das Hero-Bild in `start/index.html` sofort mit `fetchpriority="high"` und gib allen Bildern `width` und `height`.
4. Lade die Produktbilder mit `loading="lazy"`.
5. Miss die Seite unter `npm start` im Performance-Panel der DevTools, vorher und nachher.

Die LCP-API ist seit Dezember 2025 Baseline, Event Timing für INP ebenfalls. Die Layout Instability API für CLS gibt es nur in Chromium. Für Messungen bei echten Nutzern nimmt man deshalb meist die Bibliothek `web-vitals`.

## Prüfen

```bash
npm run test:start -- exercises/14-performance
```
