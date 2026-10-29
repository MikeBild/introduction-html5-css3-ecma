# 10 · Custom Elements

Preise und Warenkorb-Buttons tauchen im Shop überall auf. Statt sie jedes Mal per Hand zu formatieren und zu verdrahten, werden sie eigene HTML-Elemente: `<shop-price>` und `<add-to-cart>`. Das funktioniert in jedem Framework und ganz ohne.

## Aufgabe

1. Lass `<shop-price cents="…">` auf Änderungen reagieren: `static observedAttributes = ['cents']` und `attributeChangedCallback`.
2. Lass `<add-to-cart>` einen echten `<button type="button">In den Warenkorb</button>` rendern, falls noch keiner drinsteht.
3. Melde einen Klick als `CustomEvent('cart:add', { detail: { productId }, bubbles: true, composed: true })`.
4. Registrier den Click-Listener in `connectedCallback` und entfern ihn in `disconnectedCallback`, damit ein verschobenes Element nicht doppelt meldet.

## Prüfen

```bash
npm run test:start -- exercises/10-custom-elements
```
