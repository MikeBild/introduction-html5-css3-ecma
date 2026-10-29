// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import { connectStore } from './solution/cart-badge.js'
/** @import { CartBadge, CartStore } from './solution/cart-badge.js' */
/** @import { CartItem } from '../07-esm-browser/solution/lib/cart.js' */

/** Minimaler Store, wie ihn ein React-Context, ein Knockout-ViewModel oder Vanilla JS anbieten könnte. */
const createStore = (/** @type {CartItem[]} */ initial) => {
  let items = initial
  /** @type {Set<(items: CartItem[]) => void>} */
  const listeners = new Set()
  /** @type {CartStore & { listenerCount: () => number }} */
  const store = {
    getState: () => items,
    setState: (next) => {
      items = next
      for (const listener of listeners) listener(items)
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    listenerCount: () => listeners.size,
  }
  return store
}

const badge = () => /** @type {CartBadge} */ (document.querySelector('cart-badge'))
const text = () => badge().shadowRoot?.querySelector('[part="count"]')?.textContent

describe('Web Component in fremde Frameworks einbetten', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cart-badge label="Im Korb"></cart-badge>'
  })

  it('nimmt Daten als Property entgegen und zeigt das Label', () => {
    badge().items = [{ productId: 'p-hammer', quantity: 2, priceCents: 1290 }]
    expect(text()).toBe('Im Korb: 2')
    badge().setAttribute('label', 'Warenkorb')
    expect(text()).toBe('Warenkorb: 2')
  })

  it('folgt dem Store und meldet Änderungen an ihn zurück', () => {
    const store = createStore([{ productId: 'p-zange', quantity: 1, priceCents: 1890 }])
    connectStore(badge(), store)
    expect(text()).toBe('Im Korb: 1')
    store.setState([{ productId: 'p-zange', quantity: 3, priceCents: 1890 }])
    expect(text()).toBe('Im Korb: 3')
    const clear = /** @type {HTMLButtonElement} */ (badge().shadowRoot?.querySelector('[part="clear"]'))
    clear.click()
    expect(store.getState()).toEqual([])
    expect(text()).toBe('Im Korb: 0')
  })

  it('löst die Verbindung, sobald das Element das DOM verlässt', () => {
    const store = createStore([])
    connectStore(badge(), store)
    expect(store.listenerCount()).toBe(1)
    badge().remove()
    expect(store.listenerCount()).toBe(0)
  })
})
