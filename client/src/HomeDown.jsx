import { useEffect, useState } from "react";
import "./HomeDown.css";
import Movie from "./Movie";

const isSearch = false;

function HomeDown() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/recommend/movie?id=929590")
      .then((response) => response.json())
      .then((json) => [json[0]])
      .then((json) => setMovies(json));
  }, []);

  return (
    <>
      <h2>{isSearch ? "搜尋結果：" : "熱門推薦："}</h2>
      <div className="row">
        {movies.map((movie) => (
          <Movie movie={movie._source} />
          // <p>{movie._source.original_title} </p>
        ))}
      </div>
      <div className="row">Row2</div>
      <div className="row">Row3</div>
    </>
  );
}

export default HomeDown;
