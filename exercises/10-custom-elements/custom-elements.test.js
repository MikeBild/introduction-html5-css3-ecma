// @ts-check
import { beforeEach, describe, expect, it, vi } from 'vitest'
import './solution/elements.js'

/** @param {string} selector */
const $ = (selector) => /** @type {HTMLElement} */ (document.querySelector(selector))

describe('Custom Elements für Preis und Warenkorb-Button', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <article>
        <h2>Kombizange</h2>
        <shop-price cents="1890"></shop-price>
        <add-to-cart product-id="p-zange"></add-to-cart>
      </article>`
  })

  it('zeigt den Preis als Euro-Betrag', () => {
    expect($('shop-price').textContent).toBe('18,90 €')
  })

  it('aktualisiert den Preis, wenn sich das Attribut cents ändert', () => {
    $('shop-price').setAttribute('cents', '1290')
    expect($('shop-price').textContent).toBe('12,90 €')
  })

  it('rendert einen echten button', () => {
    const button = $('add-to-cart button')
    expect(button).not.toBeNull()
    expect(button.getAttribute('type')).toBe('button')
    expect(button.textContent).toBe('In den Warenkorb')
  })

  it('meldet cart:add mit productId, das bis zum document hochsteigt', () => {
    const listener = vi.fn()
    document.addEventListener('cart:add', listener)
    $('add-to-cart button').click()
    document.removeEventListener('cart:add', listener)
    expect(listener).toHaveBeenCalledOnce()
    const event = /** @type {CustomEvent} */ (listener.mock.calls[0]?.[0])
    expect(event.detail).toEqual({ productId: 'p-zange' })
    expect(event.composed).toBe(true)
  })

  it('meldet nach dem Entfernen und Wiedereinfügen nur einmal pro Klick', () => {
    const element = $('add-to-cart')
    const parent = /** @type {HTMLElement} */ (element.parentElement)
    element.remove()
    parent.append(element)
    const listener = vi.fn()
    document.addEventListener('cart:add', listener)
    $('add-to-cart button').click()
    document.removeEventListener('cart:add', listener)
    expect(listener).toHaveBeenCalledOnce()
  })
})
