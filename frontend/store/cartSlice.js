import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: {},
    pending: [],
  },

  reducers: {

    add(state, action) {
      const id = action.payload;

      state.items[id] = (state.items[id] || 0) + 1;

      state.pending.push({ type: "add", product_id: id });
    },

    update(state, action) {
      const { id, qty } = action.payload;

      state.items[id] = qty;

      state.pending.push({
        type: "update",
        product_id: id,
        quantity: qty,
      });
    },

    remove(state, action) {
      delete state.items[action.payload];

      state.pending.push({
        type: "remove",
        product_id: action.payload,
      });
    },

    loadCart(state, action) {
      state.items = {};

      action.payload.items?.forEach(item => {
        state.items[item.product_id] = item.quantity;
      });
    }

  },
});

export const { add, update, remove, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
