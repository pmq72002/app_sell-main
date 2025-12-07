/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import ViewContainer from '../../Components/ViewContainer';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { SliderBox } from 'react-native-image-slider-box';
import Feather from 'react-native-vector-icons/Feather';
import { handleGetCategories, handleGetProductAll, handleGetProductByCategories } from './HomeApi';
import { formatNumberToMoney } from '../../util/numbers';
import { ApiUrl_Image } from '../../constants/apiUrl';
import Entypo from 'react-native-vector-icons/Entypo';


const images = [
  'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
];

function HomeScreen() {

  const navigtaion: any = useNavigation();

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const [dataProduct, setDataProduct] = useState([]);

  const [panigation, setPanigation] = useState({
    page: 1,
    totalPage: 1,
  });

  const [dataCategory, setDataCategory] = useState([]);

  const [idCategory, setIdCategory] = useState(-1);

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(colors.white);
    }
  }, [isFocus]);

  useEffect(() => {
    async function fetchData() {
    console.log("start");
    await handleGetCategoryProduct();
    console.log("End call");
  }

    fetchData();
  }, []);


  useEffect(() => {
    handleGetProduct();
  }, [panigation.page]);

  function hanleDetail(item: any) {
    navigtaion.navigate('DetailItem', {
      id: item.id,
    });
  }

  async function handleGetCategoryProduct() {
    console.log("handleGetCategoryProduct: ");
    let res = await dispatch(handleGetCategories());
    console.log("handleGetCategoryProduct: ", res);
    if (res.payload) {
      let tempData: any = [...res.payload];
      setDataCategory(tempData);
    }
  }

  async function handleGetProduct() {
    setLoading(true);
    let res = await dispatch(handleGetProductAll({
      page: panigation.page,
      per_page: 10,
    }));
    setLoading(false);
    console.log("handleGetProduct: ", res);

    if (res.payload) {
      let resData = res.payload;
      if (panigation.page === 1) {
        setPanigation((pre) => ({
          ...pre,
          totalPage: resData.total,
        }));
      }
      let tempDataProduct = [...dataProduct];
      setDataProduct(panigation.page === 1 ? resData.data : [...tempDataProduct, ...resData.data]);
    }
  }

  const loadMoreData = () => {
    if (dataProduct.length < panigation.totalPage) {
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

  function handleGoToSearch() {
    navigtaion.navigate('Search');
  }

  function handleGoToChat() {
    navigtaion.navigate('Chat');
  }


  return (
    <ViewContainer>
      <View style={{ flex: 1, backgroundColor: colors.placeholder_light2 }}>
        <ScrollView onScroll={handleScroll}
          scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <View
            style={[css.shadow, {
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.white,
              paddingVertical: 15,
            }]}
          >
            <Pressable
              onPress={handleGoToSearch}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: 'white',
                borderRadius: 10,
                height: 38,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.placeholder_light2,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <Text>Search Amazon.in</Text>
            </Pressable>

            <Feather name="mic" size={24} color="black" />
          </View>

          <SliderBox
            images={images}
            autoPlay

            dotColor={'#13274F'}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: '100%' }}
          />

          <View style={{ height: 40, width: '100%', marginVertical: 10, marginLeft: 10 }}>
            <FlatList
              data={dataCategory}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item: any) => item?.id?.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => setIdCategory(item?.id)} style={[css.itemCategories, { backgroundColor: item?._id == idCategory ? colors.secondMain : colors.white }]}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: item?._id == idCategory ? colors.white : colors.black }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap', paddingVertical: 10, paddingHorizontal: 10 }}>
            {dataProduct.map((item: any) => {
              return (
                <TouchableOpacity onPress={() => hanleDetail(item)} style={{
                  width: '49%', backgroundColor: colors.white, marginBottom: 10, borderRadius: 10, shadowColor: '#000',
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

      <TouchableOpacity onPress={handleGoToChat} style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: colors.secondMain, padding: 20, borderRadius: 100 }}>
        <Entypo name="chat" color={colors.white} size={20} />
      </TouchableOpacity>

    </ViewContainer>
  );
}

const css = StyleSheet.create({
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
  itemCategories: {
    marginRight: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10,
  },
});

export default HomeScreen;