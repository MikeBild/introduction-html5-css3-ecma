// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import { createShopPolicy, renderReview } from './solution/reviews.js'

const attack = '<img src="x" onerror="window.__pwned = true">Super Zange'

describe('Bewertungen ohne DOM-XSS', () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="review"></section>'
  })

  it('zeigt fremden Text als Text, nicht als HTML', () => {
    const section = /** @type {HTMLElement} */ (document.querySelector('#review'))
    renderReview(section, { author: 'Ada', text: attack })
    expect(section.querySelector('img')).toBeNull()
    expect(section.querySelector('blockquote')?.textContent).toBe(attack)
    expect(section.textContent).toContain('Ada')
  })

  it('legt eine Trusted-Types-Policy an, die HTML escaped', () => {
    expect(window.trustedTypes).toBeDefined()
    const policy = createShopPolicy(window.trustedTypes)
    const html = policy.createHTML(attack)
    expect(window.trustedTypes?.isHTML(html)).toBe(true)
    expect(String(html)).toBe('&#60;img src=&#34;x&#34; onerror=&#34;window.__pwned = true&#34;&#62;Super Zange')
  })

  it('escaped auch ohne Trusted Types im Browser', () => {
    const policy = createShopPolicy(undefined)
    expect(policy.createHTML(`<b>"A&B"</b>`)).toBe('&#60;b&#62;&#34;A&#38;B&#34;&#60;/b&#62;')
  })
})
