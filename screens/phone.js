import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OtpInput from 'react-native-otp-input';
import PhoneInput from 'react-native-phone-input';

const App = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  // Step 1: Recaptcha Verification
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignup();
          },
        },
        auth
      );
    }
  }

  // Step 2: Send OTP
  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  // Step 3: Verify OTP
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <View id="recaptcha-container" />

      {user ? (
        <Text style={styles.successText}>👍 Login Success</Text>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Welcome to My App</Text>
          
          {showOTP ? (
            <>
              <Text style={styles.labelText}>Enter your OTP</Text>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numberOfInputs={6}
                inputStyles={styles.otpInput}
              />
              <TouchableOpacity
                onPress={onOTPVerify}
                style={styles.button}
              >
                {loading && <ActivityIndicator size="small" color="#fff" />}
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.labelText}>Verify your phone number</Text>
              <PhoneInput
                initialCountry="in"
                value={ph}
                onChangePhoneNumber={(value) => setPh(value)}
                textStyle={styles.phoneInputText}
              />
              <TouchableOpacity
                onPress={onSignup}
                style={styles.button}
              >
                {loading && <ActivityIndicator size="small" color="#fff" />}
                <Text style={styles.buttonText}>Send code via SMS</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D9CDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  otpInput: {
    width: '100%',
    height: 50,
    marginVertical: 20,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  phoneInputText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#56CCF2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
