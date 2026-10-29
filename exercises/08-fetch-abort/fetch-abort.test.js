// @ts-check
import { describe, expect, it, vi } from 'vitest'
import { HttpError, createSearch, loadProducts } from './solution/products-api.js'

/**
 * fetch-Ersatz: antwortet nach `delayMs` mit `body`, bricht beim Abort mit dem Grund des Signals ab.
 * @param {unknown} body
 * @param {{ status?: number, delayMs?: number }} [options]
 */
const fakeFetch = (body, { status = 200, delayMs = 0 } = {}) =>
  vi.fn(
    /** @type {(url: RequestInfo | URL, init?: RequestInit) => Promise<Response>} */
    (url, init) =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => resolve(Response.json(body, { status })), delayMs)
        init?.signal?.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(init.signal?.reason)
        })
      }),
  )

describe('fetch mit Abbruch, Timeout und Fehlerbehandlung', () => {
  it('lädt Produkte als JSON', async () => {
    const fetchFn = fakeFetch([{ id: 'p-hammer' }])
    await expect(loadProducts({ fetchFn })).resolves.toEqual([{ id: 'p-hammer' }])
    expect(fetchFn.mock.calls[0]?.[1]?.signal).toBeInstanceOf(AbortSignal)
  })

  it('wirft HttpError mit Status, wenn der Server einen Fehler meldet', async () => {
    const fetchFn = fakeFetch({ error: 'kaputt' }, { status: 503 })
    const error = await loadProducts({ fetchFn }).catch((e) => e)
    expect(error).toBeInstanceOf(HttpError)
    expect(error.status).toBe(503)
  })

  it('bricht nach dem Timeout ab', async () => {
    const fetchFn = fakeFetch([], { delayMs: 500 })
    const error = await loadProducts({ fetchFn, timeoutMs: 20 }).catch((e) => e)
    expect(error.name).toBe('TimeoutError')
  })

  it('bricht ab, wenn der Aufrufer abbricht', async () => {
    const fetchFn = fakeFetch([], { delayMs: 500 })
    const controller = new AbortController()
    const pending = loadProducts({ fetchFn, signal: controller.signal, timeoutMs: 5000 })
    controller.abort()
    const error = await pending.catch((e) => e)
    expect(error.name).toBe('AbortError')
  })

  it('bricht eine laufende Suche ab, sobald eine neue startet', async () => {
    const fetchFn = fakeFetch([{ id: 'p-zange' }], { delayMs: 30 })
    const search = createSearch(fetchFn)
    const first = search('za').catch((e) => e)
    const second = search('zange')
    expect((await first).name).toBe('AbortError')
    await expect(second).resolves.toEqual([{ id: 'p-zange' }])
    expect(fetchFn.mock.calls[1]?.[0]).toBe('/api/products?q=zange')
  })
})
