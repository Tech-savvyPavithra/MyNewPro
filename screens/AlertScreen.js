import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "./firebaseConfig"; // Ensure firebaseConfig is correctly set up
import { ref, onValue } from 'firebase/database'; // Import necessary database functions

export default function AlertScreen() {
  const [data, setData] = useState({ soilmoisture: null, humidity: null, temp: null });
  const [loading, setLoading] = useState(true);
  const [soilMoistureReadings, setSoilMoistureReadings] = useState([]);
  const [alerts, setAlerts] = useState([]); // State to store alert messages
  const prevDataRef = useRef({}); // Ref to store the previous data values

  // Function to handle alerts
  const handleAlerts = (currentData) => {
    const { soilmoisture, humidity, temp } = currentData;
    const newAlerts = [];

    // Soil moisture alert
    if (soilmoisture !== null && soilmoisture < 2700 && prevDataRef.current.soilmoisture !== soilmoisture) {
      // No alert for soil moisture less than 2700
    } else if (soilmoisture !== null && soilmoisture >= 2700 && prevDataRef.current.soilmoisture !== soilmoisture) {
      newAlerts.push(`Warning: The soil moisture is high: ${soilmoisture}/4095`);
    }

    // Critical humidity alert
    if (humidity !== null && humidity < 30 && prevDataRef.current.humidity !== humidity) {
      newAlerts.push(`Critical Alert: Low Humidity - The humidity is critically low: ${humidity}%`);
    }

    // High temperature alert
    if (temp !== null && temp > 35 && prevDataRef.current.temp !== temp) {
      newAlerts.push(`Warning: High Temperature - The temperature is too high: ${temp}°C`);
    }

    // Update the alerts state
    if (newAlerts.length > 0) {
      setAlerts(newAlerts);
    }

    // Update the previous data reference
    prevDataRef.current = currentData;
  };

  // Function to calculate the average soil moisture
  const calculateAverageSoilMoisture = (readings) => {
    if (readings.length === 0) return null;
    const sum = readings.reduce((acc, reading) => acc + reading, 0);
    return sum / readings.length;
  };

  useEffect(() => {
    const houseRef = ref(db, "house"); // Listen to changes at the `house` node

    const handleData = (snapshot) => {
      const houseData = snapshot.val() || {}; // Ensure `houseData` is an object
      console.log("Fetched Data: ", houseData); // Debugging: Print the fetched data

      // Update the state with the latest data
      setData(houseData);
      setLoading(false);

      // Add the current soil moisture reading to the list
      if (houseData.soilmoisture !== null) {
        setSoilMoistureReadings((prevReadings) => {
          const newReadings = [...prevReadings, houseData.soilmoisture];
          return newReadings.length > 12 ? newReadings.slice(-12) : newReadings; // Keep only the last 1 hour (12 readings for 5 mins intervals)
        });
      }

      handleAlerts(houseData);
    };

    // Attach the listener
    const unsubscribe = onValue(houseRef, handleData);

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe(); // Unsubscribe from the listener
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.text}>
            Current Soil Moisture: {data.soilmoisture !== null ? `${data.soilmoisture}/4095` : "No data available"}
          </Text>
          <Text style={styles.text}>
            Current Humidity: {data.humidity !== null ? `${data.humidity}%` : "No data available"}
          </Text>
          <Text style={styles.text}>
            Current Temperature: {data.temp !== null ? `${data.temp}°C` : "No data available"}
          </Text>
          {alerts.length > 0 && (
            <View style={styles.alertContainer}>
              {alerts.map((alert, index) => (
                <Text key={index} style={styles.alertText}>{alert}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0b9a3b", // Light green background
  },
  dataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: "#e8f5e9", // Dark green text
  },
  alertContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#c8e6c9", // Light green background for alerts
    borderRadius: 5,
  },
  alertText: {
    fontSize: 16,
    color: "#d8000c", // Red text for alerts
  },
});
