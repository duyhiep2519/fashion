import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    wishlist: null,
    error: "",
  },
  reducers: {
    getCartByUserFail: (state, action) => {
      state.error = action.payload;
    },
    getCartByUser: (state, action) => {
      state.cart = action.payload;
    },
    getWishlistByUser: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCartByUser, getCartByUserFail, getWishlistByUser } =
  cartSlice.actions;

export default cartSlice.reducer;
