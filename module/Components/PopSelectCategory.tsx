/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import { useAppDispatch } from '../redux/hook';
import { handleGetMenuCategories } from '../screen/Home/HomeApi';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  visible: boolean;
  closed: () => void;
  onChoose: (value: any) => void;
}

const PopSelectCategory: React.FC<Props> = ({ visible, closed, onChoose }) => {

  const dispatch = useAppDispatch();

  const [dataType, setDataTyppe] = useState([]);

  useEffect(() => {
    handleGetMenuCategoryProduct();
  }, []);

  async function handleGetMenuCategoryProduct() {
    let res = await dispatch(handleGetMenuCategories());
    if (res.payload) {
      let tempData: any = [...res.payload];
      setDataTyppe(tempData);
    }
  }

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
            maxHeight: 300,
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {[{ id: -1, name: 'Tất cả' }, ...dataType].map((itemCategory: any) => {
              return (
                <Pressable onPress={() => onChoose({ cate_id: itemCategory.id === -1 ? null : itemCategory })} style={styles.viewTouchable}>
                  <Text style={{ color: colors.black, fontSize: 16, fontWeight: 'bold' }}>{itemCategory.name}</Text>
                  <AntDesign name="right" size={16} color={colors.black} />
                </Pressable>
              );
            })}

            <Pressable onPress={closed} style={styles.viewTouchableNoBorder}>
              <Text style={{ color: colors.error, fontSize: 16, fontWeight: 'bold' }}>Hủy</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
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

export default PopSelectCategory;
