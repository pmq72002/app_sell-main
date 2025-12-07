/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { Alert, Dimensions, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import Entypo from 'react-native-vector-icons/Entypo';
import { apiUpdatePassword } from './UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearStateLogin } from '../Login/LoginState';

const UpdatePasswork: React.FC = () => {

  const dispatch = useAppDispatch();

  const { dataUser } = useAppSelector((state) => state.auth);

  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');

  const [showOlPass, setShowOlPass] = useState(false);

  const [newPassword, setNewPassword] = useState('');

  const [showNewPass, setShowNewPass] = useState(false);

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors.secondMain);
    }
  }, [isFocus]);


  function goBack() {
    navigation.goBack();
  }

  async function handleUpdatePassword() {
    if (oldPassword === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu cũ');
      return false;
    }
    if (newPassword === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu mới');
      return false;
    }

    let res = await dispatch(apiUpdatePassword({
      id: dataUser.id,
      old_password: oldPassword,
      new_password: newPassword,
    }));

    if (res.payload) {
      Alert.alert('Thông báo', 'Đổi mật khẩu thành công, vui lòng đăng nhập lại.', [
        {
          text: 'OK', onPress: () => {
            AsyncStorage.clear();
            dispatch(clearStateLogin());
            goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Thông báo', 'Thay đổi mật khẩu thất bại vui lòng kiểm tra lại.');
    }
  }

  return (
    <ViewContainer>
      <View
        style={{
          backgroundColor: colors.secondMain,
          height: 80,
          alignItems: 'center',
          zIndex: 1,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 70,
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          width: '100%',
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.white }}>
          Hổ trợ
        </Text>

        <Pressable onPress={goBack} style={{ position: 'absolute', left: 10 }}>
          <AntDesign name="arrowleft" size={20} color={colors.white} />
        </Pressable>
      </View>

      <View style={{ flex: 1, paddingTop: 90, backgroundColor: colors.placeholder_light2, paddingHorizontal: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                secureTextEntry={!showOlPass}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập mật khẩu cũ ..."
              />

              <Pressable onPress={() => setShowOlPass(!showOlPass)} style={{ position: 'absolute', right: 10 }}>
                <Entypo name={showOlPass ? 'eye' : 'eye-with-line'} size={24} color={colors.gray} />
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
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={!showNewPass}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập mật khẩu mới..."
              />

              <Pressable onPress={() => setShowNewPass(!showNewPass)} style={{ position: 'absolute', right: 10 }}>
                <Entypo name={showNewPass ? 'eye' : 'eye-with-line'} size={24} color={colors.gray} />
              </Pressable>
            </View>
          </View>


          <Pressable
            onPress={handleUpdatePassword}
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              marginTop: 20,
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
              Cập nhật mật khẩu
            </Text>
          </Pressable>
        </ScrollView>
      </View>
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


export default UpdatePasswork;
