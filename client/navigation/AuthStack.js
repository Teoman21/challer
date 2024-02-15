import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../components/Login/Login.js';
import SignUp from '../components/SignUp/SignUp.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;