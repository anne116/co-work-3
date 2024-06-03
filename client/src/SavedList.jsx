// src/pages/SavedListPage.jsx
import React from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';

const SavedListPage = () => {
  return (
    <Box p={4} maxW="800px" mx="auto" mt={10}>
      <Heading mb={6}>Saved List</Heading>
      <VStack spacing={4} align="start">
        <Text>Movie 1</Text>
        <Text>Movie 2</Text>
        <Text>Movie 3</Text>
      </VStack>
    </Box>
  );
};

export default SavedListPage;
