import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const ChatbotScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.messageContainer}>
          <View style={styles.userMessage}>
            <Text style={styles.messageText}>Hello! How can I help you today?</Text>
          </View>
          <View style={styles.botMessage}>
            <Text style={styles.messageText}>I'm looking for information about your services.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#a3c1ad"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9', // Light green background
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    flex: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#81c784', // Lighter green for user messages
    borderRadius: 8,
    padding: 8, // Reduced padding
    marginVertical: 4, // Reduced vertical margin
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#a5d6a7', // Even lighter green for bot messages
    borderRadius: 8,
    padding: 8, // Reduced padding
    marginVertical: 4, // Reduced vertical margin
    maxWidth: '80%',
  },
  messageText: {
    color: '#fff',
    marginTop:20,
    fontSize: 14, // Reduced font size
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#a5d6a7',
    padding: 10,
    backgroundColor: '#e8f5e9',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#81c784',
    borderRadius: 8,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatbotScreen;
