/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { screenOptions } from '../styles/ScreenOption';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchView from '../screen/Search/SearchView';
import HomeScreen from '../screen/Home/HomeScreen';
import UserScreen from '../screen/User/UserScreen';
import CartScreen from '../screen/Cart/CartScreen';
import ChatScreen from '../screen/Chat/ChatScreen';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name={'Home'}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="home" size={20} color={focused ? colors.secondMain : colors.black} />
                <Text style={{ fontSize: 14, color: focused ? colors.secondMain : colors.black }}>Trang chủ</Text>
              </TouchableOpacity>
            );
          },
          tabBarHideOnKeyboard: true,
          // tabBarStyle: {display: !visibleTabWork ? 'none' : 'flex'},
        })}
        component={HomeScreen}
      />

      <Tab.Screen
        name={'Cart'}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="shoppingcart" size={20} color={focused ? colors.secondMain : colors.black} />
                <Text style={{ fontSize: 14, color: focused ? colors.secondMain : colors.black }}>Giỏ hàng</Text>
              </TouchableOpacity>
            );
          },
          tabBarHideOnKeyboard: true,
          // tabBarStyle: {display: !visibleTabWork ? 'none' : 'flex'},
        })}
        component={CartScreen}
      />

      <Tab.Screen
        name={'Auth'}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="user" size={20} color={focused ? colors.secondMain : colors.black} />
                <Text style={{ fontSize: 14, color: focused ? colors.secondMain : colors.black }}>Tài khoản</Text>
              </TouchableOpacity>
            );
          },
          tabBarHideOnKeyboard: true,
          // tabBarStyle: {display: !visibleTabWork ? 'none' : 'flex'},
        })}
        component={UserScreen}
      />


    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  labelActive: {
    color: colors.yellow,
  },
  middleIcon: {
    bottom: 18,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: colors.main,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  badge: {
    position: 'absolute',
    right: 12,
    zIndex: 9,
  },
});

export default BottomTab;
