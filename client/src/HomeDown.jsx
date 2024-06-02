import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import "./HomeDown.css";
import Movie from "./Movie";

const isSearch = false;
const MOVIE_PER_ROW = 3;

function HomeDown() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/recommend/movie?id=929590")
      .then((response) => response.json())
      .then((json) => setMovies(json));
  }, []);

  return (
    <>
      <Text
        mt={2}
        fontSize="xl"
        fontWeight="semibold"
        lineHeight="short"
        className="mainWord"
      >
        {isSearch ? "搜尋結果：" : "熱門推薦："}
      </Text>
      <div className="row">
        {movies.slice(0, MOVIE_PER_ROW).map((movie) => (
          <Movie movie={movie._source} />
          // <p>{movie._source.original_title} </p>
        ))}
      </div>
      <div className="row">
        {movies.slice(MOVIE_PER_ROW, MOVIE_PER_ROW * 2).map((movie) => (
          <Movie movie={movie._source} />
          // <p>{movie._source.original_title} </p>
        ))}
      </div>
      <div className="row">
        {movies.slice(MOVIE_PER_ROW * 2, MOVIE_PER_ROW * 3).map((movie) => (
          <Movie movie={movie._source} />
          // <p>{movie._source.original_title} </p>
        ))}
      </div>
    </>
  );
}

export default HomeDown;
