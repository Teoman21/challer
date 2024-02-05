import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";

import Messages from './components/Messages/Messages.js';
import More from './components/More/More.js';
import Home from './components/Home/Home.js';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Swipe"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Messages') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
              } else if (route.name === 'More') {
                iconName = focused ? 'apps' : 'apps-outline';
              } 
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#1A2275', // Set the background color
              borderTopColor: 'gray',
            },
            tabBarItemStyle: {
              borderLeftWidth: 1, // Border between each item
              borderLeftColor: 'gray',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen name="More" component={More} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1A2275',
  },
});

export default App;