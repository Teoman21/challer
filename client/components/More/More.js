import React, { useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context/AuthContext.js'

const MoreScreen = () => {

    const { logoutContext, deleteAccountContext } = useContext(AuthContext);

    const navigation = useNavigation();

    const handleEditProfilePress = () => {
        navigation.navigate('EditProfile');
    };

    const handleSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const handleDeleteAccountPress = () =>{
        deleteAccountContext();
    }

    const handleLogoutPress = () => {
        logoutContext () ;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleEditProfilePress} style={styles.button}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteAccountPress} style={styles.button}>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogoutPress} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: '#007bff', // Use your theme color here
        padding: 15,
        marginVertical: 10,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MoreScreen;