// @ts-check

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host { display: block; border: 1px solid #d4d4d8; border-radius: 0.5rem; padding: 1rem; }
    :host([sold-out]) { opacity: 0.6; }
    button { font: inherit; padding: 0.5rem 1rem; }
  </style>
  <article>
    <h2><slot name="name">Produkt</slot></h2>
    <p><slot name="price"></slot></p>
    <slot></slot>
    <button type="button" part="buy">In den Warenkorb</button>
  </article>
`

/**
 * Produktkarte mit Shadow DOM:
 * <product-card product-id="p-zange">
 *   <span slot="name">Kombizange</span>
 *   <shop-price slot="price" cents="1890"></shop-price>
 *   <p>Beschreibung landet im Default-Slot</p>
 * </product-card>
 */
export class ProductCard extends HTMLElement {
  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.append(template.content.cloneNode(true))
    root.querySelector('button')?.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('cart:add', {
          detail: { productId: this.getAttribute('product-id') },
          bubbles: true,
          composed: true,
        }),
      )
    })
  }
}

if (!customElements.get('product-card')) customElements.define('product-card', ProductCard)
