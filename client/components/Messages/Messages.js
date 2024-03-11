import React, { useState, useEffect, useContext } from 'react';
import { Text ,FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';

import { AuthContext } from '../../context/AuthContext';
import { ENDPOINTS } from '../../config/Config';



const Stack = createStackNavigator();


const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const { userToken, userID } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengeUrl = ENDPOINTS.getChallenge(userID); 
        const response = await fetch(challengeUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json', 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        const data = await response.json();
        //console.log("Fetched challenges ", data);
        setChallenges(data); 
      } catch (error) {
        console.error("Error fetching challenges:", error);
        Alert.alert('Error', 'Failed to load challenges');
      }
    };

    fetchChallenges();
  }, [userID, userToken]);
  
  return (
    <FlatList
      style={styles.background}
      data={challenges}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.userItem}
          onPress={() => navigation.navigate('ChallengeChat', { challengeId: item._id, challengeName: item.name })}
        >
          <Text style={styles.userName}>{item.challengeName}</Text>
        </TouchableOpacity>
      )}
    />
  );
};


const ChallengeChat = ({ route }) => {
  const { challengeId, challengeName } = route.params;
  const { userToken, userID } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(ENDPOINTS.getMessage(challengeId), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (!data.data) {
          setMessages([]); // If no messages are returned, set an empty array
          return;
        }
        const formattedMessages = data.data.map((msg) => {

          const isCurrentUserMessage = msg.senderId._id.toString() === userID.toString();

          return {
            _id: msg._id,
            text: msg.text,
            createdAt: new Date(msg.createdAt),
            user: {
              _id: msg.senderId._id,
              name: isCurrentUserMessage ? 'You' : msg.senderFullName || 'Unknown',
            
            },
          };
        }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());//sorted time as as earlier is above

        
        setMessages(formattedMessages);

      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Error fetching messages:", error.toString());
      }
    };

    fetchMessages();
  }, [challengeId, userToken]);

  const handleSend = async (newMessages = []) => {
    const sentMessage = newMessages[0];
    if (!sentMessage || !sentMessage.text) {
      console.error("No message to send");
      return;
    }
    try {
      const response = await fetch(ENDPOINTS.SEND_MESSAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          challengeId,
          text: sentMessage.text,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // It's crucial that this data structure matches your server's response
        const newMessage = {
          _id: data.data._id || data._id, // Depending on your server response structure
          text: data.data.text || data.text,
          createdAt: new Date(data.data.createdAt || data.createdAt),
          user: {
            _id: userID, // Assuming this is the ID of the logged-in user
            name: 'You', // Name for the logged-in user
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
      } else {
        // If response is not okay, handle it with the message provided by the server or a default message
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error sending message:", error.message || error.toString());
    }
  };
  
  

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: userID,
        name: 'You', // Replace with user's name if you have it
        // Add avatar property if you have it
      }}
      placeholder={`Write a message`}
    />
  );
};


const Messages = () => {
  return (
    <Stack.Navigator initialRouteName="ChallengeList">
      <Stack.Screen name="ChallengeList" component={ChallengeList} options={{ title: 'Challenges' }} />
      <Stack.Screen name="ChallengeChat" component={ChallengeChat} options={({ route }) => ({ title: route.params.challengeName })} />
    </Stack.Navigator>
  );
};


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