import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";

import Messages from './components/Messages.js';
import Home from './components/Home.js';
import More from './components/More.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="More" component={More} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CHALLER</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,

  },
});

export default App;