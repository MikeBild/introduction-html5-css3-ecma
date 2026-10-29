// @ts-check
/** @import { Product } from '../../../shop.js' */

/**
 * @typedef {object} CartItem
 * @property {string} productId
 * @property {number} quantity
 * @property {number} priceCents
 */

// Früher: window.Shop.cart = [] und Funktionen, die dieses globale Array verändern.
// TODO: Mach daraus reine Funktionen, die einen neuen Warenkorb liefern.

/**
 * @param {readonly CartItem[]} items
 * @param {Product} product
 * @param {number} [quantity]
 * @returns {CartItem[]}
 */
export const addItem = (items, product, quantity = 1) => {
  void product
  void quantity
  return [...items]
}

/**
 * @param {readonly CartItem[]} items
 * @param {string} productId
 * @returns {CartItem[]}
 */
export const removeItem = (items, productId) => {
  void productId
  return [...items]
}

/**
 * @param {readonly CartItem[]} items
 * @returns {number}
 */
export const totalCents = (items) => {
  void items
  return 0
}
