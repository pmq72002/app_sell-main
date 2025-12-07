/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import ViewContainer from '../../Components/ViewContainer';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {ApiUrl, api_url} from '../../constants/apiUrl';
import {useAppSelector} from '../../redux/hook';
import HeaderView from '../../Components/HeaderView';
import colors from '../../styles/colors';
import {images} from '../../util/images';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

let dataStatus = [
  {
    id: 1,
    name: 'In progresss',
    in: 'Đang chờ xác nhận',
  },
  {
    id: 2,
    name: 'Rejected',
    in: 'Đã từ chối',
  },
  {
    id: 3,
    name: 'Accepted',
    in: 'Đã xác nhận qua Email',
  },
];

function HistoryScreen(props) {
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.dataUser);
  const [listApply, setListApply] = useState([]);

  const [status, setStatus] = useState(dataStatus[0]);

  // function filterStatus() {
  //   const statusName = dataStatus.find(e => e.id === status);
  //   let filterList = listApply.filter((e: any) => e.status === statusName?.in);
  //   setListApply(filterList);
  // }

  // useEffect(() => {
  //   if (status) {
  //     filterStatus();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status]);

  async function getListApply() {
    axios
      .get(ApiUrl + api_url.LIST_APPLY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setListApply(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getListApply();
  }, []);

  return (
    <ViewContainer>
      {/* <View style={{}}>
        <Text>Xuân</Text>
      </View> */}
      <HeaderView leftIcon={null} user={user} />
      <View style={{marginVertical: 10, marginHorizontal: 15}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>HISTORY APPLY</Text>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: colors.placeholder_light,
          borderRadius: 10,
        }}>
        {dataStatus.map((itemStatus: any) => {
          return (
            <TouchableOpacity
              key={itemStatus.id}
              onPress={() => {
                setStatus(itemStatus);
              }}
              style={{
                paddingVertical: 10,
                marginVertical: 5,
                borderRadius: 10,
                width: '32.5%',
                alignItems: 'center',
                backgroundColor:
                  status.id === itemStatus?.id
                    ? colors.white
                    : colors.placeholder_light,
              }}>
              <Text>{itemStatus.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{flex: 1}}>
        {listApply.filter(e => e.status === status.in).length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listApply}
            onRefresh={getListApply}
            refreshing={false}
            keyExtractor={(item: any) => item._id.toString()}
            renderItem={({item, index}: {item: any; index: number}) => {
              if (item.status === status.in) {
                return (
                  <View
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      marginVertical: 5,
                      padding: 10,
                      elevation: 4,
                      flexDirection: 'row',
                    }}>
                    <View style={{width: '17%'}}>
                      <Image
                        source={{uri: item.logo}}
                        style={{width: 50, height: 50}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{width: '83%'}}>
                      <View style={{marginBottom: 8}}>
                        <Text style={{fontWeight: '700', color: colors.dark}}>
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 13}}>Company: </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: colors.black,
                            // textDecorationLine: 'underline',
                          }}>
                          {item.namecompany.length > 25
                            ? item.namecompany.substring(0, 25) + '...'
                            : item.namecompany}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 13}}>Status: </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color:
                              item.status === dataStatus[0].in
                                ? colors.yellow
                                : item.status === dataStatus[1].in
                                ? colors.error
                                : colors.green,
                            textDecorationLine: 'underline',
                          }}>
                          {item.status}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          justifyContent: 'flex-end',
                        }}>
                        <Entypo
                          name="back-in-time"
                          size={16}
                          color={colors.placeholder}
                        />
                        <Text style={{fontSize: 13, marginLeft: 5}}>
                          {moment(item.DateSubmitted).fromNow()}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              } else {
                return null;
              }
            }}
          />
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={images.NO_DATA}
              style={{width: 200, height: 200}}
              resizeMode="contain"
            />
          </View>
        )}

        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 10,
              elevation: 4,
              flexDirection: 'row',
            }}>
            <View style={{width: '17%'}}>
              <Image
                source={images.Logo}
                style={{width: 50, height: 50}}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '83%'}}>
              <View style={{marginBottom: 8}}>
                <Text style={{fontWeight: '700', color: colors.dark}}>
                  Lead Java Developer
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 13}}>Company: </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  TMA Tech Group
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 13}}>Location: </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  Tp Hồ Chí Minh
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent: 'flex-end',
                }}>
                <Entypo
                  name="back-in-time"
                  size={16}
                  color={colors.placeholder}
                />
                <Text style={{fontSize: 13, marginLeft: 5}}>
                  {moment().fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 10,
              elevation: 4,
              flexDirection: 'row',
            }}>
            <View style={{width: '17%'}}>
              <Image
                source={images.Logo}
                style={{width: 50, height: 50}}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '83%'}}>
              <View style={{marginBottom: 8}}>
                <Text style={{fontWeight: '700', color: colors.dark}}>
                  Lead Java Developer
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 13}}>Company: </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  TMA Tech Group
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 13}}>Location: </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  Tp Hồ Chí Minh
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent: 'flex-end',
                }}>
                <Entypo
                  name="back-in-time"
                  size={16}
                  color={colors.placeholder}
                />
                <Text style={{fontSize: 13, marginLeft: 5}}>
                  {moment().fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 10,
              elevation: 4,
              flexDirection: 'row',
            }}>
            <View style={{width: '17%'}}>
              <Image
                source={images.Logo}
                style={{width: 50, height: 50}}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '83%'}}>
              <View style={{marginBottom: 8}}>
                <Text style={{fontWeight: '700', color: colors.dark}}>
                  Lead Java Developer
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 13}}>Company: </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  TMA Tech Group
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 13}}>Location: </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  Tp Hồ Chí Minh
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent: 'flex-end',
                }}>
                <Entypo
                  name="back-in-time"
                  size={16}
                  color={colors.placeholder}
                />
                <Text style={{fontSize: 13, marginLeft: 5}}>
                  {moment().fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView> */}
      </View>
    </ViewContainer>
  );
}

export default HistoryScreen;
