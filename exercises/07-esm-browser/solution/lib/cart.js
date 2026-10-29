// @ts-check
/** @import { Product } from '../../../shop.js' */

/**
 * @typedef {object} CartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {number} priceCents
 */

/**
 * Legt ein Produkt in den Warenkorb. Liefert einen neuen Warenkorb, der alte bleibt unverändert.
 * @param {readonly CartItem[]} items
 * @param {Product} product
 * @param {number} [quantity]
 * @returns {CartItem[]}
 */
export const addItem = (items, product, quantity = 1) =>
  items.some((item) => item.productId === product.id)
    ? items.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item))
    : [...items, { productId: product.id, quantity, priceCents: product.priceCents }]

/**
 * @param {readonly CartItem[]} items
 * @param {string} productId
 * @returns {CartItem[]}
 */
export const removeItem = (items, productId) => items.filter((item) => item.productId !== productId)

/**
 * @param {readonly CartItem[]} items
 * @returns {number}
 */
export const totalCents = (items) => items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0)
