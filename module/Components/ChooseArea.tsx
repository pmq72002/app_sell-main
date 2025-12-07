/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

function ChooseArea({list, onPress}: {list: any; onPress: (item: any) => {}}) {
  return (
    <View style={{flex: 1, marginHorizontal: 15, marginVertical: 15}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {list.map((item: any) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => onPress(item)}
              style={{
                backgroundColor: colors.placeholder_light2,
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{item.name}</Text>
              <AntDesign name="right" size={16} color={colors.black} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ChooseArea;
