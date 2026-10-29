# Übungen: Moderne Web-Plattform

Übungs-Repo zum Workshop „Moderne Web-Plattform ohne Framework“. Jede Übung hat einen Startpunkt, Tests und eine Lösung. Alle Übungen bauen am selben Beispiel, dem Werkstatt-Shop.

## Was du lernst

- Semantisches HTML, Accessibility und modernes CSS ohne Framework schreiben
- Formulare, `fetch`, Streams und ES Modules direkt im Browser nutzen
- Web Components, Offline, Core Web Vitals und Sicherheit mit CSP umsetzen

## Voraussetzungen

- **Node.js 26** – `nvm use` liest die Version aus [`.nvmrc`](.nvmrc).
- Git und ein Editor mit JavaScript- und TypeScript-Support, z. B. VS Code
- ein aktueller Browser mit DevTools

## Einrichten

```bash
git clone https://github.com/MikeBild/introduction-web-plattform.git
cd introduction-web-plattform
npm install
npx playwright install chromium   # einmalig: Chromium für die Tests
npm run typecheck                  # Typprüfung mit TypeScript strict
npm test                           # alle Tests gegen die Lösungen in solution/
npm start                          # Shop unter http://localhost:3000
```

## So arbeitest du mit einer Übung

Jede Übung hat einen Ordner `start/` (dein Startpunkt) und `solution/` (die Lösung). Der Test liegt daneben, importiert aus `solution/` und prüft mit `TARGET=start` stattdessen deinen Ordner `start/`.

```bash
npm run test:start                 # alle Tests gegen deine Lösungen in start/
npm run test:start -- exercises/06-forms   # nur eine Übung
```

## Übungen

| Nr. | Übung | Thema |
| --- | --- | --- |
| 01 | [semantic-html](exercises/01-semantic-html) | Produktliste mit Landmarks, Überschriften, Listen, Links und Buttons |
| 02 | [accessibility](exercises/02-accessibility) | Warenkorb als `<dialog>`, Fokus zurück zum Auslöser, Live Region |
| 03 | [css-cascade](exercises/03-css-cascade) | Custom Properties, Cascade Layers und Nesting |
| 04 | [css-layout](exercises/04-css-layout) | Produktraster mit Grid, Warenkorbzeile mit Flexbox |
| 05 | [container-has](exercises/05-container-has) | Container Queries, `:has()` und `:user-invalid` |
| 06 | [forms](exercises/06-forms) | Checkout mit nativer Validierung und `FormData` |
| 07 | [esm-browser](exercises/07-esm-browser) | ES Modules, Import Map und `modulepreload` |
| 08 | [fetch-abort](exercises/08-fetch-abort) | `fetch` mit Timeout, Abbruch und Fehlerstatus |
| 09 | [streams](exercises/09-streams) | NDJSON aus einem Stream lesen |
| 10 | [custom-elements](exercises/10-custom-elements) | `<shop-price>` und `<add-to-cart>` als Custom Elements |
| 11 | [shadow-dom](exercises/11-shadow-dom) | `<product-card>` mit Template, Shadow DOM, Slots und `::part` |
| 12 | [view-transitions](exercises/12-view-transitions) | Sortierung als View Transition mit Fallback |
| 13 | [storage-offline](exercises/13-storage-offline) | Warenkorb im `localStorage`, Cache-Strategien im Service Worker |
| 14 | [performance](exercises/14-performance) | Core Web Vitals bewerten, LCP beobachten, Bilder auszeichnen |

### Zusatzkapitel

| Nr. | Übung | Thema |
| --- | --- | --- |
| 15 | [progressive-enhancement](exercises/15-progressive-enhancement) | Checkout, der ohne JavaScript funktioniert und mit besser wird |
| 16 | [components-integration](exercises/16-components-integration) | `<cart-badge>` mit Store-Anbindung für React und Knockout |
| 17 | [csp](exercises/17-csp) | Sicherheit: strikte Content Security Policy mit Nonce |
| 18 | [trusted-types](exercises/18-trusted-types) | Sicherheit: Bewertungen ohne DOM-XSS, Policy für Trusted Types |

01 bis 14 bilden den Kern des Workshops. 17 und 18 gehören zum Block Sicherheit.

## Der Werkstatt-Shop

