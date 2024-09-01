import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Linking,
} from "react-native";

const API_KEY = "2119301bc4174631b7b4af97a5ab9d4f";
const url = "https://newsapi.org/v2/everything?q=";

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("Farming");

  useEffect(() => {
    fetchNews(query);
  }, [query]);

  async function fetchNews(query) {
    try {
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function handleSearch() {
    if (!query) return;
    fetchNews(query);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search News"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <ScrollView>
        {articles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              // Open the article URL in a browser
              Linking.openURL(article.url);
            }}
          >
            {article.urlToImage && (
              <Image
                style={styles.newsImg}
                source={{ uri: article.urlToImage }}
              />
            )}
            <Text style={styles.newsTitle}>{article.title}</Text>
            <Text style={styles.newsSource}>
              {article.source.name} ·{" "}
              {new Date(article.publishedAt).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              })}
            </Text>
            <Text style={styles.newsDesc}>{article.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e8f5e9", // Light green background
  },
  searchInput: {
    height: 40,
    borderColor: "#66bb6a", // Green border
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff", // White background for input
  },
  searchButton: {
    backgroundColor: "#66bb6a", // Green background
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  searchButtonText: {
    color: "#ffffff", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#c8e6c9", // Light green background for cards
    borderRadius: 8,
    elevation: 3,
  },
  newsImg: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#2e7d32", // Dark green text
  },
  newsSource: {
    fontSize: 14,
    color: "#388e3c", // Medium green text
    marginBottom: 8,
  },
  newsDesc: {
    fontSize: 16,
    color: "#1b5e20", // Darker green text
  },
});
