// @ts-check

/**
 * @typedef {object} Review
 * @property {string} author
 * @property {string} text
 */

/**
 * Zeigt eine Bewertung an.
 * TODO: Text über textContent statt innerHTML einsetzen.
 * @param {HTMLElement} element
 * @param {Review} review
 */
export const renderReview = (element, review) => {
  element.innerHTML = `<blockquote>${review.text}</blockquote><p>– ${review.author}</p>`
}

/**
 * @typedef {object} HtmlPolicy
 * @property {(input: string) => TrustedHTML | string} createHTML
 */

/**
 * TODO: Policy „shop“ über factory.createPolicy anlegen, createHTML escaped &, <, >, " und '.
 * Ohne factory ein Objekt mit derselben createHTML-Funktion liefern.
 * @param {TrustedTypePolicyFactory | undefined} factory window.trustedTypes, wenn vorhanden
 * @returns {HtmlPolicy}
 */
export const createShopPolicy = (factory) => {
  void factory
  return { createHTML: (input) => input }
}
