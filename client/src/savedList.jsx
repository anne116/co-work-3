import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";

const SavedList = () => {
  const { userId } = useParams();
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/savedList/list?id=${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSavedList(data.map((item) => item._source.moviename));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved list:", error);
        setLoading(false);
      }
    };

    fetchSavedList();
  }, [userId]);

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

  if (savedList.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Text>No saved movies found.</Text>
      </Box>
    );
  }

  return (
    <Box p="4" m="4" w="full">
      <VStack align="start" spacing="4">
        {savedList.map((movieName, index) => (
          <Text key={index} fontSize="m">
            {movieName}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default SavedList;
