// @ts-check
import { describe, expect, it } from 'vitest'
import { buildCsp, createNonce } from './solution/csp.js'

/** @param {string} policy */
const directives = (policy) =>
  new Map(
    policy
      .split(';')
      .map((part) => part.trim().split(/\s+/))
      .filter((tokens) => tokens[0])
      .map(([name, ...values]) => [name, values]),
  )

describe('Content Security Policy mit Nonce', () => {
  it('erzeugt für jede Antwort eine neue, zufällige Nonce', () => {
    const first = createNonce()
    expect(first).toMatch(/^[A-Za-z0-9+/]{22}==$/)
    expect(createNonce()).not.toBe(first)
  })

  it('erlaubt nur Skripte mit der Nonce und vererbt das Vertrauen per strict-dynamic', () => {
    const policy = directives(buildCsp({ nonce: 'r4nd0m' }))
    expect(policy.get('script-src')).toEqual(["'nonce-r4nd0m'", "'strict-dynamic'"])
    expect(buildCsp({ nonce: 'r4nd0m' })).not.toMatch(/unsafe-inline|unsafe-eval/)
  })

  it('schließt Plugins, fremde base-URLs und Framing aus', () => {
    const policy = directives(buildCsp({ nonce: 'x' }))
    expect(policy.get('object-src')).toEqual(["'none'"])
    expect(policy.get('base-uri')).toEqual(["'none'"])
    expect(policy.get('frame-ancestors')).toEqual(["'none'"])
  })

  it('verlangt Trusted Types für DOM-Sinks', () => {
    expect(directives(buildCsp({ nonce: 'x' })).get('require-trusted-types-for')).toEqual(["'script'"])
  })
})
