/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { images } from '../../../util/images';
import colors from '../../../styles/colors';
interface ViewDetailCompanyProp {
  thisCompany: any;
}

const ViewDetailCompany: React.FC<ViewDetailCompanyProp> = ({ thisCompany }) => {
  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 80 }}>
            <Image
              source={images.LOGO_COMPANIES}
              style={{
                width: '100%',
                height: 80,
                borderRadius: 100,
                resizeMode: 'center',
              }}
            />
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              marginLeft: 10,
              justifyContent: 'flex-start',
              width: '100%',
            }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text
                style={{ fontSize: 15, fontWeight: 'bold', color: colors.black }}>
                {thisCompany?.name || ''}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingVertical: 3,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome
                  name="birthday-cake"
                  color={colors.orange}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: colors.orange,
                    marginLeft: 5,
                  }}>
                  {thisCompany.establishment_date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <MaterialCommunityIcons
                  name="home-city-outline"
                  color={colors.orange}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: colors.orange,
                    marginLeft: 5,
                  }}>
                  {thisCompany?.organization_type_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 3,
                alignItems: 'center',
              }}>
              <Entypo name="network" color={colors.placeholder} size={15} />
              <Text style={{ fontSize: 15, marginLeft: 3, color: colors.placeholder }}>
                {thisCompany?.website || ''}
              </Text>
            </View>

            <View style={{ paddingVertical: 2 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor: colors.orange,
                  borderWidth: 1,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 2,
                  borderRadius: 10,
                }}>
                <Entypo name="add-user" color={colors.orange} size={14} />
                <Text
                  style={{ fontSize: 13, marginLeft: 5, color: colors.orange }}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
            <Entypo name="location" color={colors.placeholder} size={14} />
            <Text style={{ fontSize: 13, marginLeft: 3 }}>{thisCompany?.location || ''}</Text>
          </View> */}
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          />
          <View>
            <Text
              style={{ fontSize: 15, fontWeight: 'bold', color: colors.black }}>
              Nội dung:{' '}
              <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
                {thisCompany.bio}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewDetailCompany;
