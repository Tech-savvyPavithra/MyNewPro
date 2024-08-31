import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { db } from "./firebaseConfig"; // Ensure firebaseConfig is correctly set up

export default function AlertScreen() {
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchHumidity = async () => {
      try {
        db.ref("soilData/sample1/soilHumidity").on("value", (snapshot) => {
          const humidityValue = snapshot.val();
          setHumidity(humidityValue);
          setLoading(false); // Stop loading once data is fetched

          // Check if humidity is less than 30 and trigger an alert
          if (humidityValue < 30) {
            Alert.alert(
              "Low Humidity Alert",
              `The soil humidity is too low: ${humidityValue}%`,
              [{ text: "OK" }]
            );
          }
        });
      } catch (error) {
        setLoading(false); // Stop loading if an error occurs
        console.error("Error fetching humidity: ", error);
      }
    };

    fetchHumidity();

    // Clean up the listener when the component unmounts
    return () => db.ref("soilData/sample1/soilHumidity").off("value");
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
      ) : (
        <Text style={styles.text}>
          Current Soil Humidity: {humidity !== null ? `${humidity}%` : "No data available"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
