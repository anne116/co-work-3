// src/pages/SignInPage.jsx
import React from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';

const SignInPage = () => {
  return (
    <Box p={4} maxW="400px" mx="auto" mt={10}>
      <Heading mb={6}>Sign In</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button colorScheme="blue" width="full">Sign In</Button>
      </VStack>
    </Box>
  );
};

export default SignInPage;
