import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text ,FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

import { AuthContext } from '../../context/AuthContext';
import { ENDPOINTS, SOCKET_URL } from '../../config/Config';

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
        if (!response.ok) throw new Error('Failed to fetch challenges');
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        Alert.alert('Error', error.toString());
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
  const { challengeId } = route.params;
  const { userToken, userID } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket only once
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        query: { token: userToken },
        transports: ['websocket'], // Use WebSocket for transport
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
        socketRef.current.emit('joinRoom', { challengeId });
      });

      socketRef.current.on('newMessage', (newMessage) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
      });

      // Fetch historical messages
      fetchMessages();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [challengeId, userToken, userID]); // Ensure reconnection if these values change

  const fetchMessages = async () => {
    try {
      const response = await fetch(ENDPOINTS.getMessage(challengeId), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const { data } = await response.json();
    if (data) {
      // Sort messages by date descending before setting them
      const sortedMessages = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMessages(sortedMessages.map(formatMessage));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSend = (newMessages = []) => {
    const message = newMessages[0];
    if (message && message.text && socketRef.current) {
      socketRef.current.emit('sendMessage', {
        challengeId,
        text: message.text,
        senderId: userID, // This might not be necessary if your server extracts the sender ID from the token
      });
    }
  };
  

  // Helper to format message
  const formatMessage = (msg) => {
    const isCurrentUserMessage = msg.senderId === userID;
  
    return {
      _id: msg._id,
      text: msg.text,
      createdAt: new Date(msg.createdAt),
      user: {
        _id: isCurrentUserMessage ? userID : msg.senderId._id, // corrected line
        name: isCurrentUserMessage ? 'You' : msg.senderFullName || 'Unknown',
      },
    };
  };
  
  
  


  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{ 
        _id: userID, 
        name: 'You' }}
      placeholder="Type a message..."
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