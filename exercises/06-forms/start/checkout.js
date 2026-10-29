// @ts-check

/**
 * @typedef {object} Checkout
 * @property {string} name
 * @property {string} email
 * @property {string} postalCode
 * @property {number} quantity
 */

/**
 * Meldet dem Browser, wenn die Menge den Bestand übersteigt.
 * TODO: setCustomValidity mit Meldung, leerer String, wenn alles passt.
 * @param {HTMLInputElement} input
 * @param {number} stock
 */
export const checkQuantity = (input, stock) => {
  void input
  void stock
}

/**
 * Liest das Checkout-Formular aus.
 * TODO: FormData statt einzelner querySelector-Aufrufe, quantity als Zahl.
 * @param {HTMLFormElement} form
 * @returns {Checkout}
 */
export const readCheckout = (form) => {
  void form
  throw new Error('Noch nicht umgesetzt: readCheckout')
}
