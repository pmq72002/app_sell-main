/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import ViewContainer from '../../Components/ViewContainer';
import colors from '../../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ApiUrl, PATH_API } from '../../constants/apiUrl';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Octicons from 'react-native-vector-icons/Octicons';
const RegisterScreen: React.FC = () => {


  const navigation: any = useNavigation();

  const [showPass, setShowPass] = useState(false);
  const [showREPass, setShowRePass] = useState(false);

  const [openChooseDate, setOpenChooseDate] = useState(false);


  const [info, setInfo] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    address: '',
    phone: '',
    gender: 1,
  });


  function checkValue() {
    if (info.username === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tên tài khoản');
      return false;
    }
    if (info.email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email');
      return false;
    }
    if (info.password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
      return false;
    }
    if (info.phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
      return false;
    }
    if (info.rePassword !== info.password) {
      Alert.alert('Thông báo', 'Vui lòng kiểm tra lại mật khẩu xác nhận');
      return false;
    }
    return true;
  }

  async function _submit() {
    if (checkValue()) {

      let body = {
        username: info.username,
        email: info.email,
        password: info.password,
        address: info.address,
        phone: info.phone,
        gender: info.gender,
      };

      axios.post(`${ApiUrl}${PATH_API.REGISTER}`, {
        ...body,
        role_id: 3,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then((res) => {
        console.log(res);

        let dataRespone = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        if (dataRespone.success) {
          Alert.alert('Thông báo', 'Đăng ký thành công', [
            { text: 'Xác  nhận', onPress: () => navigation.goBack() },
          ]);
        } else {
          Alert.alert('Thông báo', dataRespone?.message, [
            { text: 'Xác  nhận', onPress: () => console.log('OK Pressed') },
          ]);
        }

      }).catch((err) => {
        console.log(err);

        Alert.alert('Thông báo', 'Đã xảy ra lỗi vui lòng liên hệ quản trị viên', [
          { text: 'Xác  nhận', onPress: () => console.log('OK Pressed') },
        ]);
      });
    }

  }

  function goBack() {
    navigation.goBack();
  }

  function handleChangeInfo(val: any) {
    setInfo((pre) => ({
      ...pre,
      ...val,
    }));
  }

  return (
    <ViewContainer>
      <KeyboardAvoidingView style={{ flex: 1, zIndex: 2, paddingHorizontal: 10, backgroundColor: colors.white }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: 150, height: 100 }}
              source={{
                uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
              }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 12,
                color: '#041E42',
              }}
            >
              Register to your Account
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={css.viewInputStyle}
            >
              <Ionicons
                name="ios-person"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                value={info.username}
                onChangeText={(text) => handleChangeInfo({ username: text })}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập họ và tên ..."
              />
            </View>

            <View style={{ marginTop: 25, marginBottom: -10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giới tính</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Pressable onPress={() => handleChangeInfo({ gender: 1 })} style={{ flexDirection: 'row' }}>
                  <Octicons name={info.gender === 1 ? 'dot-fill' : 'dot'} size={30} color={colors.secondMain} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Nam</Text>
                </Pressable>
                <Pressable onPress={() => handleChangeInfo({ gender: 2 })} style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <Octicons name={info.gender === 2 ? 'dot-fill' : 'dot'} size={30} color={colors.secondMain} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Nữ</Text>
                </Pressable>
              </View>
            </View>

            <View
              style={css.viewInputStyle}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />

              <TextInput
                value={info.email}
                onChangeText={(text) => handleChangeInfo({ email: text })}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập Email ..."
              />
            </View>
          </View>

          <View
            style={css.viewInputStyle}
          >
            <Entypo
              style={{ marginLeft: 8 }}
              name="address"
              size={24}
              color="gray"
            />

            <TextInput
              value={info.address}
              onChangeText={(text) => handleChangeInfo({ address: text })}
              style={css.textInputStyle}
              placeholder="Vui lòng nhập địa chỉ ..."
            />
          </View>

          <View
            style={css.viewInputStyle}
          >
            <Entypo
              style={{ marginLeft: 8 }}
              name="phone"
              size={24}
              color="gray"
            />

            <TextInput
              value={info.phone}
              onChangeText={(text) => handleChangeInfo({ phone: text })}
              style={css.textInputStyle}
              keyboardType={'phone-pad'}
              placeholder="Vui lòng nhập số điện thoại ..."
            />
          </View>


          <View>
            <View
              style={[css.viewInputStyle, { paddingRight: 30 }]}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={info.password}
                onChangeText={(text) => handleChangeInfo({ password: text })}
                secureTextEntry={!showPass}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập mật khẩu ..."
              />

              <Pressable onPress={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10 }}>
                <Entypo name={showPass ? 'eye' : 'eye-with-line'} size={24} color={colors.gray} />
              </Pressable>
            </View>
          </View>


          <View>
            <View
              style={[css.viewInputStyle, { paddingRight: 30 }]}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={info.rePassword}
                onChangeText={(text) => handleChangeInfo({ rePassword: text })}
                secureTextEntry={!showREPass}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập xác nhận mật khẩu ..."
              />

              <Pressable onPress={() => setShowRePass(!showREPass)} style={{ position: 'absolute', right: 10 }}>
                <Entypo name={showREPass ? 'eye' : 'eye-with-line'} size={24} color={colors.gray} />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: '#007FFF', fontWeight: '500' }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 80 }} />

          <Pressable
            onPress={_submit}
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Đăng ký
            </Text>
          </Pressable>

          <Pressable
            onPress={goBack}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </ScrollView>

      </KeyboardAvoidingView>

      {openChooseDate && <DatePicker
        modal
        open={openChooseDate}
        date={new Date(info.date)}
        onConfirm={(date) => {
          setOpenChooseDate(false);
          handleChangeInfo({ date: moment(date) });
        }}
        onCancel={() => {
          setOpenChooseDate(false);
        }}
      />}
    </ViewContainer>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 40,
    marginTop: 20,
    width: '80%',
    paddingHorizontal: 15,
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
    width: '80%',
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

export default RegisterScreen;
