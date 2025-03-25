import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //   console.log("ADD TO CART PAYLOAD:", action.payload); // Log the payload
    //   const { id, quantity } = action.payload;
    //   const existingItem = state.items.find((item) => item.id === id);

    //   if (existingItem) {
    //     existingItem.quantity += quantity; // ✅ Just increase quantity
    //   } else {
    //     state.items.push({ ...action.payload, quantity });
    //   }
    // },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        // If item exists, increase quantity
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // If item doesn't exist, add it
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // ✅ Decrease correctly
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1; // ✅ Only increase, no removal
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
