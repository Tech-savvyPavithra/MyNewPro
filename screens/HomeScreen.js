import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/back2.jpg')} // Replace with your background image path
      style={styles.background}
      resizeMode="cover" 
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to the Home Page</Text>
          </View>
          <Image
            source={require('./nitro.jpg')} // Replace with your logo path
            style={styles.logo}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Crop')}
            >
              <ImageBackground
                source={require('../assets/crop.jpg')} // Replace with your button background image path
                style={styles.buttonBackground}
                resizeMode="cover"
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Crop Recommendation</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Weather')}
            >
              <ImageBackground
                source={require('../assets/weather.jpg')} // Replace with your button background image path
                style={styles.buttonBackground}
                resizeMode="cover"
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Weather</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('News')}
            >
              <ImageBackground
                source={require('../assets/news.jpg')} // Replace with your button background image path
                style={styles.buttonBackground}
                resizeMode="cover"
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>News</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Chatbot')}
            >
              <ImageBackground
                source={require('../assets/chatbot.jpg')} // Replace with your button background image path
                style={styles.buttonBackground}
                resizeMode="cover"
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Chatbot</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#102011',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 150,
    borderRadius: 10, // Rounded corners
    marginBottom: 10,
    overflow: 'hidden', // Ensures content doesn't overflow rounded corners
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Matches the button's rounded corners
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  buttonText: {
    color: '#004d00',
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
