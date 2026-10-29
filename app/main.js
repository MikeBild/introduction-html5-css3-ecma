// @ts-check
// Der Werkstatt-Shop aus den Musterlösungen: ES Modules, Custom Elements, fetch,
// View Transitions, localStorage, Progressive Enhancement – ohne Framework, ohne Build.
import { addItem } from 'shop/cart.js'
import { products as fallbackProducts } from '../exercises/shop.js'
import '../exercises/10-custom-elements/solution/elements.js'
import '../exercises/11-shadow-dom/solution/product-card.js'
import { loadProducts } from '../exercises/08-fetch-abort/solution/products-api.js'
import { createCartStorage } from '../exercises/13-storage-offline/solution/offline.js'
import { nameCards, transition } from '../exercises/12-view-transitions/solution/transition.js'
import { enhanceForm } from '../exercises/15-progressive-enhancement/solution/enhance.js'
import { connectStore } from '../exercises/16-components-integration/solution/cart-badge.js'
/** @import { Product } from '../exercises/shop.js' */
/** @import { CartItem } from 'shop/cart.js' */
/** @import { CartBadge } from '../exercises/16-components-integration/solution/cart-badge.js' */

const list = /** @type {HTMLUListElement} */ (document.querySelector('#products'))
const sort = /** @type {HTMLSelectElement} */ (document.querySelector('#sort'))
const form = /** @type {HTMLFormElement} */ (document.querySelector('form.checkout'))
const badge = /** @type {CartBadge} */ (document.querySelector('cart-badge'))

// Kleiner Store für den Warenkorb, im localStorage gesichert
const storage = createCartStorage(localStorage, 'werkstatt-shop:cart')
/** @type {Set<(items: CartItem[]) => void>} */
const listeners = new Set()
let cart = storage.load()
const store = {
  getState: () => cart,
  /** @param {CartItem[]} items */
  setState: (items) => {
    cart = items
    storage.save(cart)
    for (const listener of listeners) listener(cart)
  },
  /** @param {(items: CartItem[]) => void} listener */
  subscribe: (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
connectStore(badge, store)

/** @type {Product[]} */
let products = []

/** @param {string} order */
const sorted = (order) =>
  [...products].sort((a, b) => {
    if (order === 'price-asc') return a.priceCents - b.priceCents
    if (order === 'price-desc') return b.priceCents - a.priceCents
    return a.name.localeCompare(b.name, 'de')
  })

const render = () => {
  const items = sorted(sort.value).map((product) => {
    const item = document.createElement('li')
    const card = document.createElement('product-card')
    card.setAttribute('product-id', product.id)
    card.dataset.productId = product.id
    if (product.stock === 0) card.setAttribute('sold-out', '')
    const name = document.createElement('span')
    name.slot = 'name'
    name.textContent = product.name
    const price = document.createElement('shop-price')
    price.slot = 'price'
    price.setAttribute('cents', String(product.priceCents))
    const stock = document.createElement('p')
    stock.textContent = product.stock > 0 ? `${product.stock} auf Lager` : 'Ausverkauft'
    card.append(name, price, stock)
    item.append(card)
    return item
  })
  list.replaceChildren(...items)
  nameCards(list.querySelectorAll('product-card'))
  list.setAttribute('aria-busy', 'false')
}

document.addEventListener('cart:add', (event) => {
  const { productId } = /** @type {CustomEvent<{ productId: string }>} */ (event).detail
  const product = products.find((p) => p.id === productId)
  if (product && product.stock > 0) store.setState(addItem(cart, product))
})

sort.addEventListener('change', () => transition(render))
enhanceForm(form)

try {
  products = await loadProducts({ timeoutMs: 3000 })
} catch {
  // Server nicht erreichbar: mit den Beispieldaten weiterarbeiten
  products = [...fallbackProducts]
}
render()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { type: 'module' }).catch(() => {})
}
