import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

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
      <Image
        source={require('../assets/login1.png')} // Replace with your image path
        style={styles.logo}
      />
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
        {isSignUp 
          ? "Already have an account? " 
          : "Don't have an account? "} 
        <Text style={styles.switchTextHighlight}>
          {isSignUp ? 'Log in' : 'Sign up'}
        </Text>
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
    padding: 20,
  },
  logo: {
    width: 320,
    height: 320,
    marginBottom: 10, // Space between the image and title
  },
  title: {
    fontSize: 28,
    fontStyle:'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchText: {
    fontSize:19,
    marginTop: 15,
    color: '#fff',
    // Optional: to match the underlined style
  },
  switchTextHighlight: {
    fontSize:19,
    fontWeight: 'bold',
    color: '#004d00', // Dark green color for the login/signup text
  },
});
