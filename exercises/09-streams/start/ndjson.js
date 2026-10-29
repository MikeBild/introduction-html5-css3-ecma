// @ts-check

/**
 * Liest eine NDJSON-Antwort (ein JSON-Objekt je Zeile).
 * TODO: Stream mit TextDecoderStream und getReader lesen, Zeilen puffern,
 * jedes Objekt liefern, sobald seine Zeile vollständig ist. Leere Zeilen überspringen.
 * @param {Response} response
 * @returns {AsyncGenerator<unknown, void, undefined>}
 */
export async function* readNdjson(response) {
  const text = await response.text()
  for (const line of text.split('\n')) yield JSON.parse(line)
}
