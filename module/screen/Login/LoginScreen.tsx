/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Pressable,
  ToastAndroid,
} from 'react-native';
import ViewContainer from '../../Components/ViewContainer';
import colors from '../../styles/colors';
import {useAppDispatch} from '../../redux/hook';
import {handleLogin} from './LoginApi';
import {TypeLogin} from '../../util/TypeLogin';
import {ScrollView} from 'react-native';
import {clearStateLogin, saveDataUser, saveIsLogin} from './LoginState';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ApiUrl, PATH_API} from '../../constants/apiUrl';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncKey} from '../../util/AsyncKey';
import {apiForgetPassword} from '../User/UserApi';
import PopAddEmail from '../../Components/PopAddEmail';

const AUTO_LOGOUT_TIME = 15 * 60 * 1000; // 15 phút
const startAutoLogout = (dispatch: any) => {
  // Lưu thời gian login vào AsyncStorage
  AsyncStorage.setItem('loginTime', Date.now().toString());

  // Timeout tự động logout
  setTimeout(async () => {
    await AsyncStorage.removeItem('USER'); // xóa user info
    dispatch(clearStateLogin());
    ToastAndroid.show('Phiên đăng nhập đã hết hạn.', ToastAndroid.LONG);
  }, AUTO_LOGOUT_TIME);
};

const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPass, setShowPass] = useState(true);

  const [popForget, setPopForget] = useState(false);

  const [userForget, setUserForget] = useState(null);

  const [step, setStep] = useState(1);

  function checkValue() {
    if (email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email');
      return false;
    }
    if (password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
      return false;
    }
    return true;
  }

  async function _submit() {
    if (checkValue()) {
      axios
        .post(ApiUrl + PATH_API.LOGIN, {
          email: email,
          password: password,
        })
        .then(res => {
          console.log(res);

          if (res.data.success) {
            dispatch(saveDataUser(res.data.user));
            dispatch(saveIsLogin(true));

            AsyncStorage.setItem(AsyncKey.USER, JSON.stringify(res.data.user));

            startAutoLogout(dispatch);

            ToastAndroid.showWithGravityAndOffset(
              'Đăng nhập thành công.',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            navigation.goBack();
          } else {
          }
        })
        .catch((err: any) => {
          let respoonse: any = err.response;
          if (respoonse.status === 401) {
            Alert.alert('Thông báo', respoonse.data.message, [
              {text: 'Xác  nhận', onPress: () => console.log('OK Pressed')},
            ]);
          }
        });
    }

    // dispatch(saveIsLogin(true));
  }

  function goRegister() {
    navigation.navigate('Register');
  }

  function goBack() {
    navigation.goBack();
  }

  return (
    <ViewContainer>
      <Pressable
        onPress={goBack}
        style={{position: 'absolute', left: 10, top: 10, zIndex: 3}}>
        <AntDesign name="left" size={20} color={colors.black} />
      </Pressable>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          zIndex: 2,
          paddingHorizontal: 10,
          backgroundColor: colors.white,
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: 150, height: 100}}
              source={{
                uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
              }}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 12,
                color: '#041E42',
              }}>
              Đăng nhập
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <View style={css.viewInputStyle}>
              <MaterialIcons
                style={{marginLeft: 8}}
                name="email"
                size={24}
                color="gray"
              />

              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập Email..."
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View style={css.viewInputStyle}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{marginLeft: 8}}
              />

              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={showPass}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập mật khẩu ..."
              />

              <Pressable
                onPress={() => setShowPass(!showPass)}
                style={{position: 'absolute', right: 10}}>
                <Entypo
                  name={showPass ? 'eye' : 'eye-with-line'}
                  size={24}
                  color={colors.gray}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={() => setPopForget(true)}
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>Keep me logged in</Text>

            <Text style={{color: '#007FFF', fontWeight: '500'}}>
              Quên mật khẩu
            </Text>
          </Pressable>

          <View style={{marginTop: 80}} />

          <Pressable
            onPress={_submit}
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Đăng nhập
            </Text>
          </Pressable>

          <Pressable onPress={goRegister} style={{marginTop: 15}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Bạn chưa có tài khoản? Đăng ký
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {popForget && (
        <PopAddEmail
          dataUser={userForget}
          onSetep={val => setStep(val)}
          step={step}
          onSetUser={val => {
            setUserForget(val);
          }}
          visible={popForget}
          closed={() => setPopForget(false)}
        />
      )}
    </ViewContainer>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInputStyle: {
    color: 'gray',
    flex: 1,
    fontSize: 16,
  },
  viewInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
    paddingRight: 10,
  },
  viewImage: {
    alignItems: 'center',
  },
  btnLogin: {
    height: 47,
    marginTop: 20,
    width: '95%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    marginTop: 20,
    borderWidth: 0.7,
    borderColor: colors.dark,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLogin: {
    height: 45,
    // marginTop: 20,
    marginTop: 5,
    borderWidth: 0.7,
    borderColor: colors.placeholder,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wInput: {
    width: Dimensions.get('window').width * 0.8 - 50,
    color: colors.black,
    fontWeight: '600',
  },
  icPhone: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  logo: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width / 5,
    marginTop: 35,
    marginBottom: 20,
  },
  view_type_login: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
  },

  view_button_type_active: {
    backgroundColor: colors.orange,
    borderWidth: 1,
    borderColor: colors.orange,
    paddingVertical: 10,
    width: '47%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  view_button_type_unactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.placeholder,
    paddingVertical: 10,
    width: '47%',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text_button_active: {
    color: colors.white,
    fontWeight: 'bold',
  },

  text_button_unactive: {
    color: colors.gray,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
