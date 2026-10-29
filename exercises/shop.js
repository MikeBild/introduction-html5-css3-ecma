// @ts-check
// Gemeinsame Daten des Werkstatt-Shops. Geld steht immer in ganzen Cent.

/**
 * @typedef {object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} priceCents
 * @property {number} stock
 */

/** @type {readonly Product[]} */
export const products = Object.freeze([
  { id: 'p-hammer', name: 'Schlosserhammer', priceCents: 1290, stock: 12 },
  { id: 'p-zange', name: 'Kombizange', priceCents: 1890, stock: 5 },
  { id: 'p-bits', name: 'Bit-Satz, 32-teilig', priceCents: 2490, stock: 0 },
  { id: 'p-akku', name: 'Akku-Schrauber', priceCents: 8990, stock: 3 },
])

const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

/**
 * Formatiert Cent als Euro-Betrag, z. B. 1290 → „12,90 €“.
 * @param {number} cents
 * @returns {string}
 */
export const formatCents = (cents) => euro.format(cents / 100)
