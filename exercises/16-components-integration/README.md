# 16 · Web Components in React und Knockout einbetten

Bei einer schrittweisen Migration leben alte und neue Oberflächen eine Weile nebeneinander. Ein Web Component ist dafür die neutrale Grenze: Es läuft in einer Knockout-Seite genauso wie in einer React-App. Damit das klappt, braucht es einen klaren Vertrag: Daten rein über Properties, Text über Attribute, Änderungen raus über Events.

## Aufgabe

1. Gib `<cart-badge>` in `start/cart-badge.js` eine Property `items` mit Getter und Setter. Arrays und Objekte gehören in Properties, nicht als JSON in Attribute.
2. Beobachte das Attribut `label` und zeig „Label: Anzahl“.
3. Lass „Leeren“ das Event `cart-change` mit `detail: { items: [] }` melden.
4. Lass `connectStore(element, store)` den Store mit dem Element verbinden: `items` setzen, Änderungen abonnieren, `cart-change` an `store.setState` geben. Beim Entfernen des Elements (`disconnectedCallback`) löst sich alles wieder.

## So bettest du das Element ein

React 19 setzt Properties und registriert Custom Events direkt:

```jsx
<cart-badge label="Warenkorb" items={items} oncart-change={(event) => setItems(event.detail.items)} />
```

Knockout 3.5 setzt mit `attr` nur Attribute. Für die Property `items` brauchst du ein kleines Custom Binding (hier `cartItems`), das Event fängt das eingebaute Binding `event`:

```html
<cart-badge label="Warenkorb" data-bind="cartItems: items, event: { 'cart-change': onCartChange }"></cart-badge>
```

Mehr dazu in den Workshops zu Knockout (Strangler-Migration, gemeinsamer Store) und React.

## Prüfen

```bash
npm run test:start -- exercises/16-components-integration
```
