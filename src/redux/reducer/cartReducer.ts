import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cart } from "../../types/Cart";
import { Product } from '../../types/Product';
const cart: string[] = []
const initialState = {
  cartItems: []
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state:any, action:PayloadAction<any>) => {
      const itemInCart = state.cartItems.find((item:any) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({ ...action.payload,  quantity: 1 });
      }
    },
    incrementQuantity: (state:any, action) => {
      const item = state.cart.find((item:any) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state:any, action) => {
      const item = state.cart.find((item:any) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state:any, action) => {
      const removeItem = state.cart.filter((item:any) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
export default cartReducer

function JSONStringify(payload: any) {
  throw new Error('Function not implemented.');
}
