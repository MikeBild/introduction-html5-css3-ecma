// @ts-check
import { formatCents } from '../../shop.js'

/** Zeigt einen Preis in Cent als Euro-Betrag: <shop-price cents="1290"></shop-price> */
export class ShopPrice extends HTMLElement {
  static observedAttributes = ['cents']

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const cents = Number(this.getAttribute('cents'))
    this.textContent = Number.isFinite(cents) ? formatCents(cents) : ''
  }
}

/**
 * Button, der ein Produkt in den Warenkorb legt: <add-to-cart product-id="p-hammer"></add-to-cart>
 * Meldet das per CustomEvent „cart:add“, das bis zum document hochsteigt.
 */
export class AddToCart extends HTMLElement {
  connectedCallback() {
    if (!this.querySelector('button')) {
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = 'In den Warenkorb'
      this.append(button)
    }
    this.addEventListener('click', this.#onClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick)
  }

  #onClick = () => {
    const productId = this.getAttribute('product-id')
    if (!productId) return
    this.dispatchEvent(new CustomEvent('cart:add', { detail: { productId }, bubbles: true, composed: true }))
  }
}

if (!customElements.get('shop-price')) customElements.define('shop-price', ShopPrice)
if (!customElements.get('add-to-cart')) customElements.define('add-to-cart', AddToCart)
