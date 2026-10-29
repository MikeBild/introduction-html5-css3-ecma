// @ts-check

/**
 * Führt eine DOM-Änderung als View Transition aus. Ohne API oder bei
 * „prefers-reduced-motion: reduce“ läuft die Änderung sofort und ohne Animation.
 * Das Promise erfüllt sich, sobald das DOM aktualisiert ist.
 * @param {() => void | Promise<void>} update
 * @returns {Promise<void>}
 */
export const transition = async (update) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (typeof document.startViewTransition !== 'function' || reduceMotion) {
    await update()
    return
  }
  await document.startViewTransition(update).updateCallbackDone
}

/**
 * Gibt jeder Karte einen eindeutigen view-transition-name, damit der Browser
 * sie zwischen altem und neuem Zustand einander zuordnet.
 * @param {Iterable<HTMLElement>} cards Elemente mit data-product-id
 */
export const nameCards = (cards) => {
  for (const card of cards) card.style.viewTransitionName = `card-${card.dataset.productId}`
}
