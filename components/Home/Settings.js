import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const defaultImage = require('../../data/images/hasbulla.jpeg');

const SettingsPage = ({ navigation }) => {
  // Example user data (replace with your actual user data)
  const user = {
    name: 'Hasbulla Magomedov',
    username: 'hasbik',
    bio: 'I want to punish Conor McGregor, he talks too much.'
    // Add more user data such as profile photo URL if needed
  };

  // Function to handle navigation back to the home page
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Profile photo */}
      <Image
        source={ defaultImage }
        style={styles.profilePhoto}
      />

      {/* Name */}
      <Text style={styles.name}>{user.name}</Text>

      {/* Username */}
      <Text style={styles.username}>@{user.username}</Text>

      {/* Bio */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {/* Button to navigate back to home page */}
      <TouchableOpacity
        onPress={navigateBack}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  username: {
    fontSize: 16,
    marginBottom: 10
  },
  bioContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  bioText: {
    fontSize: 14
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5
  },
  backButtonText: {
    fontSize: 16,
    color: 'white'
  }
});

export default SettingsPage;
