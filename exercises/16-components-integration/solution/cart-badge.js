// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

/**
 * @typedef {object} CartStore
 * @property {() => CartItem[]} getState
 * @property {(items: CartItem[]) => void} setState
 * @property {(listener: (items: CartItem[]) => void) => () => void} subscribe
 */

/**
 * Warenkorb-Anzeige, die in jedem Framework funktioniert:
 * - Daten rein über die Property items (ein Array, kein Attribut)
 * - Text über das Attribut label
 * - Änderungen raus über das Event cart-change mit detail.items
 */
export class CartBadge extends HTMLElement {
  static observedAttributes = ['label']

  /** @type {CartItem[]} */
  #items = []
  /** @type {Array<() => void>} */
  #cleanups = []

  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<span part="count"></span> <button type="button" part="clear">Warenkorb leeren</button>`
    root.querySelector('button')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cart-change', { detail: { items: [] }, bubbles: true, composed: true }))
    })
  }

  get items() {
    return this.#items
  }

  set items(items) {
    this.#items = items
    this.#render()
  }

  connectedCallback() {
    this.#render()
  }

  attributeChangedCallback() {
    this.#render()
  }

  disconnectedCallback() {
    for (const cleanup of this.#cleanups.splice(0)) cleanup()
  }

  /**
   * Merkt sich eine Aufräumfunktion für den Moment, in dem das Element das DOM verlässt.
   * @param {() => void} cleanup
   */
  addCleanup(cleanup) {
    this.#cleanups.push(cleanup)
  }

  #render() {
    const count = this.#items.reduce((sum, item) => sum + item.quantity, 0)
    const output = this.shadowRoot?.querySelector('[part="count"]')
    if (output) output.textContent = `${this.getAttribute('label') ?? 'Warenkorb'}: ${count}`
  }
}

if (!customElements.get('cart-badge')) customElements.define('cart-badge', CartBadge)

/**
 * Verbindet ein <cart-badge> mit einem Store, egal ob der aus React, Knockout oder Vanilla JS kommt.
 * Die Verbindung löst sich, sobald das Element das DOM verlässt.
 * @param {CartBadge} element
 * @param {CartStore} store
 * @returns {() => void} löst die Verbindung sofort
 */
export const connectStore = (element, store) => {
  element.items = store.getState()
  const unsubscribe = store.subscribe((items) => {
    element.items = items
  })
  /** @param {Event} event */
  const onChange = (event) => store.setState(/** @type {CustomEvent<{ items: CartItem[] }>} */ (event).detail.items)
  element.addEventListener('cart-change', onChange)
  const disconnect = () => {
    unsubscribe()
    element.removeEventListener('cart-change', onChange)
  }
  element.addCleanup(disconnect)
  return disconnect
}
