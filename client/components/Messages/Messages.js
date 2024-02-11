// Import necessary components and libraries
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import ChannelListScreen from './ChannelListScreen'; // Import ChannelListScreen
import ChatScreen from './ChatScreen'; // Import ChatScreen


// Initialize StreamChat client
const client = StreamChat.getInstance('YOUR_STREAM_CHAT_API_KEY');

// Set up the navigation stack
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: 'user_id',
          name: 'User Name',
          // Additional user properties
        },
        client.devToken('user_id'),
      );

      // Additional setup if needed
    };

    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, []);

  return (
    <NavigationContainer>
      <OverlayProvider>
        <Chat client={client}>
          <Stack.Navigator>
            <Stack.Screen name="ChannelList" component={ChannelListScreen} options={{ title: 'Channels' }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.channelName })} />
          </Stack.Navigator>
        </Chat>
      </OverlayProvider>
    </NavigationContainer>
  );
}

export default App;

// ChannelListScreen.js
import React from 'react';
import { ChannelList } from 'stream-chat-expo';

function ChannelListScreen({ navigation }) {
  return (
    <ChannelList
      onSelect={(channel) => {
        navigation.navigate('Chat', { channel: channel.id, channelName: channel.data.name || 'Channel' });
      }}
    />
  );
}

export default ChannelListScreen;

// ChatScreen.js
import React from 'react';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';

function ChatScreen({ route }) {
  const { channel } = route.params;
  return (
    <Channel channelId={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

export default ChatScreen;
