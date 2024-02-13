import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../../context/AuthContext.js';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const { loginContext } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <View style={styles.container}>
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
            <Button title="Login" onPress={() => loginContext(email, password)} />
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

export default Login;