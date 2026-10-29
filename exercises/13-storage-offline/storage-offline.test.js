// @ts-check
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cacheFirst, createCartStorage, networkFirst } from './solution/offline.js'

const item = { productId: 'p-hammer', quantity: 2, priceCents: 1290 }
const cacheName = 'test-werkstatt-shop'

afterEach(async () => {
  localStorage.clear()
  await caches.delete(cacheName)
})

describe('Warenkorb im localStorage', () => {
  it('speichert versioniert und lädt wieder', () => {
    const store = createCartStorage(localStorage, 'cart')
    expect(store.save([item])).toBe(true)
    expect(JSON.parse(localStorage.getItem('cart') ?? '')).toEqual({ version: 1, items: [item] })
    expect(store.load()).toEqual([item])
  })

  it('liefert einen leeren Warenkorb bei fehlenden, kaputten oder alten Daten', () => {
    const store = createCartStorage(localStorage, 'cart')
    expect(store.load()).toEqual([])
    localStorage.setItem('cart', '{kaputt')
    expect(store.load()).toEqual([])
    localStorage.setItem('cart', JSON.stringify([item]))
    expect(store.load()).toEqual([])
  })

  it('meldet false, wenn der Speicher voll ist', () => {
    const full = /** @type {Storage} */ (/** @type {unknown} */ ({
      getItem: () => null,
      setItem: () => {
        throw new DOMException('voll', 'QuotaExceededError')
      },
    }))
    expect(createCartStorage(full, 'cart').save([item])).toBe(false)
  })
})

describe('Cache-Strategien für den Service Worker', () => {
  const request = () => new Request(new URL('/assets/shop.css', location.origin))

  it('cacheFirst lädt einmal aus dem Netz und danach aus dem Cache', async () => {
    const cache = await caches.open(cacheName)
    const fetchFn = vi.fn(async () => new Response('body { color: black }'))
    expect(await (await cacheFirst(request(), cache, fetchFn)).text()).toBe('body { color: black }')
    expect(await (await cacheFirst(request(), cache, fetchFn)).text()).toBe('body { color: black }')
    expect(fetchFn).toHaveBeenCalledOnce()
  })

  it('cacheFirst legt Fehlerantworten nicht im Cache ab', async () => {
    const cache = await caches.open(cacheName)
    const fetchFn = vi.fn(async () => new Response('fehlt', { status: 404 }))
    await cacheFirst(request(), cache, fetchFn)
    expect(await cache.match(request())).toBeUndefined()
  })

  it('networkFirst liefert frische Daten und offline den letzten Stand', async () => {
    const cache = await caches.open(cacheName)
    const api = () => new Request(new URL('/api/products', location.origin))
    const online = vi.fn(async () => Response.json([{ id: 'p-zange' }]))
    expect(await (await networkFirst(api(), cache, online)).json()).toEqual([{ id: 'p-zange' }])
    const offline = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    expect(await (await networkFirst(api(), cache, offline)).json()).toEqual([{ id: 'p-zange' }])
  })

  it('networkFirst wirft offline, wenn nichts im Cache liegt', async () => {
    const cache = await caches.open(cacheName)
    const offline = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(networkFirst(request(), cache, offline)).rejects.toThrow('Failed to fetch')
  })
})
