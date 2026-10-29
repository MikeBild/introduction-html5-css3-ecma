// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

/**
 * Speichert den Warenkorb.
 * TODO: als { version: 1, items } speichern; kaputtes JSON, fremde Versionen und
 * fehlende Daten ergeben []; save liefert false statt zu werfen, wenn der Speicher voll ist.
 * @param {Storage} storage z. B. localStorage
 * @param {string} key
 */
export const createCartStorage = (storage, key) => ({
  /** @returns {CartItem[]} */
  load() {
    return JSON.parse(storage.getItem(key) ?? '[]')
  },
  /**
   * @param {readonly CartItem[]} items
   * @returns {boolean}
   */
  save(items) {
    storage.setItem(key, JSON.stringify(items))
    return true
  },
})

/**
 * TODO: Cache first – Treffer aus dem Cache liefern, sonst laden und erfolgreiche Antworten cachen.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const cacheFirst = async (request, cache, fetchFn = fetch) => {
  void cache
  return fetchFn(request)
}

/**
 * TODO: Network first – laden und cachen; wenn das Netz fehlt, aus dem Cache liefern.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const networkFirst = async (request, cache, fetchFn = fetch) => {
  void cache
  return fetchFn(request)
}
