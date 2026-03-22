import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { cartApi } from "./cartApi";
import { cartMiddleware } from "./cartMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});
