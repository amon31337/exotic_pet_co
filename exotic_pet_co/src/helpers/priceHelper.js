

export function computeTotals(subtotal, {
  taxRate = 0.0725,           // 7.25% example
  freeShipThreshold = 200,    // free shipping at/over $200
  shippingFlat = 9.99
} = {}) {
  const shipping = subtotal > 0 && subtotal < freeShipThreshold ? shippingFlat : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping;
  return { taxRate, shipping, tax, total };
}
