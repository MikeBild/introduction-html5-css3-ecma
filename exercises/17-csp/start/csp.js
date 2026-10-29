// @ts-check

/**
 * TODO: 16 Zufallsbytes aus crypto.getRandomValues als Base64 liefern, für jede Antwort neu.
 * @returns {string}
 */
export const createNonce = () => 'abc123'

/**
 * Die bisherige Policy erlaubt Inline-Skripte und eval – damit schützt sie vor fast nichts.
 * TODO: Nonce mit strict-dynamic, object-src 'none', base-uri 'none', frame-ancestors 'none',
 * require-trusted-types-for 'script'; kein unsafe-inline, kein unsafe-eval.
 * @param {{ nonce: string }} options
 * @returns {string} Wert für den Header Content-Security-Policy
 */
export const buildCsp = ({ nonce }) => {
  void nonce
  return `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'`
}
