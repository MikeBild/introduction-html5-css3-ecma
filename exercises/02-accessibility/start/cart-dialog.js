// @ts-check

/**
 * Öffnet den Warenkorb als modalen Dialog.
 * TODO: showModal statt open-Attribut, Focus nach dem Schließen zurück zum Auslöser.
 * @param {HTMLDialogElement} dialog
 * @param {HTMLElement} trigger
 */
export const openCart = (dialog, trigger) => {
  dialog.setAttribute('open', '')
  void trigger
}

/**
 * Sagt eine Statusmeldung an, ohne den Focus zu verschieben.
 * TODO: Live Region mit aria-live="polite" nutzen.
 * @param {HTMLElement} region
 * @param {string} text
 */
export const announce = (region, text) => {
  void region
  alert(text)
}
