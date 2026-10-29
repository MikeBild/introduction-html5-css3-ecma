// @ts-check
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { announce, openCart } from './solution/cart-dialog.js'

/** @param {string} selector */
const $ = (selector) => /** @type {HTMLElement} */ (document.querySelector(selector))

describe('Warenkorb-Dialog und Statusmeldung', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" id="open">Warenkorb (2)</button>
      <dialog id="cart" aria-labelledby="cart-title">
        <h2 id="cart-title">Warenkorb</h2>
        <button type="button" id="close" autofocus>Schließen</button>
      </dialog>
      <p id="status"></p>`
  })

  it('öffnet modal und setzt den Focus in den Dialog', () => {
    const dialog = /** @type {HTMLDialogElement} */ ($('#cart'))
    openCart(dialog, $('#open'))
    expect(dialog.open).toBe(true)
    expect(dialog.matches(':modal')).toBe(true)
    expect(dialog.contains(document.activeElement)).toBe(true)
  })

  it('gibt den Focus nach dem Schließen an den Auslöser zurück', async () => {
    const dialog = /** @type {HTMLDialogElement} */ ($('#cart'))
    openCart(dialog, $('#open'))
    const closed = new Promise((resolve) => dialog.addEventListener('close', resolve, { once: true }))
    dialog.close()
    await closed
    expect(document.activeElement).toBe($('#open'))
  })

  it('sagt Meldungen über eine Live Region an', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    announce($('#status'), 'Kombizange liegt im Warenkorb')
    expect($('#status').getAttribute('aria-live')).toBe('polite')
    expect($('#status').textContent).toBe('Kombizange liegt im Warenkorb')
    expect(alertSpy).not.toHaveBeenCalled()
  })
})
