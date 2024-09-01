import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import emailjs from "emailjs-com";

export default function ContactScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    // Validate the input fields
    if (!firstName || !lastName || !email || !number || !message) {
      Alert.alert("Error", "All fields are required.", [{ text: "OK" }]);
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const templateParams = {
      name: fullName,
      email: email,
      number: number,
      message: message,
      to_email: "221001038@rajalakshmi.edu.in", // Change to your recipient email
    };

    // Log templateParams for debugging
    console.log('Sending email with params:', templateParams);

    emailjs
      .send("service_hq7uqp4", "template_oogp3xp", templateParams, "GJP9n-vQDPeQu2vXa")
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        Alert.alert(
          "Success",
          "Your message has been successfully sent!",
          [{ text: "OK" }]
        );
        // Clear input fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setNumber("");
        setMessage("");
      })
      .catch((err) => {
        console.error('Failed to send email:', err); // Log error for debugging
        Alert.alert(
          "Error",
          "Your message could not be sent. Please try again later.",
          [{ text: "OK" }]
        );
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={number}
        keyboardType="phone-pad"
        onChangeText={setNumber}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <Button title="Send" onPress={sendEmail} color="#388e3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: '#f0f4f1', // Light green background for better contrast
  },
  input: {
    height: 40,
    borderColor: "#388e3c", // Green border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  textArea: {
    height: 100,
    borderColor: "#388e3c", // Green border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    textAlignVertical: "top",
  },
});
