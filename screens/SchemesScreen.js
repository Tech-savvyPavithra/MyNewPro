// SchemesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

// Dummy data for schemes with logos
const schemes = [
  { id: '1', title: 'Subsidy for Seeds', logo: require('../assets/seeds.jpeg') },
  { id: '2', title: 'Irrigation Assistance', logo: require('../assets/irrigation.jpeg') },
  { id: '3', title: 'Crop Insurance', logo: require('../assets/crop.jpg') },
  { id: '4', title: 'Soil Health Monitoring', logo: require('../assets/images (4).jpeg') },
  { id: '5', title: 'Fertilizer Assistance', logo: require('../assets/fertilizer.jpeg') },
  // Add more schemes as needed
];

function SchemesScreen({ navigation }) {
  const scrollY = new Animated.Value(0);

  const navigateToSchemeDetail = (schemeId) => {
    navigation.navigate('SchemeDetail', { schemeId });
  };

  const renderItem = ({ item }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, 150],
      outputRange: [1, 1, 1.05],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity style={styles.item} onPress={() => navigateToSchemeDetail(item.id)}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Image source={item.logo} style={styles.logo} />
        </Animated.View>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <Text style={styles.header}>Available Schemes</Text>
      <FlatList
        data={schemes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0a661e',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SchemesScreen;