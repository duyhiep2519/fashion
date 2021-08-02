import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    error: "",
  },
  reducers: {
    getCartByUserFail: (state, action) => {
      state.error = action.payload;
    },
    getCartByUser: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCartByUser, getCartByUserFail } = cartSlice.actions;

export default cartSlice.reducer;
