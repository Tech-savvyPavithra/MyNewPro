    import React, { useState, useEffect } from 'react';
    import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
    import { db } from './firebaseConfig';
    import { ref, onValue } from 'firebase/database';

    export default function CropScreen() {
    const [data, setData] = useState({ soilmoisture: null, humidity: null, temp: null });
    const [recommendedCrops, setRecommendedCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to recommend crops based on sensor data
    const recommendCrops = (soilMoisture, humidity, temperature) => {
        const crops = [
        { name: 'Wheat', moistureRange: [1024, 2048], tempRange: [15, 25], humidityRange: [30, 60] },
        { name: 'Rice', moistureRange: [2048, 3072], tempRange: [20, 30], humidityRange: [60, 80] },
        { name: 'Corn', moistureRange: [2048, 3072], tempRange: [18, 30], humidityRange: [40, 70] },
        { name: 'Barley', moistureRange: [1024, 2048], tempRange: [10, 25], humidityRange: [40, 60] },
        { name: 'Soybean', moistureRange: [1536, 3072], tempRange: [20, 30], humidityRange: [50, 70] },
        { name: 'Potato', moistureRange: [2048, 3072], tempRange: [10, 25], humidityRange: [60, 80] },
        { name: 'Tomato', moistureRange: [1536, 3072], tempRange: [15, 30], humidityRange: [50, 70] },
        { name: 'Sugarcane', moistureRange: [2048, 4095], tempRange: [20, 35], humidityRange: [70, 90] },
        { name: 'Cotton', moistureRange: [1024, 2048], tempRange: [25, 35], humidityRange: [40, 60] },
        { name: 'Peanut', moistureRange: [1024, 2048], tempRange: [15, 30], humidityRange: [30, 50] },
        { name: 'Sorghum', moistureRange: [1024, 2048], tempRange: [20, 35], humidityRange: [30, 60] },
        { name: 'Millet', moistureRange: [512, 2048], tempRange: [20, 35], humidityRange: [20, 50] },
        { name: 'Oats', moistureRange: [1024, 2048], tempRange: [10, 20], humidityRange: [40, 70] },
        { name: 'Chickpea', moistureRange: [1024, 2048], tempRange: [15, 30], humidityRange: [30, 60] }
        ];

        const suitableCrops = crops.filter(crop => 
        soilMoisture >= crop.moistureRange[0] && soilMoisture <= crop.moistureRange[1] &&
        temperature >= crop.tempRange[0] && temperature <= crop.tempRange[1] &&
        humidity >= crop.humidityRange[0] && humidity <= crop.humidityRange[1]
        );

        setRecommendedCrops(suitableCrops);
    };

    useEffect(() => {
        const houseRef = ref(db, "house");

        const handleData = (snapshot) => {
        const houseData = snapshot.val() || {};
        setData(houseData);
        setLoading(false);

        // Call recommend crops with current data
        if (houseData.soilmoisture !== null && houseData.humidity !== null && houseData.temp !== null) {
            recommendCrops(houseData.soilmoisture, houseData.humidity, houseData.temp);
        }
        };

        const unsubscribe = onValue(houseRef, handleData);

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
        ) : (
            <View style={styles.content}>
            <Text style={styles.title}>Crop Recommendation</Text>
            <Text style={styles.text}>
                Soil Moisture: {data.soilmoisture !== null ? `${data.soilmoisture}/4095` : "No data"}
            </Text>
            <Text style={styles.text}>
                Humidity: {data.humidity !== null ? `${data.humidity}%` : "No data"}
            </Text>
            <Text style={styles.text}>
                Temperature: {data.temp !== null ? `${data.temp}°C` : "No data"}
            </Text>
            {recommendedCrops.length > 0 ? (
                <View style={styles.resultContainer}>
                {recommendedCrops.map((crop, index) => (
                    <Text key={index} style={styles.cropText}>{crop.name}</Text>
                ))}
                </View>
            ) : (
                <Text>No suitable crops found for current conditions.</Text>
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
        backgroundColor: "#e8f5e9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
        color: '#1b5e20',
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    cropText: {
        fontSize: 18,
        color: '#1b5e20',
        marginVertical: 5,
    },
    });
