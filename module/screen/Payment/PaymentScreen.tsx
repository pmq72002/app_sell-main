/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { clearStateCart } from '../Cart/CartState';
import ViewCofnirm from './Components/ViewComfirm';
import moment from 'moment';
import { saveDataOrder } from '../Login/LoginState';
import { formatNumberToMoney } from '../../util/numbers';
import { apiPayment } from './PaymentApi';
import { Linking } from 'react-native';
import PopChooseProvince from '../../Components/PopChooseProvince';
import PopChooseDistrict from '../../Components/PopChooseDistrict';
import PopChooseWard from '../../Components/PopChooseWard';
import { ApiUrl_Image } from '../../constants/apiUrl';

const DATA_TRANFE = [
  {
    id: 1,
    name: 'Giao hàng nhanh',
    price: 10000,
  },
  {
    id: 2,
    name: 'Giao hàng tiết kiệm',
    price: 999999,
  },
];


const DATA_PAYMENT = [
  {
    id: 1,
    name: 'COD',
    key: 'COD',
  },
  {
    id: 2,
    name: 'VNPAY',
    key: 'VNPay',
  },
];

const PaymentScreen: React.FC = ({ route }) => {
  const dispatch = useAppDispatch();

  const navigation: any = useNavigation();

  const dataCart = route.params.cart;

  const [loading, setLoading] = useState(false);

  const { dataOrder, dataUser } = useAppSelector((state) => state.auth);

  const [itemPaymentSelect, setItemPaymentSelect] = useState(DATA_PAYMENT[0]);

  const [popSubmit, setPopSubmit] = useState(false);

  const [address, setAddress] = useState('');

  const [firstmame, setFirstName] = useState('');

  const [lastname, setLastname] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [note, setNote] = useState('');

  const [ward, setWard] = useState(null);

  const [province, setProvince] = useState(null);

  const [district, setDistrict] = useState(null);

  const [popProvince, setPopProvince] = useState(false);
  const [popDistrict, setPopDistrict] = useState(false);
  const [popWard, setPopWard] = useState(false);


  const total = dataCart.reduce((val: number, e: any) => {
    let product = e?.product;
    if (product) {
      let totalPrice = parseFloat(e?.total_payment || '0')  + val
      return totalPrice;
    }
    return val;
  }, 0);



  function handelSubmitPayment() {
    setPopSubmit(true);
  }


  function handleCheck() {
    if (firstmame === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ người nhập giao hàng.');
      return false;
    }

    if (lastname === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tên người nhập giao hàng.');
      return false;
    }

    if (email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email giao hàng.');
      return false;
    }

    if (phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại giao hàng.');
      return false;
    }

    if (!province) {
      Alert.alert('Thông báo', 'Vui lòng chọn tỉnh/thành phố giao hàng.');
      return false;
    }

    if (!district) {
      Alert.alert('Thông báo', 'Vui lòng chọn quận/huyện giao hàng.');
      return false;
    }

    if (!ward) {
      Alert.alert('Thông báo', 'Vui lòng chọn xã/phường giao hàng.');
      return false;
    }

    if (address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ giao hàng.');
      return false;
    }
    return true;
  }

  async function handleSubmitOrder() {
    if (!handleCheck()) {
      return true;
    }



    try {
      let productArray: any = [];
      dataCart.map((itemCart: any) => {
        productArray.push(itemCart.id);
      });

      let body = {
        firstmame,
        lastname,
        address,
        phone,
        email,
        note,
        wardid: ward?.wardid || null,
        provinceid: province?.provinceid || null,
        cityid: district?.districtid || null,
        user_id: dataUser.id,
        tienship: 35000,
        payment_type: itemPaymentSelect.id,
        cart: productArray,
      };
      setLoading(true);
      let res = await dispatch(apiPayment(body));
      setLoading(false);
      if (res.payload) {
        if (itemPaymentSelect.id === 1) {
          setPopSubmit(false);
          ToastAndroid.showWithGravityAndOffset(
            'Thanh toán thành công',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          navigation.navigate('Home');
        } else {
          if (res.payload.data) {
            Linking.openURL(res.payload.data);
            navigation.navigate('Home');
          }
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Thanh toán thất bại!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Đã xảy ra lỗi vui lòng liên hệ quản trị viên!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  return (
    <ViewContainer>
      <View style={{ backgroundColor: colors.secondMain, height: 80, alignItems: 'center', zIndex: 2, borderBottomLeftRadius: 50, borderBottomRightRadius: 70, justifyContent: 'center', position: 'absolute', top: 0, width: '100%' }} >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.white }}>Thanh toán</Text>
        <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10 }}>
          <AntDesign name="arrowleft" size={20} color={colors.white} />
        </Pressable>
      </View>
      <View style={{ flex: 1, paddingTop: 90, backgroundColor: colors.placeholder_light2 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {dataCart.map((item: any) => {
              let product = item?.product;
              console.log(ApiUrl_Image + product.image );
              
              if (product) {
                return (
                  <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginHorizontal: 10 }}>
                    <View style={{ height: 100, width: 100, backgroundColor: colors.placeholder_light2, borderRadius: 10, padding: 5 }}>
                      <Image source={{ uri: ApiUrl_Image + product.image }} style={{ width: '100%', resizeMode: 'contain', height: '100%' }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700' }}>{product?.name || ''}</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }}>
                          <Text style={{ fontWeight: '600', fontSize: 14, color: colors.secondMain }}>{item?.quantity}</Text>
                          <Text>x</Text>
                          <Text style={{ fontWeight: '600', fontSize: 14, color: colors.secondMain }}>{formatNumberToMoney(product?.price || 0)}</Text>
                        </View>
                        <View>
                          <Text style={{ fontWeight: 'bold', color: colors.secondMain, fontSize: 15 }}>{formatNumberToMoney(item.quantity * (product?.price || 0))}</Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }}>
                          <Text style={{ fontSize: 14, color: colors.error }}>Giảm giá: {formatNumberToMoney(parseFloat(item?.discount))}đ</Text>
                        </View>
                        <View>
                          <Text style={{ fontWeight: 'bold', color: colors.secondMain, fontSize: 15 }}>{formatNumberToMoney(parseFloat(item.quantity) * parseFloat(item.total_payment))}đ</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }
              return null;
            })}
          </View>


          <View style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: colors.white, borderRadius: 10, padding: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', color: colors.black, fontSize: 16 }}>Thông tin giao hàng</Text>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Họ người nhận <Text style={{ color: colors.error }}>*</Text></Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ fontSize: 14, padding: 0 }}
                placeholder="Vui lòng nhập họ người nhận hàng.."
                value={firstmame}
                onChangeText={(val: string) => setFirstName(val)}
              />
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Tên người nhận <Text style={{ color: colors.error }}>*</Text></Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ fontSize: 14, padding: 0 }}
                placeholder="Vui lòng nhập tên người nhận hàng..."
                value={lastname}
                onChangeText={(val: string) => setLastname(val)}
              />
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Email <Text style={{ color: colors.error }}>*</Text></Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ fontSize: 14, padding: 0 }}
                placeholder="Vui lòng nhập email người nhận hàng..."
                value={email}
                onChangeText={(val: string) => setEmail(val)}
              />
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Số diện thoại <Text style={{ color: colors.error }}>*</Text></Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ fontSize: 14, padding: 0 }}
                placeholder="Vui lòng nhập số điện thoại người nhận hàng..."
                value={phone}
                onChangeText={(val: string) => setPhone(val)}
              />
            </View>


            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Tỉnh/thành phố <Text style={{ color: colors.error }}>*</Text></Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <Pressable onPress={() => setPopProvince(true)}>
                <Text style={{ fontSize: 14, color: province && colors.black }}>{province?.name || 'Chọn tỉnh/thành phố'}</Text>
              </Pressable>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <View style={{ width: '49%' }}>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: province && colors.black }}>Quận/huyện <Text style={{ color: colors.error }}>*</Text></Text>
                </View>
                <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
                  <Pressable onPress={() => setPopDistrict(true)}>
                    <Text style={{ fontSize: 14, color: district && colors.black }}>{district?.name || 'Chọn quận/huyện'}</Text>
                  </Pressable>
                </View>
              </View>

              <View style={{ width: '2%' }} />

              <View style={{ width: '49%' }}>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Phường/xã <Text style={{ color: colors.error }}>*</Text></Text>
                </View>
                <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
                  <Pressable onPress={() => setPopWard(true)}>
                    <Text style={{ fontSize: 14, color: ward && colors.black }}>{ward?.name || 'Chọn xã/phường'}</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Địa chỉ vận chuyển <Text style={{ color: colors.error }}>*</Text></Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ fontSize: 14, padding: 0 }}
                placeholder="Vui lòng nhập địa chỉ người nhận hàng..."
                value={address}
                onChangeText={(val: string) => setAddress(val)}
              />
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Ghi chú</Text>
            </View>
            <View style={{ height: 40, borderRadius: 10, marginTop: 2, borderWidth: 1, borderColor: colors.placeholder_light2, justifyContent: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ fontSize: 14, padding: 0 }}
                placeholder="Nhập ghi chú"
                value={note}
                onChangeText={(val: string) => setNote(val)}
              />
            </View>
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Hình thức thanh toán</Text>
            </View>
            <View>
              {DATA_PAYMENT.map((itemPayment) => {
                return (
                  <TouchableOpacity onPress={() => setItemPaymentSelect(itemPayment)} style={{
                    marginBottom: 10, backgroundColor: colors.white, shadowColor: '#000000',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 5.62,
                    elevation: 4,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 15, color: itemPayment.id === itemPaymentSelect.id ? colors.green : colors.black }}>{itemPayment.name}</Text>
                    </View>

                    {itemPayment.id === itemPaymentSelect.id && <View style={{ position: 'absolute', right: 10, top: 10 }}>
                      <Fontisto name="radio-btn-active" color={colors.green} size={20} />
                    </View>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Tiền ship</Text>
              <Text style={{ fontSize: 16, color: colors.secondMain, fontWeight: 'bold' }}>{formatNumberToMoney(35000)}đ</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={handelSubmitPayment} style={{ margin: 10, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: colors.secondMain, borderRadius: 10, flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.white }}>Thanh toán</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.white }}>
            {formatNumberToMoney(total + 35000)}đ
          </Text>
        </TouchableOpacity>

      </View>
      {popSubmit && <ViewCofnirm loading={loading} closed={() => setPopSubmit(false)} submit={handleSubmitOrder} />}
      {popProvince && <PopChooseProvince closed={() => setPopProvince(false)} visible={popProvince} onChoose={(item) => {
        setPopProvince(false);
        if (item.id === -1) {
          setProvince(null);
          return;
        }
        setProvince(item);
        setDistrict(null);
        setWard(null);
      }} />}

      {popDistrict && <PopChooseDistrict province={province} closed={() => setPopDistrict(false)} visible={popDistrict} onChoose={(item) => {
        setPopDistrict(false);
        if (item.id === -1) {
          setDistrict(null);
          return;
        }
        setDistrict(item);
        setWard(null);
      }} />}

      {popWard && <PopChooseWard district={district} closed={() => setPopWard(false)} visible={popWard} onChoose={(item) => {
        setPopWard(false);
        if (item.id === -1) {
          setWard(null);
          return;
        }
        setWard(item);
      }} />}
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  viewInfo: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    elevation: 4,
    margin: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  viewTextInfo: {
    flexDirection: 'row',
  },
});

export default PaymentScreen;
