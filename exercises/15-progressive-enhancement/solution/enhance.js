// @ts-check

/**
 * Verbessert ein funktionierendes Formular: Mit JavaScript geht die Bestellung per fetch raus
 * und die Seite bleibt stehen. Fällt das Netz aus, übernimmt der normale Submit des Browsers.
 * @param {HTMLFormElement} form
 * @param {typeof fetch} [fetchFn]
 * @returns {() => void} entfernt die Verbesserung wieder
 */
export const enhanceForm = (form, fetchFn = fetch) => {
  const status = form.querySelector('output')

  /** @param {SubmitEvent} event */
  const onSubmit = async (event) => {
    event.preventDefault()
    const button = form.querySelector('button[type="submit"]')
    button?.setAttribute('disabled', '')
    try {
      const response = await fetchFn(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { accept: 'application/json' },
      })
      if (!response.ok) {
        if (status) status.textContent = 'Die Bestellung ist nicht angekommen. Prüf deine Angaben und versuch es noch einmal.'
        return
      }
      const order = await response.json()
      if (status) status.textContent = `Danke, deine Bestellung ${order.id} ist eingegangen.`
      form.reset()
    } catch {
      // Netzfehler: auf den Weg ohne JavaScript zurückfallen
      form.submit()
    } finally {
      button?.removeAttribute('disabled')
    }
  }

  form.addEventListener('submit', onSubmit)
  return () => form.removeEventListener('submit', onSubmit)
}
