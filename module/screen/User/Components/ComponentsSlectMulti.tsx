/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReactNativeModal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ComponentSelectMulti = ({ title, list, onPress, closed, visible }) => {

  const [listM, setListM] = useState(list);

  function handleChangeList(item: any, index: number) {
    let tempArray = [...listM];
    let tempItem = { ...item };
    if (tempItem.checked) {
      tempItem.checked = false;
    } else {
      tempItem.checked = true;
    }
    tempArray[index] = tempItem;
    setListM(tempArray);
  }

  return (
    <ReactNativeModal isVisible={visible}>
      <View
        style={{
          width: Dimensions.get('screen').width * 1,
          height: Dimensions.get('screen').height * 1,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }} />
      <View
        style={{
          backgroundColor: colors.white,
          height: '70%',
          borderRadius: 10,
          width: '100%',
          paddingHorizontal: 10,
        }}>
        <View style={{ marginTop: 10, alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.black }}>
            {title}
          </Text>
          <TouchableOpacity onPress={closed} style={{ position: 'absolute', left: 10 }}>
            <AntDesign name="close" size={20} color={colors.black} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onPress(listM.filter((e: any) => e?.checked))} style={{ position: 'absolute', right: 10 }}>
            <Text style={{ fontWeight: 'bold', color: colors.orange }}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {listM.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => handleChangeList(item, index)}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.placeholder_light2,
                    paddingHorizontal: 4,
                    paddingVertical: 7,
                  }}>
                  <Text style={{ fontSize: 15, color: colors.black }}>
                    {item.name}
                  </Text>
                  {item?.checked && <MaterialIcons name="radio-button-checked" size={15} color={colors.orange} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ReactNativeModal>

  );
};

export default ComponentSelectMulti;
