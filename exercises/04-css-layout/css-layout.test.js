// @ts-check
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import css from './solution/layout.css?raw'

/** @type {HTMLStyleElement} */
let sheet

/** @param {number} width */
const columnsAt = (width) => {
  const list = /** @type {HTMLElement} */ (document.querySelector('.products'))
  list.style.width = `${width}px`
  const tops = [...list.children].map((item) => item.getBoundingClientRect().top)
  return tops.filter((top) => top === tops[0]).length
}

describe('Produktraster mit Grid, Warenkorbzeile mit Flexbox', () => {
  beforeEach(() => {
    sheet = document.createElement('style')
    sheet.textContent = `html { font-size: 16px } ${css}`
    document.head.append(sheet)
    document.body.innerHTML = `
      <ul class="products">${'<li><article>Produkt</article></li>'.repeat(6)}</ul>
      <div class="cart-line" style="width: 400px">
        <span class="name">Kombizange</span><span class="qty">2 ×</span><span class="total">37,80 €</span>
      </div>`
  })

  afterEach(() => sheet.remove())

  it('nutzt Grid mit Abstand für das Raster', () => {
    const list = /** @type {Element} */ (document.querySelector('.products'))
    expect(getComputedStyle(list).display).toBe('grid')
    expect(getComputedStyle(list).columnGap).toBe('16px')
  })

  it('passt die Zahl der Spalten an die verfügbare Breite an', () => {
    expect(columnsAt(960)).toBe(4)
    expect(columnsAt(500)).toBe(2)
    expect(columnsAt(230)).toBe(1)
  })

  it('setzt die Summe in der Warenkorbzeile an den rechten Rand', () => {
    const line = /** @type {Element} */ (document.querySelector('.cart-line'))
    const total = /** @type {Element} */ (document.querySelector('.total'))
    const qty = /** @type {Element} */ (document.querySelector('.qty'))
    expect(getComputedStyle(line).display).toBe('flex')
    expect(Math.round(total.getBoundingClientRect().right)).toBe(Math.round(line.getBoundingClientRect().right))
    expect(qty.getBoundingClientRect().top).toBe(total.getBoundingClientRect().top)
  })
})
