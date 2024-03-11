import React, { useState, useContext, useEffect} from 'react';
import { Button, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, SafeAreaView, Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ENDPOINTS } from "../../config/Config.js";
import { AuthContext } from '../../context/AuthContext.js';

const Stack = createNativeStackNavigator();

// Assuming defaultImage is a local asset. Adjust the path as necessary.
const defaultImage = require('../../data/images/hasbulla.jpeg');


// Profile component
const Profile = ({ navigation }) => {
  const [totalPoints, setTotalPoints] = useState(100);
  const [medals, setMedals] = useState({ gold: 3, silver: 2, bronze: 1 });
  const [activeChallenges, setActiveChallenges] = useState([]);
  const { userToken, userID } = useContext(AuthContext);


  
  useFocusEffect(
      React.useCallback(() => {
          const fetchChallenges = async () => {
              try {
                  const challengeUrl = ENDPOINTS.getChallenge(userID);
                  const response = await fetch(challengeUrl, {
                      method: 'GET',
                      headers: {
                          'Authorization': `Bearer ${userToken}`,
                      },
                  });
                  if (!response.ok) {
                      throw new Error('Failed to fetch challenges');
                  }
                  const data = await response.json();
                  setActiveChallenges(data); // Update state with fetched challenges
              } catch (error) {
                  Alert.alert('Error', 'Failed to load challenges');
                  console.error(error);
              }
          };

          fetchChallenges();
      }, [userID, userToken])
  );

  return (
      <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileSection}>
              <Image source={defaultImage} style={styles.userPhoto} />
              <Text style={styles.points}>Total Points: {totalPoints}</Text>
              <View style={styles.medalsContainer}>
                  <Text style={styles.medalText}>🥇 x {medals.gold}</Text>
                  <Text style={styles.medalText}>🥈 x {medals.silver}</Text>
                  <Text style={styles.medalText}>🥉 x {medals.bronze}</Text>
              </View>
          </View>
          <View style={styles.challengesContainer}>
              <Text style={styles.header}>Active Challenges</Text>
              {activeChallenges.length > 0 ? (
                  activeChallenges.map((challenge, index) => (
                      <View key={index} style={styles.challenge}>
                          <Text style={styles.challengeText}>{challenge.challengeName}</Text>
                      </View>
                  ))
              ) : (
                  <Text>No active challenges.</Text>
              )}
          </View>
          <TouchableOpacity
              style={styles.challengesContainer}
              onPress={() => navigation.navigate('CreateChallenge')}
          >
              <Ionicons name="add-circle" size={64} color="dodgerblue" />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.bellIcon}
              onPress={() => navigation.navigate('BellBox')}
          >
              <Ionicons name="notifications-outline" size={24} color="dodgerblue" />
          </TouchableOpacity>
      </ScrollView>
  );
};

// CreateChallenge component
const CreateChallenge = ({ navigation }) => {
  // State hooks for form inputs
  const [challengeName, setChallengeName] = useState('');
  const [pot, setPot] = useState('');
  const [duration, setDuration] = useState('');
  const [usernames, setUsernames] = useState('');

  // Context for accessing user token and ID
  const { userToken, userID } = useContext(AuthContext);

  // Function to invite users to a challenge
  const inviteUser = async (challengeId, usernamesArray) => {
    try {
      const inviteResponse = await fetch(ENDPOINTS.inviteToChallenge(challengeId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ usernames: usernamesArray }),
      });

      const inviteData = await inviteResponse.json();
      if (!inviteResponse.ok) {
        throw new Error(inviteData.message || 'Failed to invite users');
      }

      console.log('Users invited successfully:', inviteData);
    } catch (error) {
      console.error('Invitation Error:', error.message);
      Alert.alert('Invitation Error', error.message);
    }
  };

  // Function to handle creating the challenge and inviting users
  const handleCreateAndInvite = async () => {
    if (!challengeName || !pot || !duration || !usernames.trim()) {
      Alert.alert('Validation Error', 'Please fill all fields, including usernames.');
      return;
    }

    const parsedUsernames = usernames.split(',').map(username => username.trim());

    try {
      const challengeData = {
        challengeName,
        initialPotAmount: parseInt(pot, 10),
        creatorId: userID,
        startDate: new Date(),
        duration: parseInt(duration, 10),
      };

      const createResponse = await fetch(ENDPOINTS.CREATE_CHALLENGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(challengeData),
      });

      const createdChallenge = await createResponse.json();
      if (!createResponse.ok) {
        throw new Error(createdChallenge.message || 'Failed to create the challenge');
      }

      console.log('Challenge Created Successfully:', createdChallenge);

      // Invite users to the challenge
      await inviteUser(createdChallenge._id, parsedUsernames); // Correctly pass all usernames as an array

      Alert.alert('Success', 'Challenge created and invitations sent successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Challenge Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter challenge name"
        value={challengeName}
        onChangeText={setChallengeName}
      />
      <Text style={styles.label}>Enter the pot:</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter the pot'
        value={pot}
        onChangeText={setPot}
      />
       <Text style={styles.label}>Duration (Days):</Text>
        <TextInput
                style={styles.input}
                placeholder="Enter duration in days"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric" // Ensure numeric input
        />
        <Text style={styles.label}>Usernames (comma-separated):</Text>
        <TextInput
                style={styles.input}
                placeholder="Enter usernames, separated by commas"
                value={usernames}
                onChangeText={setUsernames}
                autoCapitalize="none" // Since usernames are typically case-sensitive and lowercase
        />
      <Button title="Create Challenge" onPress={handleCreateAndInvite} />
    </View>
    
  );
};



const BellBox = () => {
  const { userToken, userID } = useContext(AuthContext);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const url = ENDPOINTS.getInvitations(userID);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Could not fetch invitations');
        setInvitations(data);
      } catch (error) {
        Alert.alert('Fetch Error', error.message);
      }
    };
    fetchInvitations();
  }, [userID, userToken]);

  const acceptInvitation = async (challengeId) => {
    try {
      const url = ENDPOINTS.acceptInvitation(challengeId);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId: userID }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not accept invitation');
      Alert.alert('Success', 'Invitation accepted successfully');
      // Consider refreshing invitations here
    } catch (error) {
      Alert.alert('Acceptance Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={invitations}
        keyExtractor={item => item._id.toString()} // Ensure your items have an _id field
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.challengeName || 'No Name'}</Text>
            <Button title="Accept" onPress={() => acceptInvitation(item._id)} />
          </View>
        )}
      />
    </View>
  );
};


// Home component that contains the Stack Navigator
const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateChallenge" component={CreateChallenge} options={{ title: 'Create Challenge' }} />
      <Stack.Screen name="BellBox" component={BellBox} options={{ title: 'Notifications' }} />
    </Stack.Navigator>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  safeArea:{
    flex:1,
  },
  container: {
    flexGrow: 1, // Use flexGrow in ScrollView to fill the space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  userPhoto: {
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medalsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  medalText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  challengesContainer: {
    width: '100%',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  challenge: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  challengeText: {
    fontSize: 16,
  },
  createChallengeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  pot:{
    fontSize: 16,
    marginBottom: 10,
  },
  bellIcon: {
    position: 'absolute', 
    top: 10, 
    right: 10, 
    zIndex: 1, 
},
});

export default Home;

