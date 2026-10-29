// @ts-check
import { formatCents } from '../../shop.js'

/**
 * Zeigt einen Preis in Cent als Euro-Betrag: <shop-price cents="1290"></shop-price>
 * TODO: auf Änderungen von cents reagieren (observedAttributes, attributeChangedCallback).
 */
export class ShopPrice extends HTMLElement {
  connectedCallback() {
    this.textContent = formatCents(Number(this.getAttribute('cents')))
  }
}

/**
 * Button, der ein Produkt in den Warenkorb legt: <add-to-cart product-id="p-hammer"></add-to-cart>
 * TODO: echten button rendern, Event „cart:add“ mit detail.productId, bubbles und composed,
 * Listener in disconnectedCallback entfernen.
 */
export class AddToCart extends HTMLElement {
  connectedCallback() {
    this.textContent = 'In den Warenkorb'
    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add', { detail: this.getAttribute('product-id') }))
    })
  }
}

if (!customElements.get('shop-price')) customElements.define('shop-price', ShopPrice)
if (!customElements.get('add-to-cart')) customElements.define('add-to-cart', AddToCart)
