// @ts-check
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import './solution/product-card.js'

const card = () => /** @type {HTMLElement} */ (document.querySelector('product-card'))
const buyButton = () => /** @type {HTMLButtonElement | null | undefined} */ (card().shadowRoot?.querySelector('[part~="buy"]'))

/** @type {HTMLStyleElement} */
let pageStyle

describe('Produktkarte mit Shadow DOM, Template und Slots', () => {
  beforeEach(() => {
    pageStyle = document.createElement('style')
    pageStyle.textContent = `
      button { color: rgb(255, 0, 0); }
      product-card::part(buy) { background-color: rgb(29, 78, 216); }`
    document.head.append(pageStyle)
    document.body.innerHTML = `
      <product-card product-id="p-zange">
        <span slot="name">Kombizange</span>
        <span slot="price">18,90 €</span>
        <p>Mit Schneide für harte Drähte</p>
      </product-card>`
  })

  afterEach(() => pageStyle.remove())

  it('hängt eine offene Shadow Root an und lässt den Light DOM stehen', () => {
    expect(card().shadowRoot?.mode).toBe('open')
    expect(card().querySelector('[slot="name"]')?.textContent).toBe('Kombizange')
  })

  it('verteilt Inhalte auf benannte Slots und den Default-Slot', () => {
    /** @param {string} selector */
    const assigned = (selector) =>
      /** @type {HTMLSlotElement | null | undefined} */ (card().shadowRoot?.querySelector(selector))
        ?.assignedElements()
        .map((element) => element.textContent)
    expect(assigned('slot[name="name"]')).toEqual(['Kombizange'])
    expect(assigned('slot[name="price"]')).toEqual(['18,90 €'])
    expect(assigned('slot:not([name])')).toEqual(['Mit Schneide für harte Drähte'])
  })

  it('schützt den Button vor globalem CSS und öffnet ihn gezielt über ::part', () => {
    const button = buyButton()
    expect(button).toBeTruthy()
    const style = getComputedStyle(/** @type {HTMLButtonElement} */ (button))
    expect(style.color).not.toBe('rgb(255, 0, 0)')
    expect(style.backgroundColor).toBe('rgb(29, 78, 216)')
  })

  it('meldet cart:add über die Grenze des Shadow DOM hinweg', () => {
    const listener = vi.fn()
    document.addEventListener('cart:add', listener)
    buyButton()?.click()
    document.removeEventListener('cart:add', listener)
    expect(listener).toHaveBeenCalledOnce()
    const event = /** @type {CustomEvent} */ (listener.mock.calls[0]?.[0])
    expect(event.detail).toEqual({ productId: 'p-zange' })
    expect(event.target).toBe(card())
  })
})
