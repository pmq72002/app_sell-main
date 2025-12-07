/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import ViewContainer from './ViewContainer';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from 'react-native';
import colors from '../styles/colors';
import InputView from './InputView';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import axios from 'axios';
import {ApiUrl, api_url} from '../constants/apiUrl';
import {saveDataUser} from '../screen/Login/LoginState';

function EditProfileCompany({closed}) {
  const user = useAppSelector(state => state.auth.dataUser);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState({
    namecompany: user.namecompany,
    phonecompany: user.phonecompany,
    location: user.location,
    websitecompany: user.websitecompany,
    introduce: user.introduce,
    slogan: user.slogan,
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  function submitChangeProfile() {
    setLoading(true);
    axios
      .put(ApiUrl + api_url.UPDATE_PROFILE_COMPANY, info, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resPonse => {
        setLoading(false);
        if (resPonse.data.success) {
          let resData = {
            ...user,
            ...resPonse.data.data,
            username: resPonse.data.data.namecompany,
            phonenumber: resPonse.data.data.phonecompany,
          };
          dispatch(saveDataUser(resData));
          closed();
          ToastAndroid.showWithGravityAndOffset(
            'Cập nhật tài khoản thành công',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50,
          );
        }
      })
      .catch(error => {
        setLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          error.response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50,
        );
      });
  }

  return (
    <ViewContainer>
      <View
        style={{
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>
          Edit profile
        </Text>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1, marginHorizontal: 10}}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputView
            title="Tên công ty"
            placeholder="Nhập tên công ty..."
            value={info.namecompany}
            onChange={async valName =>
              setInfo((prev: any) => ({
                ...prev,
                namecompany: valName,
              }))
            }
          />

          <InputView
            title="Số điện thoại"
            placeholder="Nhập số điện thoại ..."
            phone={true}
            value={info.phonecompany}
            onChange={async valPhone =>
              setInfo((prev: any) => ({
                ...prev,
                phonecompany: valPhone,
              }))
            }
          />

          <InputView
            title="Địa chỉ"
            placeholder="Nhập địa chỉ ..."
            value={info.location}
            onChange={async valLocation =>
              setInfo((prev: any) => ({
                ...prev,
                location: valLocation,
              }))
            }
          />

          <InputView
            title="Giới thiệu"
            placeholder="Nhập giới thiệu ..."
            value={info.introduce}
            onChange={async valIntroduce =>
              setInfo((prev: any) => ({
                ...prev,
                introduce: valIntroduce,
              }))
            }
          />

          <InputView
            title="Tên miền"
            placeholder="Nhập tên miền..."
            value={info.websitecompany}
            onChange={async valWebsite =>
              setInfo((prev: any) => ({
                ...prev,
                websitecompany: valWebsite,
              }))
            }
          />

          <InputView
            title="Slogan"
            placeholder="Nhập Slogan..."
            value={info.slogan}
            onChange={async valSlogan =>
              setInfo((prev: any) => ({
                ...prev,
                slogan: valSlogan,
              }))
            }
          />

          {info.namecompany !== '' && info.phonecompany !== '' ? (
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
                  // submitChangePass();
                  submitChangeProfile();
                }
              }}>
              {loading ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: colors.white, marginRight: 15}}>
                    Đang xử lý
                  </Text>
                  <ActivityIndicator color={colors.white} />
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: colors.white,
                  }}>
                  Cập nhật
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
                Cập nhật
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <View>
        <Text>Xuân</Text>
      </View> */}
    </ViewContainer>
  );
}

export default EditProfileCompany;
