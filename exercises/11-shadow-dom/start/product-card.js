// @ts-check

/**
 * Produktkarte, bisher ohne Shadow DOM: Sie überschreibt ihren Inhalt mit innerHTML,
 * und jedes globale CSS greift in sie hinein.
 * TODO: template, attachShadow({ mode: 'open' }), Slots name und price plus Default-Slot,
 * part="buy" am Button, Event cart:add mit composed: true.
 */
export class ProductCard extends HTMLElement {
  connectedCallback() {
    const name = this.querySelector('[slot="name"]')?.textContent ?? 'Produkt'
    this.innerHTML = `<article><h2>${name}</h2><button>In den Warenkorb</button></article>`
  }
}

if (!customElements.get('product-card')) customElements.define('product-card', ProductCard)
