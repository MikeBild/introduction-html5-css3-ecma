// @ts-check

/** @typedef {'LCP' | 'INP' | 'CLS'} VitalName */
/** @typedef {'good' | 'needs-improvement' | 'poor'} Rating */

/** Grenzwerte der Core Web Vitals: bis „good“, bis „needs-improvement“, darüber „poor“ */
const thresholds = /** @type {const} */ ({
  LCP: [2500, 4000], // Millisekunden
  INP: [200, 500], // Millisekunden
  CLS: [0.1, 0.25], // ohne Einheit
})

/**
 * @param {VitalName} name
 * @param {number} value
 * @returns {Rating}
 */
export const rate = (name, value) => {
  const [good, poor] = thresholds[name]
  if (value <= good) return 'good'
  if (value <= poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Meldet jeden neuen LCP-Kandidaten. buffered: true liefert auch Einträge,
 * die vor dem Aufruf entstanden sind.
 * @param {(metric: { name: 'LCP', value: number, rating: Rating }) => void} report
 * @returns {() => void} beendet die Beobachtung
 */
export const observeLcp = (report) => {
  const observer = new PerformanceObserver((list) => {
    const last = list.getEntries().at(-1)
    if (last) report({ name: 'LCP', value: last.startTime, rating: rate('LCP', last.startTime) })
  })
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
  return () => observer.disconnect()
}
