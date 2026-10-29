// Vite liefert Dateien mit ?raw als Text. Nur die Tests nutzen das, der Browser-Code nicht.
declare module '*?raw' {
  const content: string
  export default content
}

// Trusted Types fehlen noch in den DOM-Typen von TypeScript. Minimal das, was Übung 18 nutzt.
interface TrustedHTML {
  readonly __brand: 'TrustedHTML'
  toString(): string
}

interface TrustedTypePolicy {
  readonly name: string
  createHTML(input: string): TrustedHTML
}

interface TrustedTypePolicyFactory {
  createPolicy(name: string, rules: { createHTML?: (input: string) => string }): TrustedTypePolicy
  isHTML(value: unknown): value is TrustedHTML
}

interface Window {
  trustedTypes?: TrustedTypePolicyFactory
}
