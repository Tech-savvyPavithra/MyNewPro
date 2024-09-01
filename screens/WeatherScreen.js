import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = "baab8386300502783224917a407c8fd3"; // Your OpenWeatherMap API Key

const WeatherScreen = () => {
  const [cityInput, setCityInput] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);

  const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
      return (
        <View style={styles.details} key={index}>
          <Text style={styles.headerText}>
            {cityName} ({weatherItem.dt_txt.split(" ")[0]})
          </Text>
          <Text style={styles.weatherText}>
            Temperature: {(weatherItem.main.temp - 273.15).toFixed(2)}°C
          </Text>
          <Text style={styles.weatherText}>Wind: {weatherItem.wind.speed} M/S</Text>
          <Text style={styles.weatherText}>Humidity: {weatherItem.main.humidity}%</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`,
            }}
          />
          <Text style={styles.weatherText}>{weatherItem.weather[0].description}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.card} key={index}>
          <Text style={styles.weatherText}>({weatherItem.dt_txt.split(" ")[0]})</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`,
            }}
          />
          <Text style={styles.weatherText}>Temp: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</Text>
          <Text style={styles.weatherText}>Wind: {weatherItem.wind.speed} M/S</Text>
          <Text style={styles.weatherText}>Humidity: {weatherItem.main.humidity}%</Text>
        </View>
      );
    }
  };

  const getWeatherDetails = async (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await axios.get(WEATHER_API_URL);
      const data = response.data;

      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      setCityInput("");
      setCurrentWeather(createWeatherCard(cityName, fiveDaysForecast[0], 0));
      setWeatherForecast(
        fiveDaysForecast
          .slice(1)
          .map((weatherItem, index) =>
            createWeatherCard(cityName, weatherItem, index)
          )
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while fetching the weather forecast!"
      );
    }
  };

  const getCityCoordinates = async () => {
    if (cityInput.trim() === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.trim()}&limit=1&appid=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      if (!data.length) {
        Alert.alert("Error", `No coordinates found for ${cityInput}`);
        return;
      }
      const { lat, lon, name } = data[0];
      getWeatherDetails(name, lat, lon);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching the coordinates!");
    }
  };

  const getUserCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow location access to get weather data');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

    axios.get(API_URL)
      .then(response => {
        const { name } = response.data[0];
        getWeatherDetails(name, latitude, longitude);
      })
      .catch(() => {
        Alert.alert('Error', 'An error occurred while fetching the city name!');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityInput}
        onChangeText={setCityInput}
        onSubmitEditing={getCityCoordinates}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={getCityCoordinates}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getUserCoordinates}>
          <Text style={styles.buttonText}>Use My Location</Text>
        </TouchableOpacity>
      </View>
      {currentWeather && (
        <View style={styles.weatherContainer}>{currentWeather}</View>
      )}
      {weatherForecast.length > 0 && (
        <View style={styles.forecastContainer}>{weatherForecast}</View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#e0f2f1", // Light green background
  },
  input: {
    borderColor: "#388e3c", // Darker green border
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: "#ffffff", // White input background
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: "#388e3c", // Dark green background
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    padding: 16,
    backgroundColor: "#c8e6c9", // Light green background for details
    borderRadius: 8,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32", // Dark green text
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherText: {
    fontSize: 16,
    color: "#1b5e20", // Darker green text
  },
  weatherContainer: {
    marginBottom: 16,
  },
  forecastContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    padding: 16,
    backgroundColor: "#c8e6c9", // Light green background for cards
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    width: '45%',
  },
});

export default WeatherScreen;
