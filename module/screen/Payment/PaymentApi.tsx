import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl, PATH_API } from '../../constants/apiUrl';

export const apiPayment = createAsyncThunk(
  'payment/apiPayment',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.post(ApiUrl + PATH_API.ORDER_CART, data, {
        headers: { 'Content-type': 'application/json' },
      });
      console.log(res);

      if (res.data.success) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
);
