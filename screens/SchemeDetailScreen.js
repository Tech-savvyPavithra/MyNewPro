import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { schemeDetails } from './schemeDetails'; // Ensure this path is correct

function SchemeDetailScreen({ route, navigation }) {
  const { schemeId } = route.params;
  const scheme = schemeDetails[schemeId];

  if (!scheme) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scheme not found</Text>
        <Button title="Back to Schemes" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Display the scheme image */}
      <Image source={scheme.image} style={styles.image} />

      <Text style={styles.title}>{scheme.title}</Text>
      <Text style={styles.description}>{scheme.description}</Text>
      <Button title="Back to Schemes" onPress={() => navigation.goBack()} color="#0a661e" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f5e3', // Light green background
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0a661e', // Green color for the title
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
    color: '#333', // Dark grey for readability
  },
});

export default SchemeDetailScreen;
