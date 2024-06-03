import { useEffect, useState } from "react";
import { Text, Link } from "@chakra-ui/react";
import "./MovieArea.css";
import Movie from "./Movie";
import { useLocation } from "react-router-dom";

const MOVIE_PER_ROW = 3;

function MovieArea({ isHome, isSearch, movieId }) {
  const [movies, setMovies] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function UserComponent() {
    let query = useQuery();
    let userId = query.get("userId");

    return userId;
  }
  const userId = UserComponent();

  useEffect(() => {

    fetch(`http://localhost:6002/user_recommend?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => setMovies(json));
  }, []);

    let url = "";

    if (isHome && isSearch) {
      url = "http://localhost:3000/api/search/movies?keyword=civil";
    } else if (isHome) {
      url = "http://localhost:6002/recommend";
    } else {
      url = `http://localhost:3000/api/recommend/movie?id=${movieId}`;
    }

    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setMovies(json))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [isHome, isSearch, setMovies]);


  return (
    <>
      <Text
        mt={2}
        fontSize="xl"
        fontWeight="semibold"
        lineHeight="short"
        className="mainWord"
      >
        {isHome
          ? isSearch
            ? "搜尋結果："
            : "熱門推薦："
          : "你可能也會喜歡..."}
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

export default MovieArea;
