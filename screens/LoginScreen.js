import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
// Import the GoogleSignInButton

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sign-Up successful!');
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isSignUp ? 'Sign Up' : 'Login'}
        onPress={isSignUp ? handleSignUp : handleLogin}
        color="#2ecc71" // Updated to green
      />
      <Text
        style={styles.switchText}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </Text>
      {/* Add Google Sign-In Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27ae60', // Updated to green
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchText: {
    marginTop: 15,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
