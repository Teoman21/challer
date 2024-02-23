import React, { useState, useContext } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from '../../context/AuthContext.js';

const { width } = Dimensions.get('window');

const SignUp = () => {
    const { signUpContext } = useContext(AuthContext);
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            await signUpContext(email, password, fullName, phoneNumber);
            navigation.goBack();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#fff"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#fff"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    formContainer: {
        width: width * 0.9,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    button: {
        width: width * 0.8,
        backgroundColor: '#ff8c00',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'yellow',
        marginTop: 10,
    },
});

export default SignUp;
