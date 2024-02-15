import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native'

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
            navigation.goBack(); // Navigate back on success
        } catch (e) {
            setError(e.message); // Handle error
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: width * 0.8,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10
    },
    errorText: {
        color: 'red',
        marginTop: 10
    }
});

export default SignUp;
