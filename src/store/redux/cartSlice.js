import { createSlice} from '@reduxjs/toolkit';

const initialState ={
  items:[],
  taxRate:0.0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingIndex = state.items.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += item.quantity ?? 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity ?? 1 });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((i) => i.id === id);
      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
    setTaxRate(state, action) {
      state.taxRate = action.payload;
    },
    replaceCart(state, action) {
      state.items = action.payload.items ?? [];
      if (typeof action.payload.taxRate === 'number') {
        state.taxRate = action.payload.taxRate;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, setTaxRate, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;
