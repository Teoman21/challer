import React, { useState } from 'react';
import { Text ,FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';

import users from '../../data/dummyUsers';


const Stack = createStackNavigator();
/*
const users = [
  { id: '1', name: 'Mark' },
  { id: '2', name: 'Elon' },
  { id: '3', name: 'Bill' },
];
*/


const initialMessages = {
  'Elon Musk': [
    {
      _id: 1,
      text: `Hello, this is a static message from Elon Musk.`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Elon Musk',
      },
    },
  ],
  'Mark Zuckerberg': [
    {
      _id: 2,
      text: `Hello, this is a static message from Mark Zuckerberg.`,
      createdAt: new Date(),
      user: {
        _id: 3,
        name: 'Mark Zuckerberg',
        },
    },
  ],
  'Ye': [
    {
      _id: 3,
      text: `🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐🐐.`,
      createdAt: new Date(),
      user: {
        _id: 4,
        name: 'Ye',
      },
    },
  ],
  'Serena Williams': [
    {
      _id: 4,
      text: `Hello, this is a static message from Serena Williams.`,
      createdAt: new Date(),
      user: {
        _id: 5,
        name: 'Serena Williams',
      },
    },
  ],
  'Bill Gates': [
    {
      _id: 5,
      text: `Hello, this is a static message from Bill Gates.`,
      createdAt: new Date(),
      user: {
        _id: 6,
        name: 'Bill Gates',
      },
    },
  ],
  'Leo Messi': [
    {
      _id: 6,
      text: `ANKARA MEEEESSIII`,
      createdAt: new Date(),
      user: {
        _id: 7,
        name: 'Leo Messi',
      },
    },
  ],
  'Hasbulla': [
    {
      _id: 5,
      text: `Priviyet from Hasbulla.`,
      createdAt: new Date(),
      user: {
        _id: 6,
        name: 'Hasbulla',
      },
    },
  ],

};

const UserList = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      style={styles.background}
      data={users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.userItem}
          onPress={() => navigation.navigate('UserChat', { userName: item.name })}
        >
          <Text style={styles.userName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
const UserChat = ({ route }) => {
  const { userName } = route.params;
 
  //Using useState(), messages is our state's current value, and setMessages updates it. 
  const [messages, setMessages] = useState(initialMessages[userName] || []);
  //initialMessages[userName] fetches messages for a specific user. 
  //If no messages exist for the user, an empty array [] is used as a fallback.
  const handleSend = (newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => handleSend(newMessages)}
      user={{
        _id: 1,
        name: 'You',
        //avatar:'../data/images/markzuckerberg.jpg',
      }}
      placeholder={`Message ${userName}...`}
    />
  );
};

const Messages = () => {
  return (
    <Stack.Navigator initialRouteName="UserList">
      <Stack.Screen name="UserList" component={UserList} options={{ title: 'Users' }} />
      <Stack.Screen name="UserChat" component={UserChat} options={({ route }) => ({ title: route.params.userName })} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection:"row",
    alignItems:"center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    }},
  background:{
    flex:1,
    backgroundColor: "white"
    
  },
  userName:{
    flex:1,
    color:"black"
  },
  profile:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15, 
  }
  ,

});

export default Messages;