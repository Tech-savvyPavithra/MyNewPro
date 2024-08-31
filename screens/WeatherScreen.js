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
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";

const API_KEY = "baab8386300502783224917a407c8fd3"; // Your OpenWeatherMap API Key

const WeatherScreen = () => {
  const [cityInput, setCityInput] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);

  const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
      return (
        <View style={styles.details}>
          <Text style={styles.headerText}>
            {cityName} ({weatherItem.dt_txt.split(" ")[0]})
          </Text>
          <Text>
            Temperature: {(weatherItem.main.temp - 273.15).toFixed(2)}°C
          </Text>
          <Text>Wind: {weatherItem.wind.speed} M/S</Text>
          <Text>Humidity: {weatherItem.main.humidity}%</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`,
            }}
          />
          <Text>{weatherItem.weather[0].description}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.card} key={index}>
          <Text>({weatherItem.dt_txt.split(" ")[0]})</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`,
            }}
          />
          <Text>Temp: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</Text>
          <Text>Wind: {weatherItem.wind.speed} M/S</Text>
          <Text>Humidity: {weatherItem.main.humidity}%</Text>
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

  const getUserCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        axios
          .get(API_URL)
          .then((response) => {
            const { name } = response.data[0];
            getWeatherDetails(name, latitude, longitude);
          })
          .catch(() => {
            Alert.alert(
              "Error",
              "An error occurred while fetching the city name!"
            );
          });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          Alert.alert(
            "Error",
            "Geolocation request denied. Please reset location permission to grant access again."
          );
        } else {
          Alert.alert(
            "Error",
            "Geolocation request error. Please reset location permission."
          );
        }
      }
    );
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
      <Button title="Search" onPress={getCityCoordinates} />
      <Button title="Use My Location" onPress={getUserCoordinates} />
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
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  details: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  card: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  weatherContainer: {
    marginVertical: 16,
  },
  forecastContainer: {
    marginVertical: 16,
  },
});

export default WeatherScreen;