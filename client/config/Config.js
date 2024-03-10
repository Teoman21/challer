// Example config.js
import { Platform } from 'react-native';
import Constants from 'expo-constants';

let BASE_URL;

if (__DEV__) {
    const isSimulatorOrEmulator = Platform.OS === 'ios' && !Constants.isDevice || Platform.OS === 'android' && !Constants.isDevice;
    if (Platform.OS === 'ios' && isSimulatorOrEmulator) {
        BASE_URL = 'http://localhost:3030';
    } else if (Platform.OS === 'android' && isSimulatorOrEmulator) {
        BASE_URL = 'http://10.0.2.2:3030';
    } else {
        BASE_URL = 'http://192.168.1.7:3030'; // Replace with your LAN IP for physical device testing
    }
} else {
    BASE_URL = 'https://your-production-api.com'; // will be handled later
}

// Define functions for endpoints that need to incorporate dynamic values
const getChallengeEndpoint = (userID) => `${BASE_URL}/api/challenge/getChallenge/${userID}`;
const inviteToChallengeEndpoint = (challengeId) => `${BASE_URL}/api/challenge/${challengeId}/invite`;
const acceptInvitationEndpoint = (challengeId) => `${BASE_URL}/api/challenge/${challengeId}/accept`;
const getInvitationsEndpoint = (userId) => `${BASE_URL}/api/challenge/${userId}/invitations`;

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGN_UP: `${BASE_URL}/auth/signup`,
    DELETE_ACCOUNT: `${BASE_URL}/auth/deleteAccount`,
    CREATE_CHALLENGE: `${BASE_URL}/api/challenge/createChallenge`,
    // Other endpoints as constants
    // Dynamic endpoint as a function
    getChallenge: getChallengeEndpoint,
    inviteToChallenge: inviteToChallengeEndpoint,
    acceptInvitation: acceptInvitationEndpoint,
    getInvitations: getInvitationsEndpoint,
    // other endpoint functions will go here
};
