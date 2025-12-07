/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import InputView from './InputView';
import HeaderView from './HeaderView';
import colors from '../styles/colors';
import axios from 'axios';
import {ApiUrl, api_url} from '../constants/apiUrl';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncKey} from '../util/AsyncKey';
import {clearStateLogin, saveToken} from '../screen/Login/LoginState';

function ViewChangePassWord() {
  const user = useAppSelector(state => state.auth.dataUser);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState({
    oldPass: '',
    newPass: '',
    cfmPass: '',
  });

  function checkValue() {
    if (info.newPass !== info.cfmPass) {
      Alert.alert(
        'Thông báo',
        'Mật khẩu xác nhận không trùng khớp. Vui lòng kiểm tra lại!',
      );
      return false;
    }
    return true;
  }

  const [loading, setLoading] = useState(false);

  function submitChangePass() {
    if (checkValue()) {
      setLoading(true);
      axios
        .post(ApiUrl + api_url.CHANGEPASS, info, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async res => {
          setLoading(false);
          if (res.data.success) {
            AsyncStorage.removeItem(AsyncKey.TOKEN);
            AsyncStorage.removeItem(AsyncKey.USER);
            dispatch(clearStateLogin());
            ToastAndroid.showWithGravityAndOffset(
              'Đổi mật khẩu thành công',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50,
            );
          } else {
            setLoading(false);
            ToastAndroid.showWithGravityAndOffset(
              res.data.message,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50,
            );
          }
        })
        .catch(error => {
          Alert.alert('Thông báo', error.response.data.message);
          setLoading(false);
        });
    }
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>
          Change Password
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 15}}>
            <InputView
              title="Mật khẩu cũ"
              value={info.oldPass}
              onChange={async val =>
                setInfo((prev: any) => ({
                  ...prev,
                  oldPass: val,
                }))
              }
              secureText={true}
              placeholder="Nhập mật khẩu cũ ..."
            />
          </View>

          <View style={{marginHorizontal: 15}}>
            <InputView
              title="Mật khẩu mới"
              value={info.newPass}
              onChange={async val =>
                setInfo((prev: any) => ({
                  ...prev,
                  newPass: val,
                }))
              }
              secureText={true}
              placeholder="Nhập mật khẩu mới ..."
            />
          </View>

          <View style={{marginHorizontal: 15}}>
            <InputView
              title="Xác nhận lại mật khẩu"
              value={info.cfmPass}
              onChange={async val =>
                setInfo((prev: any) => ({
                  ...prev,
                  cfmPass: val,
                }))
              }
              secureText={true}
              placeholder="Nhập lại mật khẩu mới ..."
            />
          </View>
          {info.cfmPass !== '' && info.newPass !== '' && info.oldPass !== '' ? (
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                backgroundColor: colors.yellow,
                paddingVertical: 10,
                marginVertical: 7,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (loading === false) {
                  submitChangePass();
                }
              }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: colors.white,
                  }}>
                  Đổi mật khẩu
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginHorizontal: 15,
                backgroundColor: colors.placeholder,
                paddingVertical: 10,
                marginVertical: 7,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 15, fontWeight: '700', color: colors.white}}>
                Đổi mật khẩu
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default ViewChangePassWord;
