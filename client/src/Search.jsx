import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  InputRightAddon,
  Box,
  VStack,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import MovieArea from "./MovieArea.jsx";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [isSearch, setIsSearch] = useState(false);
  const isHome = true;

  const handleSearch = () => {
    setIsSearch(true);
  };

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

  // const handleSearch = async () => {
  //   setError("");
  //   try {
  //     // 翻译查询
  //     const translatedQuery = await translateQuery(query);

  //     // 使用翻译后的查询进行搜索
  //     const response = await fetch(`http://localhost:9200/movies/_search`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: {
  //           multi_match: {
  //             query: translatedQuery,
  //             fields: ["title", "overview", "original_title"],
  //           },
  //         },
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setResults(data.hits.hits);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Error fetching data. Please try again later.");
  //   }
  // };

  return (
    <>
      <InputGroup borderRadius={5} size="sm" mt="2rem" mb="5rem">
        <Flex justify="center" align="center" w="100vw" h="20vh">
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
      <MovieArea isHome={isHome} isSearch={isSearch} />
    </>
  );
};

export default Search;

// import React, { useState } from 'react';
// import { Input, InputGroup, InputLeftElement, Button, InputRightAddon, Box, VStack, Text, Image } from '@chakra-ui/react';
// import { Search2Icon } from '@chakra-ui/icons';

// const Search = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     setError('');
//     try {
//       const response = await fetch(`http://localhost:9200/movies/_search`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           query: {
//             multi_match: {
//               query: query,
//               fields: ["title", "overview", "original_title"]
//             }
//           }
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data); // 调试日志
//       setResults(data.hits.hits);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Error fetching data. Please try again later.');
//     }
//   };

//   return (
//     <>
//       <InputGroup borderRadius={5} size="sm" ml={900} mt={80}>
//         <InputLeftElement
//           pointerEvents="none"
//           children={<Search2Icon color="gray.800" />}
//         />
//         <Input
//           type="text"
//           placeholder="Search..."
//           border="2px solid #949494"
//           ml={-5}
//           p={3}
//           w={300}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <InputRightAddon
//           p={3}
//           border="none"
//         >
//           <Button size="lg" borderLeftRadius={5} borderRightRadius={5} border="2px solid #949494" onClick={handleSearch}>
//             Search
//           </Button>
//         </InputRightAddon>
//       </InputGroup>
//       {error && <Box mt={4} ml={900} w={600} color="red">{error}</Box>}
//       <Box mt={4} ml={900} w={600}>
//         <VStack spacing={4}>
//           {results.map((result) => (
//             <Box key={result._id} p={4} borderWidth="1px" borderRadius="lg" w="full">
//               <Text fontWeight="bold" fontSize="lg">{result._source.title}</Text>
//               <Text>{result._source.overview}</Text>
//               <Text><strong>Release Date:</strong> {result._source.release_date}</Text>
//               {result._source.poster_path && (
//                 <Image src={`https://image.tmdb.org/t/p/w500${result._source.poster_path}`} alt={result._source.title} />
//               )}
//             </Box>
//           ))}
//         </VStack>
//       </Box>
//     </>
//   );
// };

// export default Search;
