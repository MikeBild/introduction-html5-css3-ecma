// @ts-check

/**
 * Liest eine NDJSON-Antwort (ein JSON-Objekt je Zeile) und liefert jedes Objekt,
 * sobald seine Zeile vollständig da ist – nicht erst am Ende.
 * @param {Response} response
 * @returns {AsyncGenerator<unknown, void, undefined>}
 */
export async function* readNdjson(response) {
  if (!response.body) return
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
  let buffer = ''
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += value
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) if (line.trim()) yield JSON.parse(line)
    }
    if (buffer.trim()) yield JSON.parse(buffer)
  } finally {
    reader.releaseLock()
  }
}
