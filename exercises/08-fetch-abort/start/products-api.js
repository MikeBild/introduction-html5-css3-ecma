// @ts-check
/** @import { Product } from '../../shop.js' */

/** Fehler für Antworten mit Status außerhalb von 200 bis 299. */
export class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} url
   */
  constructor(status, url) {
    super(`HTTP ${status} für ${url}`)
    this.name = 'HttpError'
    this.status = status
  }
}

/**
 * Lädt die Produkte.
 * TODO: signal des Aufrufers und Timeout mit AbortSignal.any kombinieren, bei !response.ok HttpError werfen.
 * @param {{ signal?: AbortSignal, timeoutMs?: number, fetchFn?: typeof fetch }} [options]
 * @returns {Promise<Product[]>}
 */
export const loadProducts = async ({ fetchFn = fetch } = {}) => {
  const response = await fetchFn('/api/products')
  return response.json()
}

/**
 * Liefert eine Suchfunktion.
 * TODO: jede vorige, noch laufende Suche per AbortController abbrechen.
 * @param {typeof fetch} [fetchFn]
 * @returns {(term: string) => Promise<Product[]>}
 */
export const createSearch = (fetchFn = fetch) => async (term) => {
  const response = await fetchFn(`/api/products?q=${encodeURIComponent(term)}`)
  return response.json()
}
