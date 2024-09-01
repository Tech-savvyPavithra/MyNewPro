import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Video } from 'expo-av'; // Import Video component from expo-av

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Video
        source={{ uri: 'https://drive.google.com/uc?export=download&id=15Cy9Rq4CKQVAyXNxwZlWzgWRBzm75rj9' }} // Replace with your direct video URL
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      <Text style={styles.description}>
        Welcome to our application! We are dedicated to providing the best
        solutions to improve accessibility and communication. Our project aims
        to enhance the quality of life for individuals with hearing impairments
        by integrating advanced technology and user-friendly designs. Stay tuned
        for more updates and features!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e8f5e9', // Light green background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green text
    marginBottom: 20,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#1b5e20', // Darker green text
    textAlign: 'center',
  },
});
