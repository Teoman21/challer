import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const defaultImage = require('../../data/images/hasbulla.jpeg');


const Home = ({ navigation }) => {
  const [totalPoints, setTotalPoints] = React.useState(100);
  // Example medal counts
  const medals = {
    gold: 3,
    silver: 2,
    bronze: 1,
  };

  // Placeholder for active challenges
  const activeChallenges = [
    { name: 'Challenge 1' },
    { name: 'Challenge 2' },
    { name: 'Challenge 3' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={ defaultImage } // Placeholder image URL
          style={styles.userPhoto}
        />
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
        onPress={() => navigation.navigate('CreateChallenge')}// WWill be implemented later this page
      >
        <Ionicons name="add-circle" size={64} color="dodgerblue" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
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
});

export default Home;
