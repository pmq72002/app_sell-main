/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ViewContainer from '../../Components/ViewContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import { useAppDispatch } from '../../redux/hook';
import { handleGetCategories, handleGetMenuCategories, handleGetProductAll, handleGetProductByCategories } from '../Home/HomeApi';
import { FlatList } from 'react-native';
import { formatNumberToMoney } from '../../util/numbers';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ApiUrl_Image } from '../../constants/apiUrl';
import PopSelectCategory from '../../Components/PopSelectCategory';
import PopSelectType from '../../Components/PopSelectType';

const DATA_CAY_TRONG = [
  {
    id: 1,
    name: 'Spider Plant',
    type: 'Ưa bóng',
    price: 250000,
    image: require('../../assets/Home/chau_cay.png'),
  },
  {
    id: 2,
    name: 'Song of India',
    type: 'Ưa sáng',
    price: 250000,
    image: require('../../assets/Home/chau_cay.png'),
  },
  {
    id: 3,
    name: 'Spider Plant 1',
    type: 'Ưa bóng',
    price: 250000,
    image: require('../../assets/Home/chau_cay.png'),
  },
  {
    id: 4,
    name: 'Song of India 2',
    type: 'Ưa sáng',
    price: 250000,
    image: require('../../assets/Home/chau_cay.png'),
  },
];

const SearchView: React.FC = () => {

  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const [textSearch, setTextSearch] = useState('');

  const [dataProduct, setDataProduct] = useState([]);

  const [popCategory, setPopCategory] = useState(false);

  const [popType, setPopType] = useState(false);

  const [dataCategory, setDataCategory] = useState([]);

  const [loading, setLoading] = useState(false);

  const [dataMenuCategory, setDataMenuCategory] = useState([]);

  const [params, setParams] = useState({
    cate_id: null,
    price_product: 1,
    type_id: null,
  });

  const [panigation, setPanigation] = useState({
    page: 1,
    total: 10,
  });


  // const [idCategory, setIdCategory] = useState(-1);

  useEffect(() => {
    handleGetCategoryProduct();
    handleGetMenuCategoryProduct();
  }, []);

  useEffect(() => {
    handleGetProduct();
  }, [panigation.page, params]);

  async function handleGetProduct() {
    setLoading(true);
    let res = await dispatch(handleGetProductAll({
      page: panigation.page,
      per_page: 10,
      price_product: params.price_product,
      cate_id: params?.cate_id?.id || null,
      type_id: params?.type_id?.id || null,
      name_product: textSearch,
    }));
    setLoading(false);
    if (res.payload) {
      let resData = res.payload;
      if (panigation.page === 1) {
        setPanigation((pre) => ({
          ...pre,
          total: resData.total,
        }));
      }
      let tempDataProduct = [...dataProduct];
      setDataProduct(panigation.page === 1 ? resData.data : [...tempDataProduct, ...resData.data]);
    }
  }


  async function handleGetCategoryProduct() {
    let res = await dispatch(handleGetCategories());
    if (res.payload) {
      let tempData: any = [...res.payload];
      setDataCategory(tempData);
    }
  }

  async function handleGetMenuCategoryProduct() {
    let res = await dispatch(handleGetMenuCategories());
    if (res.payload) {
      let tempData: any = [...res.payload];
      setDataMenuCategory(tempData);
    }
  }

  function handleGoDetailProduct(item: any) {
    navigation.navigate('DetailItem', {
      id: item.id,
    });
  }

  function handleChangeInfo(value: any) {

    if (popCategory) {
      setPopCategory(false);
    }

    if (popType) {
      setPopType(false);
    }

    setParams((pre) => ({
      ...pre,
      ...value,
    }));

    if (panigation.page !== 1) {
      setPanigation((pre) => ({
        ...pre,
        page: 1,
      }));
    }
  }

  const loadMoreData = () => {
    if (dataProduct.length < panigation.total) {
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

  return (
    <ViewContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
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
          Tìm kiếm sản phẩm
        </Text>
      </View>

      <View>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <View style={{
            flex: 1, borderWidth: 1,
            borderColor: colors.placeholder_light,
            marginRight: 10,
            borderRadius: 10,
          }}>
            <TextInput placeholder="Nhập để tìm kiếm" value={textSearch} style={{ justifyContent: 'flex-end', height: 40, padding: 10 }} onChangeText={(val) => setTextSearch(val)} />
          </View>
          <Pressable onPress={() => handleChangeInfo({})} style={{ backgroundColor: colors.secondMain, width: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name="search1" color={colors.white} size={20} />
          </Pressable>
        </View>

        <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Pressable onPress={() => setPopType(true)} style={css.touchbleStyle}>
            <Text style={{ fontSize: 14, color: colors.black }}>{params?.type_id ? params?.type_id?.name : 'Chọn thể loại'}</Text>
          </Pressable>
          <Pressable onPress={() => setPopCategory(true)} style={css.touchbleStyle}>
            <Text style={{ fontSize: 14, color: colors.black }}>{params?.cate_id ? params?.cate_id?.name : 'Chọn danh mục'}</Text>
          </Pressable>

          <Pressable onPress={() => handleChangeInfo({ price_product: params?.price_product === 1 ? 2 : 1 })} style={css.touchbleStyleNoBorder}>
            <Text style={{ fontSize: 14, color: colors.black, marginRight: 10 }}>{params.price_product === 1 ? 'Giảm dần' : 'Tăng dần'}</Text>
            <FontAwesome name="sort" size={20} color={colors.black} />
          </Pressable>
        </View>

      </View>

      <View style={{ flex: 1, backgroundColor: colors.placeholder_light2, padding: 10 }}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {dataProduct.map((item: any) => {
              return (
                <TouchableOpacity key={item.id} onPress={() => handleGoDetailProduct(item)} style={{
                  width: '49%', backgroundColor: colors.white, marginBottom: 10, borderRadius: 10, shadowColor: '#000',
                  height: 'auto',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                }}>
                  {item?.image && <Image style={{ width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'contain' }} source={{ uri: ApiUrl_Image + item?.image }} />}
                  <View style={{ padding: 7, flex: 1 }}>
                    <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>{item?.name || ''}</Text>
                    <Text style={{ fontSize: 13, color: colors.black }}>{item?.category_product?.name || ''}</Text>
                    <Text style={{ fontSize: 13, color: colors.gray, marginVertical: 3, fontFamily: 'italic' }}>{item?.short_description?.length > 50 ? item?.short_description?.substring(0, 50) + '...' : item?.short_description || ''}</Text>
                    <Text style={{ fontSize: 15, color: colors.secondMain, fontWeight: 'bold' }}>{formatNumberToMoney(item?.price || 0)} đ</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {loading && <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
            <ActivityIndicator size={'small'} color={colors.secondMain} />
          </View>}
        </ScrollView>
      </View>

      {popCategory && <PopSelectCategory onChoose={handleChangeInfo} visible={popCategory} closed={() => setPopCategory(false)} />}
      {popType && <PopSelectType onChoose={handleChangeInfo} visible={popType} closed={() => setPopType(false)} />}
    </ViewContainer >
  );
};

const css = StyleSheet.create({
  itemCategories: {
    marginRight: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10,
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
  touchbleStyle: {
    borderRightColor: colors.gray,
    borderRightWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    justifyContent: 'center',
  },
  touchbleStyleNoBorder: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    justifyContent: 'center',
  },
});
export default SearchView;
