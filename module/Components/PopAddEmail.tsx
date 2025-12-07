/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, TextInput, ToastAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import { useAppDispatch } from '../redux/hook';
import { handleGetMenuCategories } from '../screen/Home/HomeApi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { apiAcceptChangePassword, apiAcceptCode, apiForgetPassword } from '../screen/User/UserApi';

interface Props {
  visible: boolean;
  closed: () => void;
  onSetUser: (data: any) => void;
  step: number;
  onSetep: (value: any) => void;
  dataUser: any
}

const PopAddEmail: React.FC<Props> = ({ visible, closed, onSetUser, step, onSetep, dataUser }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const [code, setCode] = useState('');

  const [newPass, setNewPass] = useState('');



  async function handleForgetPassword() {
    if (email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email.');
      return true;
    }
    setLoading(true);
    let res = await dispatch(apiForgetPassword({
      email,
    }));
    setLoading(false);
    if (res.payload) {
      onSetUser(res.payload);
      onSetep(2);
      setCode('');
    } else {
      Alert.alert('Thông báo', 'Email không tồn tại vui lòng kiểm tra lại.');
      return true;
    }
  }

  async function handleAcceptCode() {
    if (code === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập code.');
      return true;
    }
    try {
      setLoading(true);
      let res = await dispatch(apiAcceptCode({
        id: dataUser?.id,
        code: code,
      }));
      setLoading(false);
      if (res.payload) {
        onSetep(3);
      } else {
        Alert.alert('Thông báo', 'Mã code không đúng.');
        return true;
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Thông báo', 'Đã xãy ra lỗi.');
      return true;
    }

  }

  async function handleAcceptChangePass() {
    if (code === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập code.');
      return true;
    }
    try {
      setLoading(true);
      let res = await dispatch(apiAcceptChangePassword({
        id: dataUser?.id,
        new_password: newPass,
      }));

      setLoading(false);
      if (res.payload) {
        closed();
        ToastAndroid.showWithGravityAndOffset(
          'Đặt lại mật khẩu thành công',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        Alert.alert('Thông báo', 'Đổi mật khẩu thất bại.');
        return true;
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Thông báo', 'Đã xãy ra lỗi.');
      return true;
    }

  }

  function handleBackStep() {
    if (step === 1) {
      closed();
    } else {
      onSetep(step - 1);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.black, opacity: 0.6, zIndex: 1 },
        ]}
      />

      <View style={styles.body}>
        <View
          style={{
            width: '100%',
            height: 120,
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1, width: '100%', marginBottom: 10 }}>
            <View style={{ borderWidth: 1, borderColor: colors.placeholder_light, height: 40, justifyContent: 'center', borderRadius: 10, paddingLeft: 10 }}>
              {step === 1 ? <TextInput
                value={email}
                onChangeText={(val) => setEmail(val)}
                style={{ fontSize: 14, color: colors.black, paddingRight: 20 }}
                placeholder="Nhập email ..."
              /> : step === 2 ? <TextInput
                value={code}
                onChangeText={(val) => setCode(val)}
                style={{ fontSize: 14, color: colors.black, paddingRight: 20 }}
                placeholder="Nhập mã code ..."
              /> : <TextInput
                value={newPass}
                onChangeText={(val) => setNewPass(val)}
                style={{ fontSize: 14, color: colors.black, paddingRight: 20 }}
                placeholder="Nhập mật khẩu ..."
              />}
            </View>
          </KeyboardAvoidingView>
          <View style={{ flexDirection: 'row' }}>
            <Pressable disabled={loading} onPress={handleBackStep} style={styles.viewTouchableClose}>
              {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>{step !== 1 ? 'Trờ lại' : 'Hủy'}</Text>}
            </Pressable>
            <Pressable disabled={loading} onPress={() => {
              if (step === 1) {
                handleForgetPassword();
              } else if (step === 2) {
                handleAcceptCode();
              } else {
                handleAcceptChangePass();
              }
            }} style={styles.viewTouchable}>
              {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>Xác nhận</Text>}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    zIndex: 4,
  },
  body: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  viewTouchable: {
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholder_light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 100,
    backgroundColor: colors.secondMain,
    borderRadius: 10,
  },
  viewTouchableClose: {
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholder_light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 100,
    backgroundColor: colors.error,
    borderRadius: 10,
    marginRight: 20,
  },
  viewTouchableNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default PopAddEmail;
