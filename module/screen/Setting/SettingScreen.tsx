/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import ViewContainer from '../../Components/ViewContainer';
import {images} from '../../util/images';
import colors from '../../styles/colors';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import HeaderView from '../../Components/HeaderView';
import axios from 'axios';
import { ApiUrl, api_url } from '../../constants/apiUrl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';

const SettingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.dataUser);
  const token = useAppSelector((state) => state.auth.token);

  const listJob = useAppSelector((state) => state.home.listJob);

  const focus = useIsFocused();

  const [listFavorite, setListFavorite] = useState([]);

  async function getListFavorite(){
    axios.get(ApiUrl + api_url.LIST_FAVORITE,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log('🚀 ~ file: SettingScreen.tsx:40 ~ getListFavorite ~ res:', res);
      if (res.data.success){
        let listProfile = res.data.profile;
        let arrayFa: any = [];
        listJob.map((itemJob: any) =>{
          if (listProfile.some((e: any) => e === itemJob._id)){
            arrayFa.push(itemJob);
          }
        });
        setListFavorite(arrayFa);
      }
    }).catch((error) => {
      console.log(error);

    });
  }

  useEffect(() => {
    if (focus){
      getListFavorite();
    }

  }, [focus]);

  async function remove(itemJob: any) {
    axios
      .put(
        ApiUrl + api_url.DELETE_FA + `/${itemJob._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(resAdd => {
        if (resAdd.data.success) {
          getListFavorite();
          ToastAndroid.showWithGravityAndOffset(
            resAdd.data.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50,
          );
        }
      })
      .catch(error => {
        console.log('🚀 ~ file: SettingScreen.tsx:84 ~ remove ~ error:', error);
        Alert.alert('Thông báo', error.response.data.message);
      });
  }


  return (
    <ViewContainer>
      {/* <View style={css.container}>
        <Text>Xuân</Text>
      </View> */}
      <HeaderView user={user} leftIcon={null}/>
      <View style={{marginVertical: 10, marginHorizontal: 15}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>FAVORITE</Text>
      </View>
      <View style={{flex: 1, marginHorizontal: 5}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listFavorite}
            onRefresh={() => getListFavorite()}
            refreshing={false}
            keyExtractor={(item: any) => item._id.toString()}
            renderItem={(({item, index} : {item: any, index: number}) => {
              return (
                <View style={{
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  padding: 10,
                  elevation: 4,
                  flexDirection: 'row',
                }}>

                  <View style={{width: '17%'}}>
                    <Image source={{uri: item.logo}} style={{width: 50, height: 50}} resizeMode="contain"/>
                  </View>
                  <View style={{width: '83%'}}>
                    <View style={{marginBottom: 8, paddingRight: 20, justifyContent: 'center'}}>
                      <Text style={{fontWeight: '700', color: colors.dark}}>{item.title}</Text>
                      <TouchableOpacity onPress={() => remove(item)} style={{position: 'absolute', right: 5, top: 5}}>
                        <AntDesign name="delete" size={16} color={colors.error}/>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{fontSize: 13}}>Company: </Text>
                      <Text style={{fontSize: 13, color: colors.yellow,  textDecorationLine: 'underline'}}>{item.namecompany.length > 25 ? item.namecompany.substring(0, 25) + '...' : item.namecompany}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{fontSize: 13}}>Location: </Text>
                      <Text style={{fontSize: 13, color: colors.yellow,  textDecorationLine: 'underline'}}>{item.place}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          />
        </View>
    </ViewContainer>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewImage: {
    alignItems: 'center',
  },
  btnLogin: {
    height: 45,
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
});

export default SettingScreen;
