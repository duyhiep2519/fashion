import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ducks/productSlice";
import userReducer from "./ducks/userSlice";
import cartReducer from "./ducks/cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
