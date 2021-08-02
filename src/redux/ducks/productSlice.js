import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    list: null,
    error: "",
  },
  reducers: {
    getProductByPage: (state, action) => {
      state.list = action.payload.result;
    },
    getProductByPageFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getProductByPage, getProductByPageFail } = productSlice.actions;

export default productSlice.reducer;
