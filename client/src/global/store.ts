import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../global/features/cart/cartSlice";
import productReducer from "../global/features/products/productSlice";
import authReducer from "../global/features/auth/authSlice";

import api from "./apiSlice";

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
      auth: authReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required for redux-persist
      }).concat(api.middleware),
  });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
