/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hook';
import { apiDetailOrder, apiUpdateStautus } from './UserApi';
import { formatNumberToMoney } from '../../util/numbers';
import { ApiUrl_Image } from '../../constants/apiUrl';

const HistoryDetail: React.FC = ({ route }) => {

  const [thisOrder, setThisOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  let id = route.params.id;
  let status = route.params.filterStatus;
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      handleDetailHistory();
    }
  }, []);

  async function handleDetailHistory() {
    let res = await dispatch(apiDetailOrder(id));
    if (res.payload) {
      setThisOrder({ ...res.payload });
    }
  }


  function handleReturnAddress(item: any) {
    let textAddress = '';
    if (item?.address) {
      textAddress = item.address;
    }

    if (item?.ward__a_d) {
      textAddress = textAddress + ', ' + `${item.ward__a_d.type} ${item.ward__a_d.name}`;
    }

    if (item?.city__a_d) {
      textAddress = textAddress + ', ' + `${item.city__a_d.type} ${item.city__a_d.name}`;
    }

    if (item?.provinceid__a_d) {
      textAddress = textAddress + ', ' + `${item.provinceid__a_d.type} ${item.provinceid__a_d.name}`;
    }

    return textAddress;
  }


  async function handleRemoveOrder() {
    setLoading(true);
    let res = await dispatch(apiUpdateStautus({
      id: id,
      status: 2,
    }));
    setLoading(false);
    if (res.payload) {

      ToastAndroid.showWithGravityAndOffset(
        'Hủy đơn thành công.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.goBack();
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Hủy đơn thất bại.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );

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
        <Pressable
          style={{ position: 'absolute', left: 10 }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={18} color={colors.black} />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.black }}>
          Chi tiết đơn hàng
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!thisOrder ? <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <ActivityIndicator size={'small'} color={colors.main} />
          </View> : <View>
            {thisOrder?.order_detail && thisOrder?.order_detail.map((item: any) => {
              let product = item?.product;
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
                          <Text style={{ fontWeight: 'bold', color: colors.secondMain, fontSize: 15 }}>{formatNumberToMoney(parseFloat(item.total_payment))}đ</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }
              return null;
            })}

            <View style={{
              marginVertical: 10, marginHorizontal: 15, shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.30,
              shadowRadius: 4.65,
              elevation: 8,
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 10,
            }}>
              <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Thông tin người nhận</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Tên người nhận: {thisOrder?.firstName || ''} {thisOrder?.lastname || ''}</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Số điện thoại: {thisOrder?.phone || ''}</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Email: {thisOrder?.email || ''}</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Địa chỉ: {handleReturnAddress(thisOrder)}</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Hình thức thanh toán"{thisOrder?.payment_type === '1' ? 'code' : 'VNpay'} - {formatNumberToMoney(parseFloat(thisOrder?.total))}đ</Text>
              </View>
            </View>

            <View style={{
              marginVertical: 10, marginHorizontal: 15, shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.30,
              shadowRadius: 4.65,
              elevation: 8,
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 10,
            }}>
              <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>Tạm tính</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Tổng tiền hàng:  {formatNumberToMoney(parseFloat(thisOrder.total) - 35000)}đ</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Phí ship:  {formatNumberToMoney(35000)}đ</Text>
              </View>
              <View>
                <Text style={{ color: colors.black }}>Tổng tiền:  {formatNumberToMoney(parseFloat(thisOrder.total))}đ</Text>
              </View>
            </View>
          </View>
          }


        </ScrollView>

        {status.id == 0 ? <TouchableOpacity disabled={loading} onPress={handleRemoveOrder} style={{ margin: 10, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10 }}>
          {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <Text style={{ fontSize: 14, color: colors.white }}>Ấn vào hủy đơn</Text>}
        </TouchableOpacity> : <View style={{ margin: 10, backgroundColor: status.color, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10 }}>
          {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <Text style={{ fontSize: 14, color: colors.white }}>{status.name}</Text>}
        </View>}
      </View>
    </ViewContainer>
  );
};

export default HistoryDetail;
