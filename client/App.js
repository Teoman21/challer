import { StyleSheet, SafeAreaView } from 'react-native';
import React from "react";

import { AuthProvider } from './context/AuthContext.js';
import AppNav from './navigation/AppNav.js';

const App = () => {

  return (
    <AuthProvider>
      <SafeAreaView style={styles.wrapper}>
        <AppNav/>
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1A2275',
  },
});

export default App;