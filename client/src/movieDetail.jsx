// MovieDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Heading,
  Spinner,
} from "@chakra-ui/react";

const MovieDetail = () => {
  const { id } = useParams(); // Get the id from the route parameters
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/movie/detail?id=${id}`
        );
        const data = await response.json();
        setMovie(data[0]._source);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Text>Failed to load movie details.</Text>
      </Box>
    );
  }

  return (
    <Box p="4" m="4" w="full">
      <Heading as="h2" size="lg" mb="4">
        {movie.title}
      </Heading>
      <HStack spacing="4">
        <Box w="40%">
          <Image
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
            alt={movie.title}
            objectFit="cover"
            borderRadius="md"
          />
        </Box>
        <VStack align="start" spacing="4" w="60%">
          <Text fontSize="m">
            <strong>{movie.title}</strong>
          </Text>
          <Text fontSize="m">
            <strong>Overview :</strong> {movie.overview}
          </Text>
          <Text fontSize="m">
            <strong>Rating:</strong> {movie.vote_average}
          </Text>
          <Text fontSize="m">
            <strong> Release Date :</strong> {movie.release_date}
          </Text>
          <HStack spacing="4">
            <Button colorScheme="orange">Watch Now</Button>
            <Button colorScheme="orange">Save to List</Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default MovieDetail;
