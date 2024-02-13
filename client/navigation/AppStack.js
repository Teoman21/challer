import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// IMPORT APP SCREENS
import Messages from '../components/Messages/Messages.js';
import Home from '../components/Home/Home.js';
import MoreStackNavigator from '../components/More/More.js';

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
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
            <Tab.Screen name="More" component={MoreStackNavigator} />
          </Tab.Navigator>
    );
};

export default AppStack;