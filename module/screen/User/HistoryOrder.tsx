/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { apiGetOrderUser } from './UserApi';
import moment from 'moment';
import { formatNumberToMoney } from '../../util/numbers';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { STATUS_ORDER } from '../../util/StatusOrder';
const HistoryOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const [loading, setLoading] = useState(false);

  const { dataUser } = useAppSelector((state) => state.auth);

  const [dataHistory, setDataHistory] = useState([]);


  const [textSearch, setTextSearch] = useState('');

  const [panigation, setPanigation] = useState({
    page: 1,
    total: 10,
  });

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(colors.white);
      handleGetAllHistory();
    }
  }, [isFocus]);

  async function handleGetAllHistory() {
    setLoading(true);
    let res = await dispatch(apiGetOrderUser({
      id: dataUser.id,
      data: {
        code: textSearch,
      },
    }));
    setLoading(false);
    if (res.payload) {
      let resData = res.payload;
      if (panigation.page === 1) {
        setPanigation((pre) => ({
          ...pre,
          totalPage: resData.total,
        }));
      }
      let tempDataProduct = [...dataHistory];
      setDataHistory(panigation.page === 1 ? resData.data : [...tempDataProduct, ...resData.data]);
    }
  }

  const loadMoreData = () => {
    if (dataHistory.length < panigation.total) {
      setPanigation((pre) => ({
        ...pre,
        page: pre.page + 1,
      }));
    }
  };

  const handleScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20) {
      // User has scrolled to the bottom
      loadMoreData();
    }
  };

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

  function handleDetailHistory(item: any) {
    navigation.navigate('HistoryDetail', {
      id: item.id,
      filterStatus: item.filterStatus,
    });
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
        <Pressable style={{ position: 'absolute', left: 10 }} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={18} color={colors.black} />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.black }}>
          Lịch sử đơn hàng
        </Text>
      </View>

      <View style={{ flexDirection: 'row', margin: 10 }}>
        <View style={{
          flex: 1, borderWidth: 1,
          borderColor: colors.placeholder_light,
          marginRight: 10,
          borderRadius: 10,
        }}>
          <TextInput clearButtonMode="always" placeholder="Nhập để tìm kiếm" value={textSearch} style={{ justifyContent: 'flex-end', height: 40, padding: 10 }} onChangeText={(val) => setTextSearch(val)} />
        </View>
        <Pressable disabled={loading} onPress={() => handleGetAllHistory()} style={{ backgroundColor: colors.secondMain, width: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <AntDesign name="search1" color={colors.white} size={20} />}
        </Pressable>
      </View>

      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          {dataHistory.map((item: any) => {
            let filterStatus = STATUS_ORDER.find((e) => e.id === item.status);
            return (
              <Pressable onPress={() => handleDetailHistory({ ...item, filterStatus: filterStatus })} style={[css.viewInfoUser, css.shadow, { backgroundColor: colors.white }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: colors.secondMain, fontWeight: 'bold' }}>OR000{item.id} </Text>
                  <Text style={{ fontSize: 13, fontStyle: 'italic' }}>({moment(item.createdAt).format('dddd, DD/MM/YYYY')})</Text>
                </View>
                <View style={{ marginVertical: 2 }}>
                  <Text style={{ fontSize: 14, color: colors.black }}>Họ tên: {item?.firstName || item?.firstname || ''} {item?.lastname}</Text>
                </View>
                <View style={{ marginBottom: 2 }}>
                  <Text style={{ fontSize: 14, color: colors.black }}>Số điện thoại: {item?.phone || ''}</Text>
                </View>
                <View style={{ marginBottom: 2 }}>
                  <Text style={{ fontSize: 14, color: colors.black }}>Địa chỉ: {handleReturnAddress(item)}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: colors.black }}>Tổng tiền <Text style={{ color: colors.secondMain, fontWeight: 'bold' }}>{formatNumberToMoney(parseFloat(item?.total))} đ</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: colors.black }}>Hình thức thanh toán: {item?.payment_type === '1' ? 'code' : 'VNpay'}</Text>

                  <View style={{ backgroundColor: filterStatus?.color, padding: 5, borderRadius: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: colors.white }}>{filterStatus?.name || ''}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}

          {loading && <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <ActivityIndicator size={'small'} color={colors.secondMain} />
          </View>}
        </ScrollView>
      </View>
    </ViewContainer>
  );
};


const css = StyleSheet.create({
  viewShow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.placeholder_light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewInfoUser: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default HistoryOrder;
