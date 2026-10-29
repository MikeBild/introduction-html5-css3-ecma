// @ts-check

/** @typedef {'LCP' | 'INP' | 'CLS'} VitalName */
/** @typedef {'good' | 'needs-improvement' | 'poor'} Rating */

/**
 * TODO: nach den Grenzwerten bewerten – LCP 2.500/4.000 ms, INP 200/500 ms, CLS 0,1/0,25.
 * @param {VitalName} name
 * @param {number} value
 * @returns {Rating}
 */
export const rate = (name, value) => {
  void name
  void value
  return 'good'
}

/**
 * TODO: PerformanceObserver für 'largest-contentful-paint' mit buffered: true,
 * den letzten Eintrag melden, Funktion zum Beenden zurückgeben.
 * @param {(metric: { name: 'LCP', value: number, rating: Rating }) => void} report
 * @returns {() => void}
 */
export const observeLcp = (report) => {
  window.addEventListener('load', () => report({ name: 'LCP', value: performance.now(), rating: 'good' }))
  return () => {}
}
