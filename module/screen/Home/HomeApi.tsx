/* eslint-disable prettier/prettier */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiUrl, PATH_API} from '../../constants/apiUrl';
import {AsyncKey} from '../../util/AsyncKey';
import {ToastAndroid} from 'react-native';
import {TypeLogin} from '../../util/TypeLogin';

export const handleGetCategories = createAsyncThunk(
  'home/handleGetCategories',
  async (data, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.CATEGORIES, {
        headers: {'Content-type': 'application/json'},
      });
      if (res.data.success) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
);

export const handleGetMenuCategories = createAsyncThunk(
  'home/handleGetMenuCategories',
  async (data, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.MENU_CATEGORIES, {
        headers: {'Content-type': 'application/json'},
      });
      if (res.data.success) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
);

export const handleGetProductByCategories = createAsyncThunk(
  'home/handleGetProductByCategories',
  async (data: number, thunkApi) => {
    try {
      let res = await axios.get(
        ApiUrl + PATH_API.PRODUCT_IN_CATEGORIES + `/${data}`,
        {
          headers: {'Content-type': 'application/json'},
          params: {
            limit: 100,
          },
        },
      );
      console.log(res);
      if (res.data.success) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
);

export const handleGetProductAll = createAsyncThunk(
  'home/handleGetProductAll',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.PRODUCT, {
        headers: {'Content-type': 'application/json'},
        params: data,
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

export const apiGetProductSale = createAsyncThunk(
  'home/apiGetProductSale',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.ALL_PRODUCT_DISCOUNT, {
        headers: {'Content-type': 'application/json'},
        params: data,
      });
      console.log(res);
      if (res.data.success) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);

      return null;
    }
  },
);

export const apiGetProductById = createAsyncThunk(
  'home/apiGetProductById',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.DETAIL_PRODUCT + `/${data}`, {
        headers: {'Content-type': 'application/json'},
        params: {},
      });
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

export const apiGetCommentWithProduct = createAsyncThunk(
  'home/apiGetCommentWithProduct',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(
        ApiUrl + PATH_API.GET_COMMENT_WITH_PRODUCT + `/${data}`,
        {
          headers: {'Content-type': 'application/json'},
          params: {},
        },
      );
      console.log(res);

      // if (res.data.success) {
      //   return res.data.data;
      // } else {
      //   return null;
      // }
    } catch (error) {
      console.log(error);

      return null;
    }
  },
);

export const apiGetProvinces = createAsyncThunk(
  'home/apiGetProvinces',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.GET_PROVINCE, {
        headers: {'Content-type': 'application/json'},
        params: {},
      });
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

export const apiGetDistrict = createAsyncThunk(
  'home/apiGetDistrict',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.GET_DISTRICT + `/${data}`, {
        headers: {'Content-type': 'application/json'},
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

export const apiGetWard = createAsyncThunk(
  'home/apiGetWard',
  async (data: any, thunkApi) => {
    try {
      let res = await axios.get(ApiUrl + PATH_API.GET_WARD + `/${data}`, {
        headers: {'Content-type': 'application/json'},
        params: {},
      });
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
