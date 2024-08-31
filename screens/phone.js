import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from './firebaseConfig';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

export default function PhoneScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const recaptchaVerifier = useRef(null);

  const sendOTP = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
      setVerificationId(verificationId);
      setMessage('OTP sent successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      setMessage('Phone number verified successfully!');
      navigation.navigate('Main'); // Navigate to Main screen upon success
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* The reCAPTCHA container is not used in this example */}
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ marginBottom: 20, borderWidth: 1, padding: 10 }}
      />
      <Button title="Send OTP" onPress={sendOTP} />

      {verificationId && (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            style={{ marginBottom: 20, borderWidth: 1, padding: 10 }}
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}

      {message ? <Text style={{ marginTop: 20 }}>{message}</Text> : null}
    </View>
  );
}
