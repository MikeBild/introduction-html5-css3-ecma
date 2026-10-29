// @ts-check

/**
 * Erzeugt eine Nonce: 16 Zufallsbytes als Base64, für jede Antwort neu.
 * @returns {string}
 */
export const createNonce = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...bytes))
}

/**
 * Baut eine strikte Content Security Policy auf Basis einer Nonce.
 * Nur Skripte mit dieser Nonce laufen; was sie nachladen, erbt das Vertrauen (strict-dynamic).
 * @param {{ nonce: string }} options
 * @returns {string} Wert für den Header Content-Security-Policy
 */
export const buildCsp = ({ nonce }) =>
  [
    `default-src 'self'`,
    `script-src 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self'`,
    `img-src 'self' data:`,
    `object-src 'none'`,
    `base-uri 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `require-trusted-types-for 'script'`,
  ].join('; ')
