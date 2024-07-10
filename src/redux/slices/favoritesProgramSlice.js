// slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
export const favoritesProgramSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id && item.title == newItem.id && newItem.title
      );
      if (!existingItem) {
        state.cart.push(newItem);
      }
    },
    removeItem(state, action) {
      const removItem = action.payload;
      state.cart = state.cart.filter(
        (item) => item.id && item.title !== removItem.id && removItem.title
      );
    },
  },
});

export const { addItem, removeItem } = favoritesProgramSlice.actions;

export default favoritesProgramSlice.reducer;
