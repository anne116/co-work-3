import { format } from "date-fns";
import dotenv from "dotenv";

const todayDate = format(new Date(), "yyyyMMdd");
dotenv.config();

// fetch data from TMDB API
const tmdbApi =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const tmdbApiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_AUTH}`,
  },
};

const response = await fetch(tmdbApi, tmdbApiOptions);
const data = await response.json();

// update to ElasticSearch

await Promise.all(
  data.results.map(async (movie) => {
    const {
      backdrop_path,
      id,
      original_title,
      overview,
      poster_path,
      media_type,
      adult,
      title,
      original_language,
      genre_ids,
      popularity,
      release_date,
      video,
      vote_average,
      vote_count,
    } = movie;

    const esOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script: {
          source: `ctx._source.version = "${todayDate}"`,
        },
        upsert: {
          backdrop_path,
          id,
          original_title,
          overview,
          poster_path,
          media_type,
          adult,
          title,
          original_language,
          genre_ids,
          popularity,
          release_date,
          video,
          vote_average,
          vote_count,
          version: todayDate,
        },
      }),
    };

    await fetch(
      `http://${process.env.esHost}/${process.env.esIndex}/_update/${id}`,
      esOptions
    );
  })
);
