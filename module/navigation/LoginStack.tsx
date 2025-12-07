/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/Login/LoginScreen';
import RegisterScreen from '../screen/Login/RegisterScreen';

const Stack = createStackNavigator();
const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name='ResetPassword'/> */}
    </Stack.Navigator>
  );
};

export default LoginStack;
