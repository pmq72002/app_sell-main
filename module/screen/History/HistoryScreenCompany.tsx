/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import ViewContainer from '../../Components/ViewContainer';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {ApiUrl, api_url} from '../../constants/apiUrl';
import {useAppSelector} from '../../redux/hook';
import HeaderView from '../../Components/HeaderView';
import colors from '../../styles/colors';
import {images} from '../../util/images';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import DetailJobListCV from './DetailJobListCV';
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
function HistoryCompanyScreen(props) {
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.dataUser);
  const [listApply, setListApply] = useState([]);

  async function getListHistory() {
    axios
      .get(ApiUrl + api_url.LIST_CV, {
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
    getListHistory();
  }, []);

  const [thisJob, setThisJob] = useState(null);
  const refDettailJob: any = useRef();
  const refAccept = useRef<any>();
  const [detailJob, setDetailJob] = useState<any>(null);
  const [emailMessage, setEmailMessage] = useState('');
  async function handleAccept() {
    axios
      .post(
        ApiUrl + api_url.SEND_EMAIL + `/${detailJob._id}/send-email`,
        {
          fromEmail: 'hptservices.group@gmail.com',
          toEmail: detailJob.email,
          subject: 'mail confirm',
          message: emailMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resPonse: any) => {
        if (resPonse.data.success) {
          refAccept.current.close();
          setTimeout(() => {
            getListHistory();
          }, 200);
          ToastAndroid.showWithGravityAndOffset(
            'Email succes',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50,
          );
        }
      })
      .catch(error => {
        console.log(error);

        // ToastAndroid.showWithGravityAndOffset(
        //   error.response.data.message,
        //   ToastAndroid.LONG,
        //   ToastAndroid.TOP,
        //   25,
        //   50,
        // );
      });
  }

  function handleReject(item: any) {
    console.log(item);

    axios
      .put(
        ApiUrl + api_url.SEND_EMAIL + `/${item._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resPonse: any) => {
        if (resPonse.data.success) {
          refDettailJob.current.close();
          setTimeout(() => {
            getListHistory();
          }, 200);
          ToastAndroid.showWithGravityAndOffset(
            'Reject succes',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50,
          );
        }
      })
      .catch(error => {
        console.log(error);

        // ToastAndroid.showWithGravityAndOffset(
        //   error.response.data.message,
        //   ToastAndroid.LONG,
        //   ToastAndroid.TOP,
        //   25,
        //   50,
        // );
      });
  }

  return (
    <ViewContainer>
      {/* <View style={{}}>
        <Text>Xuân</Text>
      </View> */}
      <HeaderView leftIcon={null} user={user} />
      <View style={{marginVertical: 10, marginHorizontal: 15}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>HISTORY</Text>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listApply}
          onRefresh={getListHistory}
          refreshing={false}
          keyExtractor={(item: any) => item._id.toString()}
          renderItem={({item, index}: {item: any; index: number}) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  await setThisJob(item);
                  refDettailJob.current.open();
                }}
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
                    <Text style={{fontSize: 13}}>Email: </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.black,
                      }}>
                      {item.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 13}}>School: </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.black,
                      }}>
                      {item.nameschool}
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
                      {moment(item.date).fromNow()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <RBSheet
        ref={refDettailJob}
        closeOnPressMask={true}
        minClosingHeight={200}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        // height={450}
        customStyles={{
          container: {
            height: Dimensions.get('screen').height * 0.75,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: colors.white,
          },
        }}>
        <DetailJobListCV
          thisJob={thisJob}
          handleReject={handleReject}
          submitAccept={job => {
            setDetailJob(job);
            refDettailJob.current.close();
            setTimeout(() => {
              refAccept.current.open();
            }, 200);
          }}
          closed={() => refDettailJob.current.close()}
        />
      </RBSheet>

      <RBSheet
        ref={refAccept}
        closeOnPressMask={true}
        minClosingHeight={200}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        // height={450}
        customStyles={{
          container: {
            height: Dimensions.get('screen').height * 0.5,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: colors.white,
          },
        }}>
        <View style={{marginHorizontal: 15, marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 5}}>
            Message Email
          </Text>
          <TextInput
            style={{
              borderColor: colors.placeholder,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}
            value={emailMessage}
            onChangeText={val => setEmailMessage(val)}
            multiline={true}
            underlineColorAndroid="transparent"
          />
          {emailMessage !== '' ? (
            <TouchableOpacity
              onPress={handleAccept}
              style={{
                marginVertical: 20,
                backgroundColor: colors.secondMain,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{color: colors.white, fontWeight: 'bold', fontSize: 14}}>
                Send Email
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginVertical: 20,
                backgroundColor: colors.placeholder,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{color: colors.white, fontWeight: 'bold', fontSize: 14}}>
                Send Email
              </Text>
            </View>
          )}
        </View>
      </RBSheet>
    </ViewContainer>
  );
}

export default HistoryCompanyScreen;
