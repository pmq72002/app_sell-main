/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
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
  Dimensions,
} from 'react-native';
import colors from '../styles/colors';
import InputView from './InputView';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import axios from 'axios';
import {ApiUrl, api_url} from '../constants/apiUrl';
import {saveDataUser} from '../screen/Login/LoginState';
import ReactNativeModal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';
import ChooseSchool from './ChooseSchool';
import ChooseMajor from './ChooseMajor';

function EditProfile({closed}) {
  const user = useAppSelector(state => state.auth.dataUser);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState({
    studentname: user.studentname,
    studentphone: user.studentphone,
    address: user?.address ? user?.address : '',
    code: user?.code ? user?.code : '',
    gender: user.gender,
    major: user?.major ? user?.major : '',
    school: user.school,
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  function submitChangeProfile() {
    setLoading(true);
    axios
      .put(ApiUrl + api_url.UPDATE_PROFILE, info, {
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
            username: resPonse.data.data.studentname,
            phonenumber: resPonse.data.data.studentphone,
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

  const [modal, setModal] = useState({
    school: false,
    major: false,
  });

  const listSchool = useAppSelector(state => state.auth.listSchool);
  const listMajor = useAppSelector(state => state.auth.listMajor);
  // const refChooseSchool: any = useRef();
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
            title="Họ và tên"
            placeholder="Nhập họ và tên ..."
            value={info.studentname}
            onChange={async valName =>
              setInfo((prev: any) => ({
                ...prev,
                studentname: valName,
              }))
            }
          />

          <InputView
            title="Số điện thoại"
            placeholder="Nhập số điện thoại ..."
            phone={true}
            value={info.studentphone}
            onChange={async valPhone =>
              setInfo((prev: any) => ({
                ...prev,
                studentphone: valPhone,
              }))
            }
          />

          <InputView
            title="Địa chỉ"
            placeholder="Nhập địa chỉ ..."
            value={info.address}
            onChange={async valAddress =>
              setInfo((prev: any) => ({
                ...prev,
                address: valAddress,
              }))
            }
          />

          <InputView
            title="Mã sinh viên"
            placeholder="Nhập mã sinh viên ..."
            value={info.code}
            onChange={async valCode =>
              setInfo((prev: any) => ({
                ...prev,
                code: valCode,
              }))
            }
          />

          <InputView
            title="Giới tính"
            placeholder="Nhập giới tính..."
            value={info.gender}
            onChange={async valGender =>
              setInfo((prev: any) => ({
                ...prev,
                gender: valGender,
              }))
            }
          />

          <InputView
            title="Ngành"
            onPressButton={() => {
              setModal({
                ...modal,
                major: true,
              });
            }}
            noEidt={true}
            placeholder="Nhấp chọn ngành"
            value={info.major}
            onChange={async valMajor =>
              setInfo((prev: any) => ({
                ...prev,
                major: valMajor,
              }))
            }
          />

          <InputView
            title="Tên trường"
            // onPress={() => {
            //   console.log('Dô đây kh');
            // }}
            onPressButton={() => {
              setModal({
                ...modal,
                school: true,
              });
            }}
            placeholder="Nhấp chọn trường"
            noEidt={true}
            value={info.school}
            onChange={async valSchool =>
              setInfo((prev: any) => ({
                ...prev,
                school: valSchool,
              }))
            }
          />

          {info.studentname !== '' && info.studentphone !== '' ? (
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
      {/* <RBSheet
        ref={refChooseSchool}
        closeOnPressMask={true}
        minClosingHeight={200}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        // height={450}
        customStyles={{
          container: {
            height: Dimensions.get('screen').height * 0.8,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: colors.white,
          },
        }}>

      </RBSheet> */}
      {modal.school && (
        <ReactNativeModal isVisible={modal.school}>
          <View
            style={{
              width: Dimensions.get('screen').width * 0.91,
              height: Dimensions.get('screen').height * 0.91,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                height: '70%',
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  setModal({
                    ...modal,
                    school: false,
                  })
                }
                style={{
                  // justifyContent: 'flex-end',
                  // alignItems: 'flex-end',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: colors.error,
                  }}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <ChooseSchool
                list={listSchool}
                onPress={(item: any) => {
                  // refChooseSchool.current.close();
                  setInfo((prev: any) => ({
                    ...prev,
                    school: item.nameschool,
                  }));
                  setModal({
                    ...modal,
                    school: false,
                  });
                }}
              />
            </View>
          </View>
        </ReactNativeModal>
      )}

      {modal.major && (
        <ReactNativeModal isVisible={modal.major}>
          <View
            style={{
              width: Dimensions.get('screen').width * 0.91,
              height: Dimensions.get('screen').height * 0.91,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                height: '70%',
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  setModal({
                    ...modal,
                    major: false,
                  })
                }
                style={{
                  // justifyContent: 'flex-end',
                  // alignItems: 'flex-end',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: colors.error,
                  }}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <ChooseMajor
                list={listMajor}
                onPress={(item: any) => {
                  // refChooseSchool.current.close();
                  setInfo((prev: any) => ({
                    ...prev,
                    major: item.namemajor,
                  }));
                  setModal({
                    ...modal,
                    major: false,
                  });
                }}
              />
            </View>
          </View>
        </ReactNativeModal>
      )}
      {/* <View>
        <Text>Xuân</Text>
      </View> */}
    </ViewContainer>
  );
}

export default EditProfile;
