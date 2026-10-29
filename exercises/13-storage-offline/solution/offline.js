// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

const VERSION = 1

/**
 * Speichert den Warenkorb versioniert als JSON. Kaputte oder alte Daten ergeben
 * einen leeren Warenkorb statt eines Fehlers.
 * @param {Storage} storage z. B. localStorage
 * @param {string} key
 */
export const createCartStorage = (storage, key) => ({
  /** @returns {CartItem[]} */
  load() {
    try {
      const data = JSON.parse(storage.getItem(key) ?? 'null')
      return data?.version === VERSION && Array.isArray(data.items) ? data.items : []
    } catch {
      return []
    }
  },
  /**
   * @param {readonly CartItem[]} items
   * @returns {boolean} false, wenn der Speicher voll oder gesperrt ist
   */
  save(items) {
    try {
      storage.setItem(key, JSON.stringify({ version: VERSION, items }))
      return true
    } catch {
      return false
    }
  },
})

/**
 * Cache first: für statische Dateien, die sich nur mit neuer Version ändern.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const cacheFirst = async (request, cache, fetchFn = fetch) => {
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetchFn(request)
  if (response.ok) await cache.put(request, response.clone())
  return response
}

/**
 * Network first: für Daten wie /api/products, die aktuell sein sollen,
 * offline aber aus dem Cache kommen dürfen.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const networkFirst = async (request, cache, fetchFn = fetch) => {
  try {
    const response = await fetchFn(request)
    if (response.ok) await cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw error
  }
}
