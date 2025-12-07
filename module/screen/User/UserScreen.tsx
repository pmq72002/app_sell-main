/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useRef, useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { Alert, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { apiGetProfileApplicant, apiGetProfileUser, apiLoadAttributesApplicant, apiUpdateProfileApplicant, uploadPDF } from './UserApi';
import colors from '../../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { clearStateLogin, saveDataUser, saveInfoUser } from '../Login/LoginState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const { dataUser, infoUser } = useAppSelector(state => state.auth);

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors.secondMain);
    }
  }, [isFocus]);

  // async function handleGetInfoUser() {
  //   let res = await dispatch(apiGetProfileUser(dataUser.id));
  //   if (res.payload) {
  //     dispatch(saveDataUser({ ...res.payload }));
  //   }
  // }

  function goLogin() {
    navigation.navigate('Login');
  }

  if (!dataUser) {
    return (
      <ViewContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.black }}>Vui lòng đăng nhập để sử dụng chức năng!</Text>
          <TouchableOpacity onPress={goLogin} style={{ backgroundColor: colors.secondMain, paddingVertical: 7, borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', color: colors.white, fontSize: 16 }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    );
  }

  const ItemInfo = (key: string, value: string) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 2 }}>
        <View style={{ width: 100 }}>
          <Text style={{ fontSize: 15, color: colors.black }}>{key}</Text>
        </View>
        <View style={{ flex: 1, flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 15, color: colors.secondMain, fontWeight: 'bold' }}>{value}</Text>
        </View>
      </View>
    );
  };

  function handleLogOut() {
    AsyncStorage.clear();
    dispatch(clearStateLogin());
  }


  function handleGoToOrder() {
    navigation.navigate('Order');
  }

  function handleGoToUpdate() {
    navigation.navigate('UpdateUser');
  }


  function handleGoToChangePassword() {
    navigation.navigate('ChangePass');
  }

  return (
    <ViewContainer>
      <StatusBar backgroundColor={colors.secondMain} barStyle={'light-content'} />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: colors.secondMain, height: 120, alignItems: 'center', zIndex: 1, borderBottomLeftRadius: 50, borderBottomRightRadius: 70 }} />
          <View style={{ zIndex: 2, alignItems: 'center', justifyContent: 'center', marginTop: -65 }}>
            <View style={{ width: 120, height: 120, backgroundColor: colors.placeholder_light2, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} >
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.black }}>{dataUser.username.substring(0, 1)}</Text>
            </View>
          </View>

          <View style={[css.shadow, css.viewInfoUser]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Thông tin cá nhân</Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              {ItemInfo('Họ & tên', dataUser?.username || '')}
              {ItemInfo('Email', dataUser?.email || '')}
              {ItemInfo('Số diện thoại', dataUser?.phone || '')}
              {ItemInfo('Địa chỉ', dataUser?.address || '')}
            </View>
          </View>

          <TouchableOpacity onPress={handleGoToOrder} style={[css.shadow, css.viewInfoUser, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Lịch sử đơn hàng</Text>
            <AntDesign name="right" size={16} color={colors.black} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoToUpdate} style={[css.shadow, css.viewInfoUser, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Cập nhật tài khoản</Text>
            <AntDesign name="right" size={16} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoToChangePassword} style={[css.shadow, css.viewInfoUser, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Đổi mật khẩu</Text>
            <AntDesign name="right" size={16} color={colors.black} />
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity onPress={handleLogOut} style={{ backgroundColor: colors.secondMain, paddingVertical: 7, margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.white }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
};

const css = StyleSheet.create({
  viewShow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.placeholder_light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewInfoUser: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default UserScreen;
