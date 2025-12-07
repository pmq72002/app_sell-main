/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { apiDeleteProductInCart, apiGetUserCart, apiUpdateCart } from './CartApi';
import { formatNumberToMoney } from '../../util/numbers';
import { ApiUrl_Image } from '../../constants/apiUrl';

const CartScreen: React.FC = () => {

  const dispatch = useAppDispatch();

  const isFocus = useIsFocused();

  // const { dataCard } = useAppSelector((state) => state.cart);

  const { dataUser } = useAppSelector((state) => state.auth);

  const [dataCart, setDataCart] = useState([]);

  const [loading, setLoading] = useState(false);


  const [infoCart, setInfoCart] = useState(null);

  const navigation: any = useNavigation();

  useEffect(() => {
    if (isFocus) {
      handleGetUseCart();
    }
  }, [isFocus]);

  async function handleGetUseCart() {
    setLoading(true);
    let res = await dispatch(apiGetUserCart(dataUser.id));
    setLoading(false);
    if (res.payload) {
      setDataCart(res?.payload || []);
    }
  }

  const total = dataCart.reduce((val, e: any) => {
    let product = e?.product;
    if (product) {
      let totalPrice = val + parseFloat(e?.total_payment || '0') ;
      return totalPrice;
    }
    return val;
  }, 0);




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


  async function handleUpdateCart(itemProduct: any, quantity: number, type: string) {
    if (type !== 'delete') {
      let res = await dispatch(apiUpdateCart({
        product_id: itemProduct.id,
        quantity: 1,
        user_id: dataUser.id,
        type: type === 'add' ? 1 : 2,
      }));
      if (res.payload) {
        handleGetUseCart();
        ToastAndroid.showWithGravityAndOffset(
          type === 'add' ? 'Thêm số lượng sản phẩm thành công!' : 'Trừ số lượng sản phẩm thành công!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Cập nhật sản phẩm thất bại',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } else {
      let res = await dispatch(apiDeleteProductInCart({
        product_id: itemProduct.id,
        user_id: dataUser.id,
      }));
      if (res.payload) {
        handleGetUseCart();
        ToastAndroid.showWithGravityAndOffset(
          'Xóa sản phẩm thành công',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Xóa sản phẩm thất bại',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }

  }


  return (
    <ViewContainer>
      <StatusBar backgroundColor={colors.secondMain} barStyle={'light-content'} />
      <View style={{ backgroundColor: colors.secondMain, height: 80, alignItems: 'center', zIndex: 1, borderBottomLeftRadius: 50, borderBottomRightRadius: 70, justifyContent: 'center', position: 'absolute', top: 0, width: '100%' }} >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.white }}>Giỏ hàng</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.placeholder_light2, padding: 10, paddingTop: 90 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: colors.placeholder_light2 }}>
          {loading && <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <ActivityIndicator size={'small'} color={colors.secondMain} />
          </View>}
          {dataCart.map((item: any) => {
            let product = item?.product;
            if (product) {
              return (
                <View style={styles.itemProduct}>
                  <View style={{ height: 100, width: 125, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleUpdateCart(product, item.quantity, 'delete')} style={{ marginRight: 5 }}>
                      <AntDesign name="delete" color={colors.error} size={18} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: colors.placeholder_light2, borderRadius: 10 }}>
                      <Image source={{ uri: ApiUrl_Image + product.image }} style={{ width: 100, resizeMode: 'contain', height: 100 }} />
                    </View>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{product?.name || ''}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }}>
                        <TouchableOpacity onPress={() => {
                          if (item.quantity === 1) {
                            handleUpdateCart(product, item.quantity, 'delete');
                          } else {
                            handleUpdateCart(product, item.quantity, 'minus');
                          }
                        }} style={{ width: 30, alignItems: 'flex-start' }}>
                          <AntDesign name="minussquareo" size={24} color={colors.black} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '600', fontSize: 14, color: colors.secondMain }}>{item?.quantity}</Text>
                        <TouchableOpacity onPress={() => handleUpdateCart(product, item.quantity, 'add')} style={{ width: 30, alignItems: 'flex-end' }}>
                          <AntDesign name="plussquareo" size={24} color={colors.black} />
                        </TouchableOpacity>
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
        </ScrollView>
      </View>
      <View style={{ backgroundColor: colors.white, padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.secondMain }}>Tồng tiền: {formatNumberToMoney(total)}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Payment', {
          cart: dataCart,
        })} style={{ backgroundColor: colors.secondMain, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 15 }}>
          <Text style={{ fontWeight: 'bold', color: colors.white, fontSize: 15 }}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  itemProduct: {
    backgroundColor: colors.white, paddingHorizontal: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 15,
  },
});

export default CartScreen;
