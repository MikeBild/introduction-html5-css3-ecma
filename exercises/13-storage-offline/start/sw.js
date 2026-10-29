// @ts-check
/// <reference lib="webworker" />
// Service Worker des Werkstatt-Shops. Registrieren mit:
// navigator.serviceWorker.register('./sw.js', { type: 'module' })
import { cacheFirst, networkFirst } from './offline.js'

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self))
const CACHE = 'werkstatt-shop-v1'

// TODO: install – App Shell vorab cachen; activate – alte Caches löschen;
// fetch – /api/ mit networkFirst, alles andere mit cacheFirst beantworten.
sw.addEventListener('fetch', (event) => {
  void event
  void CACHE
  void cacheFirst
  void networkFirst
})
