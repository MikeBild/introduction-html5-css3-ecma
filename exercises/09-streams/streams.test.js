// @ts-check
import { describe, expect, it } from 'vitest'
import { readNdjson } from './solution/ndjson.js'

const encoder = new TextEncoder()

/** @param {string[]} chunks */
const responseFrom = (chunks) =>
  new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(encoder.encode(chunk))
        controller.close()
      },
    }),
  )

/** @param {AsyncIterable<unknown>} items */
const collect = async (items) => {
  const result = []
  for await (const item of items) result.push(item)
  return result
}

describe('NDJSON aus einem Stream lesen', () => {
  it('liefert ein Objekt je Zeile, auch wenn Zeilen über Chunks verteilt sind', async () => {
    const response = responseFrom(['{"id":"p-ham', 'mer"}\n{"id":', '"p-zange"}\n'])
    expect(await collect(readNdjson(response))).toEqual([{ id: 'p-hammer' }, { id: 'p-zange' }])
  })

  it('liest die letzte Zeile auch ohne Zeilenumbruch und überspringt Leerzeilen', async () => {
    const response = responseFrom(['{"id":"p-bits"}\n\n', '{"id":"p-akku"}'])
    expect(await collect(readNdjson(response))).toEqual([{ id: 'p-bits' }, { id: 'p-akku' }])
  })

  it('liefert das erste Objekt, bevor der Stream fertig ist', async () => {
    /** @type {TransformStream<Uint8Array, Uint8Array>} */
    const pipe = new TransformStream()
    const writer = pipe.writable.getWriter()
    const items = readNdjson(new Response(pipe.readable))
    void writer.write(encoder.encode('{"id":"p-hammer"}\n'))
    const tooLate = new Promise((resolve) => setTimeout(() => resolve('zu spät'), 300))
    const first = await Promise.race([items.next(), tooLate])
    expect(first).toEqual({ value: { id: 'p-hammer' }, done: false })
    void writer.close()
    await items.return(undefined)
  })
})
