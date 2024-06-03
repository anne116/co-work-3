import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  Button,
  Flex,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import MovieArea from "./MovieArea.jsx";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [isSearch, setIsSearch] = useState(false);
  const isHome = true;

  const translateQuery = async (text) => {
    const googleTranslateApiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_KEY;
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${googleTranslateApiKey}`,
        null,
        {
          params: {
            q: text,
            target: "en",
            key: googleTranslateApiKey,
          },
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      setError("Error translating query. Please try again later.");
      return text;
    }
  };

  const handleSearch = async () => {
    setIsSearch(true);
    setError("");
    try {
      const translatedQuery = await translateQuery(query);
      console.log("Original Query:", query);
      console.log("Translated Query:", translatedQuery);

      const response = await fetch(`http://localhost:9200/movies/_search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            multi_match: {
              query: translatedQuery,
              fields: ["title", "overview", "original_title"],
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.hits.hits);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const fetchSuggestions = async (input) => {
    if (input.length < 1) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get("http://localhost:6002/auto_complete", {
        params: { query: input },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <>
      <InputGroup borderRadius={5} size="sm" mt="2rem" mb="5rem">
        <Flex justify="center" align="center" w="100vw" h="20vh">
          <Box w={300} position="relative">
            <Input
              type="text"
              placeholder="Search..."
              border="2px solid #949494"
              ml={-5}
              p={3}
              w={300}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
              <Box
                position="absolute"
                bg="white"
                border="1px solid #ddd"
                mt={2}
                width="100%"
                zIndex={1}
              >
                <List>
                  {suggestions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      p={2}
                      borderBottom="1px solid #ddd"
                      _hover={{ bg: "#f0f0f0", cursor: "pointer" }}
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
          <Button
            size="lg"
            borderLeftRadius={5}
            borderRightRadius={5}
            border="2px solid #949494"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
      </InputGroup>
      <MovieArea isHome={isHome} isSearch={isSearch} movies={results} />
    </>
  );
};

export default Search;
