import fetch from "node-fetch";
import { Client } from "@elastic/elasticsearch";
export const client = new Client({ node: "http://localhost:9200" });
import dotenv from "dotenv";
dotenv.config();

// client
//   .info()
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));

const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_AUTH} `,
  },
};

async function searchMovieList() {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json; // 直接返回整個 JSON 物件
  } catch (error) {
    console.error("error:" + error);
    throw error;
  }
}

async function run() {
  const movieData = await searchMovieList();
  // console.log(movieData);

  const body = movieData.results.map((movie) => ({
    // Map each movie to the desired format, ensuring 'vote_average' remains as 'long'
    ...movie,
    vote_average: parseInt(movie.vote_average), // Convert vote_average to string to prevent type conflict
  }));

  console.log(body);
  // return;
  body.map(async (data) => {
    await client.index({
      index: "movies",
      body: {
        data,
      },
    });
  });
}
run().catch(console.log);
