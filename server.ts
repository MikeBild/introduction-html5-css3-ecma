// Kleiner Server für den Werkstatt-Shop: statische Dateien plus eine Mini-API.
// Läuft ohne Build und ohne Pakete direkt mit Node.js 26: node server.ts
//   PORT=3000   Port (Standard 3000)
//   CSP=1       strikte Content Security Policy aus Übung 17 als Report-Only: Verstöße in der Konsole, nichts bricht
//   CSP=enforce dieselbe Policy durchgesetzt: Verstöße blockieren
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { products } from './exercises/shop.js'
import { buildCsp, createNonce } from './exercises/17-csp/solution/csp.js'

const root = import.meta.dirname
const port = Number(process.env.PORT ?? 3000)
const cspMode = process.env.CSP === 'enforce' ? 'enforce' : process.env.CSP === '1' ? 'report-only' : 'off'
const cspHeader = cspMode === 'enforce' ? 'content-security-policy' : 'content-security-policy-report-only'

const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.md': 'text/markdown; charset=utf-8',
}

let orderCount = 0

const send = (res: ServerResponse, status: number, body: string, type = 'text/plain; charset=utf-8') => {
  res.writeHead(status, { 'content-type': type, 'x-content-type-options': 'nosniff' })
  res.end(body)
}

const readBody = async (req: IncomingMessage) => {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (body.length > 10_000) throw new Error('Body zu groß')
  }
  return body
}

// Nimmt JSON, ein normales Formular (urlencoded) und FormData per fetch (multipart) an.
const parseOrder = async (raw: string, contentType: string) => {
  const data: Record<string, unknown> = contentType.includes('application/json')
    ? JSON.parse(raw || '{}')
    : contentType
      ? Object.fromEntries(await new Response(raw, { headers: { 'content-type': contentType } }).formData())
      : {}
  const quantity = Number(data.quantity ?? 1)
  const email = String(data.email ?? '')
  const productId = String(data.productId ?? '')
  const product = products.find((p) => p.id === productId)
  const errors: string[] = []
  if (!/^[^@\s]+@[^@\s]+$/.test(email)) errors.push('Gib eine gültige E-Mail-Adresse an.')
  if (!Number.isInteger(quantity) || quantity < 1) errors.push('Wähl eine Menge von mindestens 1.')
  if (!product) errors.push('Wähl ein Produkt aus dem Katalog.')
  else if (quantity > product.stock) errors.push(`Von ${product.name} sind nur noch ${product.stock} auf Lager. Wähl eine kleinere Menge.`)
  return { errors, order: { productId, quantity, email } }
}

const handleOrder = async (req: IncomingMessage, res: ServerResponse) => {
  const wantsJson = (req.headers.accept ?? '').includes('application/json')
  const { errors, order } = await parseOrder(await readBody(req), req.headers['content-type'] ?? '')
  if (errors.length > 0) {
    if (wantsJson) return send(res, 422, JSON.stringify({ errors }), types['.json'])
    const items = errors.map((e) => `<li>${e}</li>`).join('')
    return send(res, 422, page('Bestellung nicht möglich', `<ul>${items}</ul><p><a href="/">Zurück zum Shop</a></p>`), types['.html'])
  }
  const id = `o-${++orderCount}`
  if (wantsJson) return send(res, 201, JSON.stringify({ id, ...order, status: 'placed' }), types['.json'])
  return send(res, 201, page('Danke für deine Bestellung', `<p>Deine Bestellung ${id} ist eingegangen.</p><p><a href="/">Zurück zum Shop</a></p>`), types['.html'])
}

const page = (title: string, body: string) =>
  `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · Werkstatt-Shop</title><link rel="stylesheet" href="/app/shop.css"></head><body><main><h1>${title}</h1>${body}</main></body></html>`

const serveFile = async (res: ServerResponse, pathname: string) => {
  const path = normalize(join(root, decodeURIComponent(pathname)))
  const allowed = ['app', 'exercises'].some((dir) => path.startsWith(join(root, dir) + sep))
  if (!allowed) return send(res, 404, 'Nicht gefunden. Der Shop liegt unter /')
  const file = path.endsWith(sep) ? join(path, 'index.html') : path
  try {
    let body: Buffer | string = await readFile(file)
    const type = types[extname(file)] ?? 'application/octet-stream'
    const headers: Record<string, string> = { 'content-type': type, 'x-content-type-options': 'nosniff' }
    if (cspMode !== 'off' && type.startsWith('text/html')) {
      const nonce = createNonce()
      headers[cspHeader] = buildCsp({ nonce })
      body = body.toString('utf8').replaceAll('<script', `<script nonce="${nonce}"`)
    }
    res.writeHead(200, headers)
    res.end(body)
  } catch {
    send(res, 404, `Nicht gefunden: ${pathname}. Prüf den Pfad oder starte im Shop unter /.`)
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
  try {
    if (url.pathname === '/') {
      res.writeHead(302, { location: '/app/' })
      return res.end()
    }
    if (url.pathname === '/api/products' && req.method === 'GET') {
      const q = (url.searchParams.get('q') ?? '').toLowerCase()
      return send(res, 200, JSON.stringify(products.filter((p) => p.name.toLowerCase().includes(q))), types['.json'])
    }
    if (url.pathname === '/api/products/stream' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/x-ndjson; charset=utf-8' })
      for (const product of products) {
        res.write(`${JSON.stringify(product)}\n`)
        await sleep(400)
      }
      return res.end()
    }
    if (url.pathname === '/api/orders' && req.method === 'POST') return await handleOrder(req, res)
    if (url.pathname.startsWith('/api/')) return send(res, 404, JSON.stringify({ error: 'Unbekannter Endpoint. Verfügbar sind /api/products, /api/products/stream und /api/orders.' }), types['.json'])
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Diese Adresse nimmt nur GET und HEAD an.')
    return await serveFile(res, url.pathname)
  } catch (error) {
    console.error(error)
    send(res, 500, 'Interner Fehler. Schau ins Terminal, in dem der Server läuft.')
  }
})

server.listen(port, () => {
  console.log(`Werkstatt-Shop läuft auf http://localhost:${port}${cspMode === 'off' ? '' : ` (CSP: ${cspMode})`}`)
})
