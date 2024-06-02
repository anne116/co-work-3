import { Box, Center, Image, Flex, Text } from "@chakra-ui/react";
import { MdStar, MdWhatshot, MdDateRange } from "react-icons/md";

function Movie({ movie }) {
  return (
    <Center h="55vh">
      <Box p="5" maxW="380px" borderWidth="2px" borderRadius={20}>
        <Image
          borderRadius="md"
          src={`https://image.tmdb.org/t/p/w355_and_h200_multi_faces/${movie.backdrop_path}`}
        />
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {movie.original_title}
        </Text>
        <Flex mt={2} align="center">
          <Box as={MdDateRange} color="green.400" />
          <Text ml={1} fontSize="sm">
            <i>{movie.release_date}</i>
          </Text>
        </Flex>
        <Flex mt={2} align="center">
          <Box as={MdWhatshot} color="red.400" />
          <Text ml={1} fontSize="sm">
            <b>{Math.floor(movie.popularity)}</b>
          </Text>
        </Flex>
        <Flex mt={2} align="center">
          <Box as={MdStar} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>{movie.vote_average}</b> ({movie.vote_count})
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}

export default Movie;
