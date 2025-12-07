/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl, PATH_API, api_url } from '../../constants/apiUrl';
import {
  saveDataUser,
  saveIsLogin,
  saveListMajor,
  saveListSchool,
  saveToken,
  saveTypeApp,
} from './LoginState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncKey } from '../../util/AsyncKey';
import { ToastAndroid } from 'react-native';
import { TypeLogin } from '../../util/TypeLogin';

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (formData: { data: any, saveLogin: boolean }, thunkApi) => {
    axios
      .post(ApiUrl + PATH_API.LOGIN, formData.data, {
        headers: { 'Content-type': 'application/json' },
      })
      .then(async (resp_http: any) => {
        console.log(resp_http);

        // if (resp_http.data.status) {
        //   const resData = resp_http.data;
        //   const dataRequest = resData.data;



        //   ToastAndroid.showWithGravityAndOffset(
        //     'Đăng nhập thành công',
        //     ToastAndroid.LONG,
        //     ToastAndroid.TOP,
        //     25,
        //     50,
        //   );
        // }
      })
      .catch((erorr: any) => {
        ToastAndroid.showWithGravityAndOffset(
          'Đã xảy ra lỗi!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50,
        );
      });
  },
);

