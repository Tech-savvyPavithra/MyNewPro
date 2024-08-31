import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

const API_KEY = "2119301bc4174631b7b4af97a5ab9d4f";
const url = "https://newsapi.org/v2/everything?q=";

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [curSelectedNav, setCurSelectedNav] = useState(null);
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

  function onNavItemClick(id) {
    setQuery(id);
    setCurSelectedNav(id);
  }

  function handleSearch() {
    if (!query) return;
    fetchNews(query);
    setCurSelectedNav(null);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search News"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />

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
            <Image
              style={styles.newsImg}
              source={{ uri: article.urlToImage }}
            />
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
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
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
  },
  newsSource: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  newsDesc: {
    fontSize: 16,
    color: "#333",
  },
});
