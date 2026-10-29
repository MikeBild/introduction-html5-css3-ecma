// @ts-check
// TODO: per import aus 'shop/cart.js' laden statt über ein globales Objekt.
import { addItem, totalCents } from './lib/cart.js'
import { formatCents, products } from '../../shop.js'

const [hammer, zange] = products
if (hammer && zange) {
  const cart = addItem(addItem([], hammer, 2), zange)
  const output = document.querySelector('#total')
  if (output) output.textContent = formatCents(totalCents(cart))
}
