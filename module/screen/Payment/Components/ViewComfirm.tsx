/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../styles/colors';

const ViewCofnirm = ({ closed, submit, loading }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.black, opacity: 0.6, zIndex: 1 },
        ]}
      />

      <View style={styles.body}>
        <View style={{ width: '100%', maxHeight: 300, backgroundColor: colors.white, borderRadius: 10, padding: 10, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.black }}>Xác nhận thanh toán</Text>

          <TouchableOpacity disabled={loading} onPress={submit} style={{ backgroundColor: colors.green, width: '100%', paddingVertical: 7, marginVertical: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
            {loading ? <ActivityIndicator size={'small'} color={colors.white} /> : <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>Đồng ý</Text>}
          </TouchableOpacity>

          <TouchableOpacity disabled={loading} onPress={closed}>
            <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', color: colors.black, fontSize: 16 }}>Hủy</Text>
          </TouchableOpacity>
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
});

export default ViewCofnirm;
