// @ts-check

/**
 * @typedef {object} Review
 * @property {string} author
 * @property {string} text
 */

/**
 * Zeigt eine Bewertung an. Fremder Text landet nur über textContent im DOM,
 * nie über innerHTML – so wird aus „<img onerror=…>“ einfach Text.
 * @param {HTMLElement} element
 * @param {Review} review
 */
export const renderReview = (element, review) => {
  const quote = document.createElement('blockquote')
  quote.textContent = review.text
  const author = document.createElement('p')
  author.textContent = `– ${review.author}`
  element.replaceChildren(quote, author)
}

/** @param {string} value */
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

/**
 * @typedef {object} HtmlPolicy
 * @property {(input: string) => TrustedHTML | string} createHTML
 */

/**
 * Legt die einzige Stelle an, an der aus einem String HTML werden darf.
 * Unter require-trusted-types-for 'script' akzeptieren innerHTML & Co. nur noch TrustedHTML.
 * @param {TrustedTypePolicyFactory | undefined} factory window.trustedTypes, wenn vorhanden
 * @returns {HtmlPolicy}
 */
export const createShopPolicy = (factory) => {
  if (!factory) return { createHTML: escapeHtml }
  return factory.createPolicy('shop', { createHTML: escapeHtml })
}
