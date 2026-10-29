// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import markup from './solution/products.html?raw'

/** @param {string} selector */
const all = (selector) => [...document.body.querySelectorAll(selector)]

describe('Produktliste mit semantischem HTML', () => {
  beforeEach(() => {
    document.body.innerHTML = markup
  })

  it('hat Landmarks: header, nav, main und footer', () => {
    expect(all('header')).toHaveLength(1)
    expect(all('nav')).toHaveLength(1)
    expect(all('main')).toHaveLength(1)
    expect(all('footer')).toHaveLength(1)
  })

  it('hat genau eine h1 und je Produkt eine h2', () => {
    expect(all('h1')).toHaveLength(1)
    const articles = all('main ul > li > article')
    expect(articles).toHaveLength(3)
    for (const article of articles) expect(article.querySelector('h2')?.textContent).toBeTruthy()
  })

  it('nutzt Links für Navigation und Buttons für Aktionen', () => {
    expect(all('[onclick]')).toHaveLength(0)
    expect(all('nav a[href]').length).toBeGreaterThanOrEqual(2)
    const buttons = all('main button')
    expect(buttons).toHaveLength(3)
    for (const button of buttons) expect(button.getAttribute('type')).toBe('button')
  })

  it('gibt jedem Bild einen Alternativtext', () => {
    const images = all('img')
    expect(images.length).toBeGreaterThan(0)
    for (const image of images) expect(image.getAttribute('alt')?.trim()).toBeTruthy()
  })
})
