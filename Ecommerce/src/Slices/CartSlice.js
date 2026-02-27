
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: []
  },
  reducers: {

    
    addToCart: (state, action) => {
      const existItem = state.cart.find(
        item => item.id === action.payload.id
      )

      if (existItem) {
        existItem.quantity += 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },

   
    incrementQty: (state, action) => {
      const item = state.cart.find(
        item => item.id === action.payload
      )

      if (item) {
        item.quantity += 1
      }
    },

    
    decrementQty: (state, action) => {
      const item = state.cart.find(
        item => item.id === action.payload
      )

      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
   
        state.cart = state.cart.filter(
          item => item.id !== action.payload
        )
      }
    },

   
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        item => item.id !== action.payload
      )
    },

   
    clearCart: (state) => {
      state.cart = []
    }

  }
})

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer