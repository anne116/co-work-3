import { Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

function Movie({ movie }) {
  return (
    <Center h="100vh">
      <Box p="5" maxW="320px" borderWidth="1px">
        <Image
          borderRadius="md"
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
        />
        {/* <Flex align="baseline" mt={2}>
          <Badge colorScheme="pink">Plus</Badge>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
            color="pink.800"
          >
            Verified &bull; Cape Town
          </Text>
        </Flex> */}
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
          {movie.original_title}
        </Text>
        <Text mt={2}>$119/night</Text>
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
