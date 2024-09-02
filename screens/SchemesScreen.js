import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { schemeDetails } from './schemeDetails'; // Import schemeDetails from the file where it's defined

// Extract schemes information from schemeDetails
const schemes = Object.keys(schemeDetails).map(key => ({
  id: key,
  title: schemeDetails[key].title,
  logo: schemeDetails[key].image,
}));

function SchemesScreen({ navigation }) {
  const navigateToSchemeDetail = (schemeId) => {
    navigation.navigate('SchemeDetail', { schemeId });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigateToSchemeDetail(item.id)}>
        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Available Schemes</Text>
      <FlatList
        data={schemes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
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
