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
    const fullName = `${firstName} ${lastName}`;
    const emailBody = `Name: ${fullName}\nEmail: ${email}\nMobile No: ${number}\nMessage: ${message}`;

    const templateParams = {
      name: fullName,
      email: email,
      number: number,
      message: message,
    };

    emailjs
      .send("service_id", "template_id", templateParams, "user_id")
      .then((response) => {
        Alert.alert(
          "Successful!",
          "Your Message Successfully Received!",
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
        Alert.alert(
          "Something Went Wrong",
          "Your Message Could Not Be Sent!",
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
      <Button title="Send" onPress={sendEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    textAlignVertical: "top",
  },
});
