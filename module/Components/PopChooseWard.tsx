/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import { useAppDispatch } from '../redux/hook';
import { apiGetDistrict, apiGetProvinces, apiGetWard, handleGetCategories } from '../screen/Home/HomeApi';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  visible: boolean;
  closed: () => void;
  onChoose: (value: any) => void;
  district: any
}

const PopChooseWard: React.FC<Props> = ({ visible, closed, onChoose, district }) => {

  console.log(district);


  const dispatch = useAppDispatch();

  const [dataWard, setDataWard] = useState<any>([]);

  const [textSearch, setTextSearch] = useState('');

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (district) {
      handleGetWard();
    }
  }, []);





  async function handleGetWard() {
    let res: any = await dispatch(apiGetWard(district.districtid));
    if (res.payload) {
      let tempData: any = [...res.payload];
      setDataWard(tempData);
    }
  }

  const dataFilter = dataWard.filter((e) => {
    let name = e?.name || '';
    if (textSearch === '') {
      return true;
    }

    return name.search(textSearch) > -1;
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.black, opacity: 0.6, zIndex: 1 },
        ]}
      />

      <View style={styles.body}>
        <View
          style={{
            width: '100%',
            height: Dimensions.get('screen').height * 0.7 - keyboardHeight + 100,
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={{ borderWidth: 1, borderColor: colors.placeholder_light, height: 40, justifyContent: 'center', borderRadius: 10, paddingLeft: 10 }}>
              <TextInput
                value={textSearch}
                onChangeText={(val) => setTextSearch(val)}
                style={{ fontSize: 14, color: colors.black, paddingRight: 20 }}
                placeholder="Nhập để tìm kiếm ..."
              />
              <View style={{ position: 'absolute', right: 10 }}>
                <AntDesign name="search1" color={colors.placeholder} size={16} />
              </View>
            </View>
            <ScrollView>
              {[{ id: -1, name: 'Tất cả' }, ...dataFilter].map((item: any) => {
                return (
                  <Pressable key={item.id} onPress={() => onChoose(item)} style={styles.viewTouchable}>
                    <Text style={{ color: colors.black, fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                    <AntDesign name="right" size={16} color={colors.black} />
                  </Pressable>
                );
              })}


            </ScrollView>
            <Pressable onPress={closed} style={styles.viewTouchableNoBorder}>
              <Text style={{ color: colors.error, fontSize: 16, fontWeight: 'bold' }}>Hủy</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('screen').height * 1,
    bottom: 0,
    zIndex: 3,
  },
  body: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  viewTouchable: {
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholder_light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  viewTouchableNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default PopChooseWard;
