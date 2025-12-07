/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ViewContainer from '../../Components/ViewContainer';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {apiGetCommentWithProduct, apiGetProductById} from './HomeApi';
import {formatNumberToMoney} from '../../util/numbers';
import {apiAddProductToCart} from '../Cart/CartApi';
import RenderHtml from 'react-native-render-html';
import {ApiUrl_Image} from '../../constants/apiUrl';

const DetailItem = ({route, navigation}: {route: any; navigation: any}) => {
  const dispatch = useAppDispatch();

  let {dataCard} = useAppSelector(state => state.cart);

  const {dataUser} = useAppSelector(state => state.auth);

  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState<any>(null);

  let idItem = route.params.id;

  console.log('Dô đây kh', idItem);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (idItem) {
      handleGetProductById();
      handleGetCommentProduct();
    } else {
      navigation.goBack();
    }
  }, []);

  async function handleGetCommentProduct() {
    let res = await dispatch(apiGetCommentWithProduct(idItem));
    console.log(res);
  }

  async function handleGetProductById() {
    let res = await dispatch(apiGetProductById(idItem));
    if (res.payload) {
      setItem(res.payload);
    }
  }

  function handleGoLogin() {
    navigation.navigate('Login');
  }

  async function handleAddCart() {
    if (!dataUser) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập để thêm vào giỏ hàng.', [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Đăng nhập', onPress: () => handleGoLogin()},
      ]);
      return;
    } else {
      try {
        setLoading(true);
        let res = await dispatch(
          apiAddProductToCart({
            product_id: idItem,
            quantity: quantity,
            user_id: dataUser.id,
          }),
        );
        console.log(res);

        setLoading(false);
        if (res.payload) {
          ToastAndroid.showWithGravityAndOffset(
            'Thêm vào giỏ hàng thành công!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          setQuantity(1);
        }
      } catch (error) {
        ToastAndroid.showWithGravityAndOffset(
          'Đã xảy ra lỗi, vui lòng liên hệ quản trị viên!',
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', left: 10}}>
          <AntDesign name="arrowleft" size={20} color={colors.black} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.black}}>
          Chi tiết sản phẩm
        </Text>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              height: Dimensions.get('screen').height * 0.4,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.placeholder_light2,
              borderRadius: 10,
            }}>
            {item?.image && (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                resizeMode="stretch"
                source={{uri: ApiUrl_Image + item?.image}}
              />
            )}

            <View
              style={{position: 'absolute', bottom: 10, flexDirection: 'row'}}>
              <Octicons name="dot-fill" color={colors.black} size={16} />
              <Octicons
                name="dot-fill"
                style={{marginHorizontal: 10}}
                color={colors.gray}
                size={16}
              />
              <Octicons name="dot-fill" color={colors.gray} size={16} />
            </View>
          </View>

          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <View>
              <Text
                style={{fontSize: 16, fontWeight: '600', color: colors.black}}>
                {item?.name || ''}{' '}
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.dark,
                    fontStyle: 'italic',
                  }}>
                  ({item?.category_product?.name || ''})
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <View style={{marginRight: 10}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.secondMain,
                  }}>
                  {formatNumberToMoney(item?.price || 0)}đ
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 20, marginVertical: 10}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.placeholder_light,
                paddingBottom: 5,
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Chi tiết sản phẩm
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: colors.placeholder_light,
                paddingBottom: 5,
                marginBottom: 10,
              }}>
              <Text>Thể loại</Text>
              <Text>{item?.type__product?.name || ''}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: colors.placeholder_light,
                paddingBottom: 5,
                marginBottom: 10,
              }}>
              <Text>Tình trạng</Text>
              <Text style={{color: colors.green2}}>
                còn {item?.quantity || '0'} SP
              </Text>
            </View>

            {item?.description && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.placeholder_light,
                  paddingBottom: 5,
                  marginBottom: 10,
                }}>
                <View style={{width: 100}}>
                  <Text>Ghi chú</Text>
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                  <RenderHtml
                    contentWidth={Dimensions.get('screen').width * 0.9}
                    source={{html: item?.description}}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Đã chọn 1 sản phẩm</Text>
            <Text>Tạm tính</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '30%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  } else {
                  }
                }}
                style={{width: 30, alignItems: 'flex-start'}}>
                <AntDesign name="minussquareo" size={24} color={colors.black} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={{width: 30, alignItems: 'flex-end'}}>
                <AntDesign name="plussquareo" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: colors.secondMain,
                }}>
                {formatNumberToMoney((item?.price || 0) * quantity)} đ
              </Text>
            </View>
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={handleAddCart}
            style={{
              backgroundColor: colors.secondMain,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 7,
              borderRadius: 10,
              marginTop: 10,
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text
                style={{fontWeight: 'bold', fontSize: 20, color: colors.white}}>
                Thêm vào giỏ hàng
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ViewContainer>
  );
};

export default DetailItem;
