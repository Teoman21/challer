import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

// Assuming defaultImage is a local asset. Adjust the path as necessary.
const defaultImage = require('../../data/images/hasbulla.jpeg');


// Profile component
const Profile = ({ navigation }) => {
  const [totalPoints, setTotalPoints] = useState(100);
  const medals = {
    gold: 3,
    silver: 2,
    bronze: 1,
  };
  const activeChallenges = [
    { name: 'Gym bros 1' },
    { name: ' Book reading' },
    { name: ' Study harder' },
  ];

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
        {activeChallenges.map((challenge, index) => (
          <View key={index} style={styles.challenge}>
            <Text style={styles.challengeText}>{challenge.name}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.createChallengeButton}
        onPress={() => navigation.navigate('CreateChallenge')}
      >
        <Ionicons name="add-circle" size={64} color="dodgerblue" />
      </TouchableOpacity>
    </ScrollView>
  );
};

// CreateChallenge component
const CreateChallenge = ({ navigation }) => { // Ensure navigation is received as a prop
  const [challengeName, setChallengeName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [pot, setPot] = useState('');

  const handleCreate = () => {
    console.log(`Creating challenge: ${challengeName} with user: ${userPhone} and pot: ${pot}`);
    navigation.goBack();
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
      <Text style={styles.label}>Add User (Tel):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter user's phone number"
        keyboardType="phone-pad"
        value={userPhone}
        onChangeText={setUserPhone}
      />
      <Text style={styles.label}>Enter the pot:</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter the pot'
        value={pot}
        onChangeText={setPot}
      />
      <Button title="Create Challenge" onPress={handleCreate} />
    </View>
  );
};

// Home component that contains the Stack Navigator
const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="CreateChallenge" component={CreateChallenge} options={{ title: 'Create Challenge' }} />
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
});

export default Home;

