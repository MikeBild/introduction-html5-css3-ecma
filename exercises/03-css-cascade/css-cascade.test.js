// @ts-check
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import css from './solution/shop.css?raw'

/** @param {string} selector */
const style = (selector) => getComputedStyle(/** @type {Element} */ (document.querySelector(selector)))

/** @type {HTMLStyleElement} */
let sheet

describe('Custom Properties, Cascade Layers und Nesting', () => {
  beforeEach(() => {
    sheet = document.createElement('style')
    sheet.textContent = css
    document.head.append(sheet)
    document.body.innerHTML = `
      <div id="app">
        <div class="toolbar">
          <button class="button" id="buy">Kaufen</button>
          <button class="button hidden" id="secret">Versteckt</button>
        </div>
      </div>`
  })

  afterEach(() => sheet.remove())

  it('definiert die Akzentfarbe als Custom Property', () => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
    expect(accent).toBe('#1d4ed8')
  })

  it('legt die Reihenfolge der Layers am Anfang fest', () => {
    expect(css.trimStart()).toMatch(/^(\/\*[\s\S]*?\*\/\s*)?@layer reset, base, components, utilities;/)
    expect(css).not.toContain('!important')
  })

  it('lässt die Component gegen den Reset gewinnen, obwohl der Reset eine ID nutzt', () => {
    expect(style('#buy').backgroundColor).toBe('rgb(29, 78, 216)')
    expect(style('#buy').display).toBe('inline-flex')
  })

  it('lässt Utilities gegen Components gewinnen', () => {
    expect(style('#secret').display).toBe('none')
  })

  it('schachtelt den Hover-Zustand in die Regel für .button', () => {
    const rules = [...sheet.sheet?.cssRules ?? []]
      .flatMap((rule) => (rule instanceof CSSLayerBlockRule ? [...rule.cssRules] : []))
      .filter((rule) => rule instanceof CSSStyleRule && rule.selectorText === '.button')
    const button = /** @type {CSSStyleRule | undefined} */ (rules[0])
    expect(button).toBeDefined()
    expect([...button?.cssRules ?? []].some((rule) => rule instanceof CSSStyleRule && rule.selectorText.includes(':hover'))).toBe(true)
  })
})
