import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage for web
import cartReducer from "../lib/features/cart/cartSlice";
import productReducer from "../lib/features/products/productSlice";
import api from "./api/apiSlice";

// Define persist config
const persistConfig = {
  key: "cart",
  storage, // Uses localStorage
};

// Wrap only the cart reducer with persist
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Create store function (to be used in StoreProvider)
export const makeStore = () =>
  configureStore({
    reducer: {
      cart: persistedCartReducer,
      products: productReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required for redux-persist
      }).concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
