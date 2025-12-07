/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CartState {
  dataCard: any
}

// Define the initial state using that type
const initialState: CartState = {
  dataCard: [],
};

export const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveDataCart: (state, action) => {
      state.dataCard = action.payload;
    },
    clearStateCart: () => initialState,
  },
});

export const { saveDataCart, clearStateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
