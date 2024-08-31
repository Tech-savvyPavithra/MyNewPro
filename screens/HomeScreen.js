import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Contact"
          onPress={() => navigation.navigate('Contact')}
        />
        <Button
          title="Weather"
          onPress={() => navigation.navigate('Weather')}
        />
        <Button
          title="News"
          onPress={() => navigation.navigate('News')}
        />
        <Button
          title="Chatbot"
          onPress={() => navigation.navigate('Chatbot')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default HomeScreen;
