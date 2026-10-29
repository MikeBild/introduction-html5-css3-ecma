// @ts-check

/**
 * TODO: Formular verbessern statt ersetzen – submit abfangen, FormData per fetch an
 * form.action schicken, Ergebnis im output anzeigen, bei Netzfehler form.submit() aufrufen.
 * @param {HTMLFormElement} form
 * @param {typeof fetch} [fetchFn]
 * @returns {() => void} entfernt die Verbesserung wieder
 */
export const enhanceForm = (form, fetchFn = fetch) => {
  void form
  void fetchFn
  return () => {}
}
