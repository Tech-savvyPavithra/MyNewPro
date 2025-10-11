import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Main from './screens/Main';
import SignupScreen from './screens/SignupScreen';
import AlertScreen from './screens/AlertScreen';
import PhoneScreen from './screens/phone';
import SchemeDetailScreen from './screens/SchemeDetailScreen';
import ContactScreen from './screens/ContactScreen';
import WeatherScreen from './screens/WeatherScreen';
import NewsScreen from './screens/NewsScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import CropScreen from './screens/CropScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={Main} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Alert" 
          component={AlertScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SchemeDetail" 
          component={SchemeDetailScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Weather" 
          component={WeatherScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="News" 
          component={NewsScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Chatbot" 
          component={ChatbotScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Phone" 
          component={PhoneScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Crop" 
          component={CropScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
