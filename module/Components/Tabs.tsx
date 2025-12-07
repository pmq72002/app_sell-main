/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../styles/colors';

interface ItemTabsProp {
  id: number;
  tittle: string;
  active: boolean;
}

interface TabsProps {
  dataTabs: ItemTabsProp[];
  handleActiveTab: (index: number) => void;
}

const TabsComponent: React.FC<TabsProps> = ({ dataTabs, handleActiveTab }) => {
  const window = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {dataTabs.map((item, index) => {
        return (
          <View
            key={item.id}
            style={[
              css.item,
              item.active ? css.itemActive : null,
              { width: window.width / dataTabs.length },
            ]}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => handleActiveTab(index)}>
              <Text
                style={{
                  color: item.active ? colors.secondMain : colors.dark,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {item.tittle}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default TabsComponent;

const css = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
  itemActive: {
    borderBottomColor: colors.secondMain,
    borderBottomWidth: 2.5,
  },
});
