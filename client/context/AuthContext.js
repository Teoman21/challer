import React, { createContext, useState, useEffect, useDeferredValue } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ENDPOINTS } from "../config/Config";

// create and export the context (so we can access it from any file)
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const loginContext = async (email, password) => {
        setIsLoading(true);
        try{
            const response = await axios.post(ENDPOINTS.LOGIN, {
                email,
                password
            });
            console.log("LOGIN ATTEMPT: ",response.data.message);
            if(response.data && response.data.token && response.data.userId) {
                const { token, userId } = response.data;
                setUserToken(token);
                setUserID(userId);
                //setUserInfo(userDetails);
                await AsyncStorage.setItem('userToken', JSON.stringify(token));
                await AsyncStorage.setItem('userId', JSON.stringify(userId));
                //await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
            } else {
                console.log('Login failed', response.data.message);
                setUserToken(null);
            }
        } catch (error) {
            console.log(`Login error: ${error}`);
            setUserToken(null);
        }
        setIsLoading(false);
    };

    const signUpContext = async (email, password, fullName, username) => {
        setIsLoading(true);
        try {
            const response = await axios.post(ENDPOINTS.SIGN_UP, {
                email,
                password,
                username,
                fullName
            });
            console.log("SIGNUP ATTEMPT: ", response.data.message);
            if(response.data && response.data.token && response.data.userId) {
                const { token, userId } = response.data;
                setUserToken(token);
                setUserID(userId);
                // Optionally set user info if your backend returns it
                await AsyncStorage.setItem('userToken', JSON.stringify(token));
                await AsyncStorage.setItem('userId', JSON.stringify(userId));
                // Navigate to the app's main flow or show a success message
            } else {
                console.log('Signup failed', response.data.message);
                // Handle signup failure, e.g., by setting an error state
            }
        } catch (error) {
            console.log(`Signup error: ${error}`);
            // Handle errors, e.g., by setting an error state
        }
        setIsLoading(false);
    };

    const deleteAccountContext = async () => {
        setIsLoading(true);
        try {
            // Assuming the DELETE endpoint for deleting an account is '/auth/deleteAccount' and requires a Bearer token
            const response = await axios.delete(ENDPOINTS.DELETE_ACCOUNT, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log("DELETE ACCOUNT ATTEMPT: ", response.data.message);
            // Handle successful account deletion
            if(response.status === 200) {
                logoutContext(); // Clean up local state and storage
                // Navigate to the login screen or show a success message
            } else {
                console.log('Delete account failed', response.data.message);
                // Handle deletion failure, e.g., by showing an error message
            }
        } catch (error) {
            console.log(`Delete account error: ${error}`);
            // Handle errors, e.g., by showing an error message
        }
        setIsLoading(false);
    };

    

    const logoutContext = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userId');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            
            // Parse the userToken since AsyncStorage stores data as a string
            userToken = userToken != null ? JSON.parse(userToken) : null;
            let savedUserId = await AsyncStorage.getItem('userId');
            //let savedUserDetails = await AsyncStorage.getItem('userDetails');
            savedUserId = savedUserId != null ? JSON.parse(savedUserId) : null;
            //savedUserDetails = savedUserDetails != null ? JSON.parse(savedUserDetails) : null;
            console.log("---------- AuthContext.js: isLoggedIn --------------");
            console.log("Extracted UserID: " ,savedUserId);
            //console.log("Extracted UserDetails: " ,userInfo);
            console.log("Extracted userToken: " ,userToken);
            console.log("----------------------------------------------------");
            setUserID(savedUserId);
            setUserToken(userToken);
            //setUserInfo(savedUserDetails);
            setIsLoading(false);
        } catch (error) {
            console.log(`isLoggedIn error: ${error}`);
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{loginContext, logoutContext, signUpContext, deleteAccountContext, isLoading, userToken, userID}}>
            {children}
        </AuthContext.Provider>
    );
} 