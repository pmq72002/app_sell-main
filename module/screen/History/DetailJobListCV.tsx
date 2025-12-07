/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';

import {useAppSelector} from '../../redux/hook';
import ViewContainer from '../../Components/ViewContainer';
import colors from '../../styles/colors';
import axios from 'axios';
import {ApiUrl, api_url} from '../../constants/apiUrl';

function DetailJobListCV({
  closed,
  thisJob,
  handleReject,
  submitAccept,
}: {
  closed: () => void;
  thisJob: any;
  handleReject: (value: any) => void;
  submitAccept: (value: any) => void;
}) {
  const token = useAppSelector(state => state.auth.token);

  const [student, setStudent] = useState<any>(null);

  async function getListApply() {
    axios
      .get(ApiUrl + api_url.LIST_CV_APPLY + `/${thisJob._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setStudent(res.data);
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
      <View
        style={{
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>
          Profile Student
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 5,
            borderRadius: 10,
            backgroundColor: colors.placeholder_light2,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}>
            <Text>Name:</Text>
            <Text>{student?.name ? student?.name : ''}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}>
            <Text>Email:</Text>
            <Text>{student?.email ? student?.email : ''}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}>
            <Text>Major:</Text>
            <Text>{student?.major ? student?.major : ''}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}>
            <Text>Name School:</Text>
            <Text>{student?.nameschool ? student?.nameschool : ''}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}>
            <Text>Status CV:</Text>
            <Text>{student?.status ? student?.status : ''}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 7,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => Linking.openURL(student?.url)}
              style={{
                paddingVertical: 10,
                backgroundColor: colors.secondMain,
                paddingHorizontal: 25,
                borderRadius: 10,
              }}>
              <Text
                style={{fontSize: 14, color: colors.white, fontWeight: 'bold'}}>
                Tải CV
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Họ tên</Text>
            <Text>{student?.name ? student?.name : ''}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Họ tên</Text>
            <Text>{student?.name ? student?.name : ''}</Text>
          </View> */}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => handleReject(student)}
          style={{
            width: '45%',
            backgroundColor: colors.error,
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.white}}>
            Reject
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => submitAccept(student)}
          style={{
            width: '45%',
            backgroundColor: colors.green,
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.white}}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <Text>Xuân</Text>
      </View> */}
    </ViewContainer>
  );
}

export default DetailJobListCV;
