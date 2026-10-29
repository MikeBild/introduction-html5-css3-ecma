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
 * Der Browser zeigt die Meldung an und blockiert den Submit.
 * @param {HTMLInputElement} input
 * @param {number} stock
 */
export const checkQuantity = (input, stock) => {
  const tooMany = input.valueAsNumber > stock
  input.setCustomValidity(tooMany ? `Nur noch ${stock} auf Lager. Wähl höchstens ${stock}.` : '')
}

/**
 * Liest das Checkout-Formular aus.
 * @param {HTMLFormElement} form
 * @returns {Checkout}
 */
export const readCheckout = (form) => {
  const data = new FormData(form)
  return {
    name: String(data.get('name') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    postalCode: String(data.get('postalCode') ?? '').trim(),
    quantity: Number(data.get('quantity')),
  }
}
