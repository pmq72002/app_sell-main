/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../styles/colors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ComponentSelect from './ComponentsSlect';
import ComponentSelectMulti from './ComponentsSlectMulti';
import DocumentPicker, { types } from 'react-native-document-picker';



const UpdateUser = ({ applicant, skills, education, apiUpdateUser, closed }: { applicant: any, skills: any, education: any, apiUpdateUser: (data: any) => void, closed: () => void; }) => {

  const [info, setInfo] = useState(applicant);

  const [popChooseDate, setPopChooseDate] = useState(false);

  const [popChoooseGender, setPopChooseGender] = useState(false);

  const [popChooseEdution, setPopChooseEdution] = useState(false);

  const [popChooseSkill, setPopChooseSkill] = useState(false);

  const [changeCV, setChangeCV] = useState(true);

  const [loading, setLoading] = useState(false);

  async function returnData() {

    let listSKill: any = [];
    info.skills.map((skill: any) => {
      listSKill.push(skill.id);
    });

    let body: any = {
      gender: info?.gender || 0,
      name: info?.name,
      country: info?.country || '',
      city: info?.city || '',
      address: info?.address || '',
      education_id: info?.education?.id || null,
      skills: listSKill,
      // experience_id: info?.experience?.id || null,
      birth_date: info?.birth_date || '',
      bio: info.bio,
    };

    if (changeCV) {
      body.status_file_cv = 1;
      body.file = info.file;
    }
    setLoading(true);
    await apiUpdateUser(body);
  }

  function handleCheckValue() {
    if (info.skills.length === 0) {
      return false;
    }
    if (info.education_id) {
      return false;
    }

    return true;
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cập nhật</Text>
          <TouchableOpacity onPress={closed} style={{ position: 'absolute', right: 10 }}>
            <AntDesign name="close" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>


        <View style={{ marginVertical: 10 }}>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>Name</Text>
            <View style={{
              borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              borderRadius: 10,
              marginTop: 7,
            }}>

              <TextInput
                style={{ fontSize: 13, color: colors.black }}
                value={info.name}
                placeholder="name"
                placeholderTextColor={colors.placeholder}
                onChangeText={(val) => setInfo((pre: any) => ({
                  ...pre,
                  name: val,
                }))}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>Country</Text>
            <View style={{
              borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              borderRadius: 10,
            }}>

              <TextInput
                style={{ fontSize: 13, color: colors.black }}
                value={info.country}
                placeholderTextColor={colors.placeholder}
                placeholder="country"
                onChangeText={(val) => setInfo((pre: any) => ({
                  ...pre,
                  country: val,
                }))}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>City</Text>
            <View style={{
              borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              borderRadius: 10,
              marginTop: 7,
            }}>

              <TextInput
                style={{ fontSize: 13, color: colors.black }}
                value={info.city}
                multiline
                placeholderTextColor={colors.placeholder}
                placeholder="city"
                onChangeText={(val) => setInfo((pre: any) => ({
                  ...pre,
                  city: val,
                }))}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>Address</Text>
            <View style={{
              borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              borderRadius: 10,
              marginTop: 7,
            }}>
              <TextInput
                style={{ fontSize: 13, color: colors.black }}
                value={info.address}
                placeholderTextColor={colors.placeholder}
                multiline
                placeholder="address"
                onChangeText={(val) => setInfo((pre: any) => ({
                  ...pre,
                  address: val,
                }))}
              />
            </View>
          </View>



          {/* <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>Education</Text>
            <TouchableOpacity onPress={() => setPopChooseDate(true)} style={{
              width: '100%', borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
              marginTop: 7,
            }} >
              <Text style={{ fontSize: 13, color: colors.black }}>{info?.education?.name || 'Update now'}</Text>
            </TouchableOpacity>
          </View> */}

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>Gender</Text>
            <TouchableOpacity onPress={() => setPopChooseGender(true)} style={{
              width: '100%', borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
              marginTop: 7,
            }} >
              <Text style={{ fontSize: 13, color: colors.black }}>{info?.gender === 0 ? 'Nam' : 'Nữ'}</Text>
            </TouchableOpacity>
          </View>



          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>BirthDay</Text>
            <TouchableOpacity onPress={() => setPopChooseDate(true)} style={{
              width: '100%', borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
              marginTop: 7,
            }} >
              <Text style={{ fontSize: 13, color: colors.black }}>{info?.birth_date || 'Update now'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>SKill</Text>
            <TouchableOpacity onPress={() => setPopChooseSkill(true)} style={{
              width: '100%', borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              borderRadius: 10,
              height: 40,
              marginTop: 7,
              flexDirection: 'row',
              alignItems: 'center',
            }} >
              {info?.skills ? info?.skills.map((itemSkilll: any, indexSkill: number) => {
                return (
                  <View key={indexSkill} style={{ borderWidth: 1, borderColor: colors.orange, paddingVertical: 5, marginRight: 5, borderRadius: 10, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 15, color: colors.dark }}>{itemSkilll.name}</Text>
                  </View>
                );
              }) : <Text style={{ fontSize: 13, color: colors.black }}>Update now</Text>}

            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>Education</Text>
            <TouchableOpacity onPress={() => setPopChooseEdution(true)} style={{
              width: '100%', borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
              marginTop: 7,
            }} >
              <Text style={{ fontSize: 13, color: colors.black }}>{info?.education?.name || 'Update now'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3, color: colors.black }}>About me</Text>
            <View style={{
              borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              borderRadius: 10,
              marginTop: 7,
            }}>
              <TextInput
                style={{ fontSize: 13, color: colors.black }}
                value={info.bio}
                placeholderTextColor={colors.placeholder}
                multiline
                placeholder="About me"
                onChangeText={(val) => setInfo((pre: any) => ({
                  ...pre,
                  bio: val,
                }))}
              />
            </View>
          </View>

          {/* <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 3 }}>CV</Text>
            <TouchableOpacity onPress={pickerPdf} style={{
              width: '100%', borderWidth: 1,
              borderColor: colors.placeholder_light, paddingHorizontal: 4,
              justifyContent: 'center',
              borderRadius: 10,
              height: 40,
              marginTop: 7,
            }} >
              <Text style={{ fontSize: 13, color: info?.file ? colors.black : colors.gray }}>{info?.file ? info?.file.name : 'Please Select CV'}</Text>
            </TouchableOpacity>
          </View> */}
        </View>

      </ScrollView>

      {loading ? <View style={{ backgroundColor: colors.gray, paddingVertical: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
        <ActivityIndicator size={'small'} color={colors.white} />
      </View> : handleCheckValue() ? <TouchableOpacity onPress={() => returnData(info)} style={{ backgroundColor: colors.orange, paddingVertical: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>Cập nhật</Text>
      </TouchableOpacity> : <View style={{ backgroundColor: colors.gray, paddingVertical: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>Cập nhật</Text>
      </View>}

      {popChooseDate && <DatePicker
        modal
        open={popChooseDate}
        date={new Date()}
        mode="date"
        onConfirm={(date) => {
          setPopChooseDate(false);
          setInfo((pre: any) => ({
            ...pre,
            birth_date: moment(date).format('YYYY-MM-DD'),
          }));
        }}
        onCancel={() => {
          setPopChooseDate(false);
        }}
      />}

      {popChoooseGender && <ComponentSelect onPress={(item: any) => {
        setInfo((pre: any) => ({
          ...pre,
          gender: item.id,
        }));
        setPopChooseGender(false);
      }} visible={popChoooseGender} closed={() => setPopChooseGender(false)} title={'Choose Gender'} list={[{
        id: 0,
        name: 'Nam',
      },
      { id: 1, name: 'Nữ' },
      ]} />}

      {popChooseEdution && <ComponentSelect onPress={(item: any) => {
        setInfo((pre: any) => ({
          ...pre,
          education: item,
        }));
        setPopChooseEdution(false);
      }} visible={popChooseEdution} closed={() => setPopChooseGender(false)} title={'Choose Education'} list={education} />}

      {popChooseSkill && <ComponentSelectMulti onPress={(item: any) => {
        setInfo((pre: any) => ({
          ...pre,
          skills: item,
        }));
        setPopChooseSkill(false);
      }} visible={popChooseSkill} closed={() => setPopChooseGender(false)} title={'Choose Skill'} list={skills} />}
    </View>
  );
};

const css = StyleSheet.create({
  viewInput: {},
});

export default UpdateUser;
