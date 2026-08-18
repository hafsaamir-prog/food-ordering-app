export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
export const selectTaxRate = (state) => state.cart.taxRate;
export const selectTaxAmount = (state) => selectCartTotal(state) * (selectTaxRate(state) || 0);
