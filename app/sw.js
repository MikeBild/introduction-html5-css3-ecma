// @ts-check
/// <reference lib="webworker" />
// Service Worker der Übungs-App, mit den Strategien aus Übung 13.
import { cacheFirst, networkFirst } from '../exercises/13-storage-offline/solution/offline.js'

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self))
const CACHE = 'werkstatt-shop-app-v1'
const SHELL = ['./', './index.html', './shop.css', './main.js']

sw.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)))
})

sw.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  )
})

sw.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const isApi = new URL(request.url).pathname.startsWith('/api/')
  event.respondWith(caches.open(CACHE).then((cache) => (isApi ? networkFirst(request, cache) : cacheFirst(request, cache))))
})
