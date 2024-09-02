import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

export default function AboutScreen() {
  const handleContactPress = () => {
    const phoneNumber = 'tel:+919865336223'; // Replace with the desired phone number
    Linking.openURL(phoneNumber).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>About Us</Text>
        <Image
          source={require('./nitro.jpg')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.description}>
          Welcome to our application! We are dedicated to providing the best
          solutions to improve accessibility and communication. Our project aims
          to enhance the quality of life for individuals with hearing impairments
          by integrating advanced technology and user-friendly designs. Stay tuned
          for more updates and features!
          Our team is constantly working to innovate and bring new solutions to
          the market, ensuring that our users have the tools they need to succeed.
          We believe in the power of technology to break down barriers and create
          inclusive communities.
        </Text>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#e8f5e9', // Light green background
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center', // Center items inside the container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green text
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#1b5e20', // Darker green text
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 0, // Ensure no additional margin above the description
    marginBottom: 20, // Add space below the description
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10, // Remove the margin to eliminate space below the logo
  },
  contactButton: {
    backgroundColor: '#81c784', // Lighter green for button
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
