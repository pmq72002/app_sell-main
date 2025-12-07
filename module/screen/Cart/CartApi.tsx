/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl, PATH_API } from '../../constants/apiUrl';

export const apiAddProductToCart = createAsyncThunk(
  'cart/apiAddProductToCart',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.post(ApiUrl + PATH_API.ADD_TO_CART, data, {
        headers: { 'Content-type': 'application/json' },
      });
      if (res.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
);


export const apiUpdateCart = createAsyncThunk(
  'cart/apiUpdateCart',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.post(ApiUrl + PATH_API.UPDATE_CART, data, {
        headers: { 'Content-type': 'application/json' },
      });
      if (res.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
);

export const apiDeleteProductInCart = createAsyncThunk(
  'cart/apiDeleteProductInCart',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.post(ApiUrl + PATH_API.REMOVE_PRODUCT_CART, data, {
        headers: { 'Content-type': 'application/json' },
      });
      if (res.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
);



export const apiGetUserCart = createAsyncThunk(
  'cart/apiGetUserCart',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.USER_CART + `/${data}`, {
        headers: { 'Content-type': 'application/json' },
        params: {},
      });
      console.log(res);

      if (res.data.success) {
        return res.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
);
