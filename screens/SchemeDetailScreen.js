import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const schemeDetails = {
  '1': { title: 'Subsidy for Seeds', description: 'Details about the subsidy for seeds.' },
  '2': { title: 'Irrigation Assistance', description: 'Details about irrigation assistance.' },
  '3': { title: 'Crop Insurance', description: 'Details about crop insurance.' },
  // Add more scheme details as needed
};

function SchemeDetailScreen({ route, navigation }) {
  const { schemeId } = route.params;
  const scheme = schemeDetails[schemeId];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{scheme.title}</Text>
      <Text style={styles.description}>{scheme.description}</Text>
      <Button title="Back to Schemes" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SchemeDetailScreen;