import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext.js';

const { width } = Dimensions.get('window');

const Login = () => {
    const { loginContext } = useContext(AuthContext);
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={() => loginContext(email, password)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: width * 0.8,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: "transparent",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 25,
        color: '#fff',
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
        color: 'red',
        marginTop: 10,
    },
    signUpText: {
        color: '#fff',
        marginTop: 20,
    },
});

export default Login;
