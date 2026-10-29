// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

/**
 * @typedef {object} CartStore
 * @property {() => CartItem[]} getState
 * @property {(items: CartItem[]) => void} setState
 * @property {(listener: (items: CartItem[]) => void) => () => void} subscribe
 */

/**
 * Warenkorb-Anzeige. Bisher liest sie die Positionen als JSON aus einem Attribut.
 * TODO: Property items (Getter/Setter) statt Attribut, Attribut label beobachten,
 * Button „Warenkorb leeren“ meldet cart-change mit detail.items = [], addCleanup für disconnectedCallback.
 */
export class CartBadge extends HTMLElement {
  /** @type {CartItem[]} */
  items = []

  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<span part="count"></span> <button type="button" part="clear">Warenkorb leeren</button>`
  }

  connectedCallback() {
    /** @type {CartItem[]} */
    const items = JSON.parse(this.getAttribute('items') ?? '[]')
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const output = this.shadowRoot?.querySelector('[part="count"]')
    if (output) output.textContent = `Warenkorb: ${count}`
  }

  /** @param {() => void} cleanup */
  addCleanup(cleanup) {
    void cleanup
  }
}

if (!customElements.get('cart-badge')) customElements.define('cart-badge', CartBadge)

/**
 * TODO: items aus dem Store setzen, Änderungen abonnieren, cart-change an den Store
 * weitergeben, beim Entfernen des Elements alles wieder lösen.
 * @param {CartBadge} element
 * @param {CartStore} store
 * @returns {() => void}
 */
export const connectStore = (element, store) => {
  element.setAttribute('items', JSON.stringify(store.getState()))
  return () => {}
}
