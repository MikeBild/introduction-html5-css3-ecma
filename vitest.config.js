// @ts-check
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

// Die Tests importieren aus ./solution/. Mit TARGET=start biegt dieses Plugin
// jeden solchen Import auf ./start/ um – so prüft derselbe Test deine Lösung.
const target = process.env.TARGET === 'start' ? 'start' : 'solution'

/** @returns {import('vite').Plugin} */
const targetFolder = () => ({
  name: 'target-folder',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (target !== 'start' || !source.startsWith('./solution/')) return null
    return this.resolve(source.replace('./solution/', './start/'), importer, { ...options, skipSelf: true })
  },
})

export default defineConfig({
  plugins: [targetFolder()],
  test: {
    include: ['exercises/*/*.test.js'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false,
    },
  },
})
