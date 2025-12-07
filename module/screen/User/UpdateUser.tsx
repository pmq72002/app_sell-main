/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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
  ToastAndroid,
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
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { apiGetProfileUser, apiUpdateInfoUser } from './UserApi';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UpdateUser: React.FC = () => {

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [popChooseDate, setPopChooseDate] = useState(false)

  const { dataUser } = useAppSelector(state => state.auth);

  console.log(dataUser);
  

  const [info, setInfo] = useState(dataUser);


  async function handlGetUserInfo() {
    let res = await dispatch(apiGetProfileUser(dataUser.id));
    if (res.payload) {
      let resData = res.payload;
      setInfo(resData);
    } else {
      return null;
    }
  }

  useEffect(() => {
    handlGetUserInfo();
  }, []);

  function handleChangeInfo(val: any) {
    setInfo((pre: any) => ({
      ...pre,
      ...val,
    }));
  }

  function goBack() {
    navigation.goBack();
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

  async function handleUpdateUser() {
    if (info.phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại.');
      return;
    }

    if (info.address === '') {
      Alert.alert('Thông báo', 'Vui lòng địa chỉ.');
      return;
    }

    if (!info?.username || info?.username === '') {
      Alert.alert('Thông báo', 'Vui lòng tên người dùng.');
      return;
    }

    if (!info?.birthday) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày sinh nhật.');
      return;
    }
    
    const res = await dispatch(apiUpdateInfoUser({
      data: {
        gender: info.gender,
        phone: info.phone,
        address: info.address,
        username: info.username,
        birthday: info.birthday.format('YYYY-MM-DD'),
      },
      id: dataUser.id,
    }));

    if(res.payload){
       ToastAndroid.showWithGravityAndOffset(
                  'Cập nhật thành công',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
                navigation.goBack()
    }

  }

  return (
    <ViewContainer>
      <View style={{ backgroundColor: colors.secondMain, height: 80, alignItems: 'center', zIndex: 2, borderBottomLeftRadius: 50, borderBottomRightRadius: 70, justifyContent: 'center', position: 'absolute', top: 0, width: '100%' }} >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.white }}>Cập nhật tài khoản</Text>
        <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10 }}>
          <AntDesign name="arrowleft" size={20} color={colors.white} />
        </Pressable>
      </View>
      <KeyboardAvoidingView style={{ flex: 1, zIndex: 1, paddingHorizontal: 10, backgroundColor: colors.white, justifyContent: 'center', paddingTop: 80 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            <View style={{ marginVertical: 10 }}>
              {ItemInfo('Họ & tên', dataUser?.username || '')}
              {ItemInfo('Email', dataUser?.email || '')}
            </View>


            <View
              style={css.viewInputStyle}
            >
              <Entypo
                style={{ marginLeft: 8 }}
                name="user"
                size={24}
                color="gray"
              />

              <TextInput
                value={info?.username || ''}
                onChangeText={(text) => handleChangeInfo({ username: text })}
                style={css.textInputStyle}
                placeholder="Vui lòng nhập tên người dùng ..."
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

          <View
            style={css.viewInputStyle}
          >
            <FontAwesome
              style={{ marginLeft: 8 }}
              name="birthday-cake"
              size={24}
              color="gray"
            />

            <Pressable
              onPress={() => setPopChooseDate(true)}
              style={css.textInputStyle}
            >
              <Text style={{ fontSize: 14 }}>{info?.birthday ? moment(info?.birthday).format('DD/MM/YYYY') : 'Vui lòng chọn ngày sinh'}</Text>
            </Pressable>
          </View>




          <View style={{ marginTop: 80 }} />

          <Pressable
            onPress={handleUpdateUser}
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
              Cập nhật
            </Text>
          </Pressable>

        </ScrollView>

      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={popChooseDate}
        mode="date"
        maximumDate={new Date(2001, 0, 1)}
        date={info?.birthday ? new Date(info?.birthday) : new Date()}
        onConfirm={(date) => {
          setPopChooseDate(false)
          setInfo((pre: any) => ({
            ...pre,
            birthday: moment(date)
          }))
        }}
        onCancel={() => {
          setPopChooseDate(false)
        }}
      />

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
    paddingVertical: 15,
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

export default UpdateUser;
