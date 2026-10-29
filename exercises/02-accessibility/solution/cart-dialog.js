// @ts-check

/**
 * Öffnet den Warenkorb als modalen Dialog. showModal setzt den Focus in den Dialog,
 * macht den Rest der Seite inert und schließt mit Escape.
 * @param {HTMLDialogElement} dialog
 * @param {HTMLElement} trigger
 */
export const openCart = (dialog, trigger) => {
  dialog.addEventListener('close', () => trigger.focus(), { once: true })
  dialog.showModal()
}

/**
 * Sagt eine Statusmeldung an, ohne den Focus zu verschieben.
 * @param {HTMLElement} region
 * @param {string} text
 */
export const announce = (region, text) => {
  if (region.getAttribute('aria-live') !== 'polite') region.setAttribute('aria-live', 'polite')
  region.textContent = text
}