Ein kleiner Shop für Werkstattbedarf: Produktliste, Warenkorb, Checkout. Gemeinsame Daten stehen in [`exercises/shop.js`](exercises/shop.js): der Typ `Product` (`id`, `name`, `priceCents`, `stock`), vier Beispielprodukte und `formatCents`. Geld steht überall in ganzen Cent, erst die Anzeige macht daraus Euro.

Unter [`app/`](app) setzen die Lösungen den Shop zusammen. Starte ihn mit `npm start` und probier Tastaturbedienung, Sortierung, Warenkorb und Bestellung aus, auch mit abgeschaltetem JavaScript.

## Ohne Build, trotzdem geprüft

- **Browser-Code** ist JavaScript mit JSDoc-Typen und `// @ts-check`. `npm run typecheck` prüft ihn mit TypeScript im Modus `strict`, ohne dass etwas übersetzt wird.
- **Server** (`server.ts`) ist TypeScript, das Node.js 26 direkt ausführt. Er liefert `app/` und `exercises/` aus und bietet eine kleine API: `GET /api/products`, `GET /api/products/stream` (NDJSON), `POST /api/orders` (JSON, Formular oder FormData). Mit `CSP=1` schickt er die Policy aus Übung 17 als Report-Only, mit `CSP=enforce` setzt er sie durch.
- **Tests** laufen mit Vitest im Browser-Modus in einem echten Chromium. So prüfen sie echtes CSS, Shadow DOM, View Transitions und die Cache API.

Bewusst wenig Abhängigkeiten, alle nur für die Entwicklung:

| Paket | Wofür |
| --- | --- |
| `vitest` | Test Runner |
| `@vitest/browser-playwright` | lässt die Tests im echten Browser laufen statt in einer DOM-Nachbildung |
| `playwright` | stellt Chromium für den Browser-Modus bereit |
| `typescript` | prüft JSDoc-Typen und `server.ts` |
| `@types/node` | Typen für `server.ts` |

Vite steckt nur in Vitest. Für die App selbst gibt es kein Build-Tool.

## Browser-Unterstützung, Stand Oktober 2026

Alle Features im Kern sind Baseline, laufen also in den aktuellen Versionen von Chrome, Edge, Firefox und Safari. Geprüft mit den Baseline-Daten von MDN (`web-features` 3.44).

- **Seit Jahren Baseline:** Custom Properties, Grid, Flexbox, Cascade Layers, `<dialog>`, Constraint Validation, `fetch`, Streams, ES Modules, Import Maps, Custom Elements, Shadow DOM, Service Worker
- **Seit 2026 durchgehend verfügbar:** `:has()`, CSS Nesting, `:user-invalid`, Declarative Shadow DOM, `AbortSignal.any` und `AbortSignal.timeout`
- **Neu Baseline:** Same-Document View Transitions (Oktober 2025), LCP- und Event-Timing-API (Dezember 2025), Trusted Types (Februar 2026), asynchrone Iteration über Streams (September 2026)
- **Noch nicht Baseline:** Cross-Document View Transitions (kein Firefox), Layout Instability API für CLS (nur Chromium), Sanitizer API

## Workshop und Folien

- Workshop: [„Moderne Web-Plattform ohne Framework“](https://workshops.mikebild.dev/w/web-plattform/remote/)
- Folien: [slides.mikebild.dev/introduction-web-plattform](https://slides.mikebild.dev/introduction-web-plattform.html)

## Archiv

Das Material von 2010 bis 2016 aus der Zeit, als das Repo „Introduction to HTML5, CSS3 & ECMA“ hieß, liegt im Ordner [`legacy/`](legacy) (HTML5-APIs, CSS3, ECMAScript 2015) und mit lokalen Beispielen und Folien im Branch [`archiv-lokal`](https://github.com/MikeBild/introduction-html5-css3-ecma/tree/archiv-lokal) – als Vergleich alt gegen neu: Application Cache, XHR2 und `float`-Layouts von damals, Service Worker, `fetch` und Grid heute.

## Fehler melden

Hast du einen Fehler gefunden oder eine Idee? Leg ein [Issue](https://github.com/MikeBild/introduction-web-plattform/issues) an. Sicherheitslücken meldest du bitte nicht öffentlich, sondern über das Kontaktformular auf [mikebild.dev](https://www.mikebild.dev).

## Lizenz

[MIT](LICENSE)
