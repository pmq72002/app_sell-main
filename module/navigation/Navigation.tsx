/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import LoginStack from './LoginStack';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncKey } from '../util/AsyncKey';
import { saveDataUser, saveIsLogin, saveToken, saveTypeApp } from '../screen/Login/LoginState';
import RootStack from './RootStack';

const Navigation: React.FC = () => {
  const checkLogin = useAppSelector((state) => state.auth.checkLogin);

  const dispatch = useAppDispatch();


  async function checkAsyncStore() {
    let user: any = await AsyncStorage.getItem(AsyncKey.USER);
    if (user) {
      dispatch(saveDataUser(JSON.parse(user)));
      dispatch(saveIsLogin(true));
    }
  }

  useEffect(() => {
    checkAsyncStore();
  }, []);



  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
