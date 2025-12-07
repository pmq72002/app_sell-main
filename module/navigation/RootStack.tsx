import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTab from './BottomTab';
import CartScreen from '../screen/Cart/CartScreen';
import PaymentScreen from '../screen/Payment/PaymentScreen';
import DetailItem from '../screen/Home/DetailItem';
import LoginScreen from '../screen/Login/LoginScreen';
import RegisterScreen from '../screen/Login/RegisterScreen';
import SearchView from '../screen/Search/SearchView';
import HistoryOrder from '../screen/User/HistoryOrder';
import ChatScreen from '../screen/Chat/ChatScreen';
import UpdatePasswork from '../screen/User/UpdatePassword';
import UpdateUser from '../screen/User/UpdateUser';
import HistoryDetail from '../screen/User/HistoryDetail';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={BottomTab} />
      <Stack.Screen name="DetailItem" component={DetailItem} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="Search"
        component={SearchView}
      />

      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="Chat"
        component={ChatScreen}
      />

      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="Order"
        component={HistoryOrder}
      />

      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="ChangePass"
        component={UpdatePasswork}
      />

      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="UpdateUser"
        component={UpdateUser}
      />

      <Stack.Screen
        options={{
          presentation: 'transparentModal',
        }}
        name="HistoryDetail"
        component={HistoryDetail}
      />
      {/* <Stack.Screen name="Detail" component={DetailJob} />
      <Stack.Screen name="Detail-Company" component={CompanyScreen} /> */}
    </Stack.Navigator>
  );
};

export default RootStack;
