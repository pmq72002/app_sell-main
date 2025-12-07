/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import colors from '../styles/colors';

interface ViewContainerProp {
  children: React.ReactNode;
}

const ViewContainer: React.FC<ViewContainerProp> = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <SafeAreaView style={{ backgroundColor: colors.white }} />
      <SafeAreaView style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export default ViewContainer;
