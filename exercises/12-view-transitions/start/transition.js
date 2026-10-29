// @ts-check

/**
 * Führt eine DOM-Änderung aus.
 * TODO: über document.startViewTransition animieren, ohne API und bei
 * „prefers-reduced-motion: reduce“ sofort ausführen. Erfüllen, sobald das DOM aktualisiert ist.
 * @param {() => void | Promise<void>} update
 * @returns {Promise<void>}
 */
export const transition = async (update) => {
  await update()
}

/**
 * TODO: jeder Karte einen eindeutigen view-transition-name geben: card-<data-product-id>.
 * @param {Iterable<HTMLElement>} cards Elemente mit data-product-id
 */
export const nameCards = (cards) => {
  void cards
}
