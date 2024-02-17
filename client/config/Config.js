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
    BASE_URL = 'https://your-production-api.com';// will be handled later
}

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGN_UP: `${BASE_URL}/auth/signup`,
    // other endpoint will go here
};
