/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthState {
  dataUser: any;
  checkLogin: boolean;
  token: string;
  dataOrder: any;
  infoUser: any
}

// Define the initial state using that type
const initialState: AuthState = {
  dataUser: null,
  checkLogin: false,
  token: '',
  dataOrder: [],
  infoUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    saveIsLogin: (state, action) => {
      state.checkLogin = action.payload;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    saveDataOrder: (state, action) => {
      state.dataOrder = action.payload;
    },
    saveInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
    clearStateLogin: () => initialState,
  },
});
export const { saveDataUser, saveIsLogin, saveToken, clearStateLogin, saveDataOrder, saveInfoUser } =
  authSlice.actions;

export default authSlice.reducer;
