import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/back2.jpg')} // Replace with your background image path
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <Image
          source={require('./nitro.jpg')} // Replace with your logo path
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to the Home Page</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Weather')}
          >
            <Text style={styles.buttonText}>Weather</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('News')}
          >
            <Text style={styles.buttonText}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chatbot')}
          >
            <Text style={styles.buttonText}>Chatbot</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensure the background covers the entire screen
    resizeMode: 'cover', // Cover the screen with the background image
    justifyContent: 'center', // Center the content
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color:  '#102011', // Darker green text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    width: '100%', // Full width for buttons
    backgroundColor: '#5ca84e', // Button color
    padding: 15, // Padding for button
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center content horizontally
    marginBottom: 10, // Space between buttons
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});

export default HomeScreen;
