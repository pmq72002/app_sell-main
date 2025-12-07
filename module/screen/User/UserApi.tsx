import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl, PATH_API, api_url } from '../../constants/apiUrl';
import { ToastAndroid } from 'react-native';

export const apiGetProfileUser = createAsyncThunk(
  'auth/apiGetProfileUser',
  async (data: any, thunkApi) => {
    try {
      const res = await axios.get(ApiUrl + PATH_API.INFO_USER + `/${data}`, {
        params: {},
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(res);

      if (res.data.success) {
        let resData = res.data.data;
        return resData;
        // thunkApi.dispatch(saveListJob(resData?.latest_jobs || []));
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);

export const apiGetOrderUser = createAsyncThunk(
  'auth/apiGetOrderUser',
  async (formData: { id: number; data: any }, thunkApi) => {
    try {
      const res = await axios.get(
        ApiUrl + PATH_API.GET_ORDER_BY_USER + `/${formData.id}`,
        {
          params: formData.data,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (res.data.success) {
        let resData = res.data.data;
        return resData;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);

export const apiUpdatePassword = createAsyncThunk(
  'auth/apiGetOrderUser',
  async (data: any, thunkApi) => {
    try {
      const res = await axios.post(ApiUrl + PATH_API.UPDATE_PASSWORD, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log(res);

      if (res.data.success) {
        return true;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);

export const apiForgetPassword = createAsyncThunk(
  'auth/apiForgetPassword',
  async (data: any, thunkApi) => {
    try {
      const res = await axios.post(ApiUrl + PATH_API.FORGET_PASSWORD, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (res.data.success) {
        return res.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);

export const apiAcceptCode = createAsyncThunk(
  'auth/apiAcceptCode',
  async (data: any, thunkApi) => {
    try {
      const res = await axios.post(ApiUrl + PATH_API.ACCEPT_CODE, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (res.data.success) {
        return res.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);

export const apiAcceptChangePassword = createAsyncThunk(
  'auth/apiAcceptChangePassword',
  async (data: any, thunkApi) => {
    try {
      const res = await axios.post(
        ApiUrl + PATH_API.ACCEPT_CHANGE_PASSWORD,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (res.data.success) {
        return true;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);

export const apiUpdateInfoUser = createAsyncThunk(
  'auth/apiUpdateInfoUser',
  async (formData: { data: any; id: number }, thunkApi) => {
    try {
      const res = await axios.post(
        ApiUrl + PATH_API.UPDATE_USER + `/${formData.id}`,
        formData.data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (res.data.success) {
        return true;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error);

      return null;
    }
  },
);



export const apiDetailOrder = createAsyncThunk(
  'order/apiDetailOrder',
  async (data, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.DETAIL_ORDER + `/${data}`, {
        headers: { 'Content-type': 'application/json' },
        params: {},
      });
      console.log(res);

      if (res.data.success) {
        return res.data.data
      } else {
        return null
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
);


export const apiUpdateStautus = createAsyncThunk(
  'order/apiUpdateStautus',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.post(ApiUrl + PATH_API.UPDATE_STATUS_ORDER, data, {
        headers: { 'Content-type': 'application/json' },
        params: {},
      });
      if (res.data.success) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
);
