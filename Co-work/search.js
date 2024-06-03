import fetch from "node-fetch";

import { Client } from "@elastic/elasticsearch";
export const client = new Client({ node: "http://localhost:9200" });

export async function getAllMovie() {
  const result = await client.search({
    index: "movies",
    body: {
      query: {
        match_all: {},
      },
    },
  });
  //   console.log(result);
  return result;
}

export async function getMovieById(id) {
  const result = await client.search({
    index: "movies",
    body: {
      query: {
        terms: { id: id },
      },
    },
  });
  //   const movieData = body.hits.hits[0]._source.Movie_table[0];
  //   console.log(result);
  return result;
}

export async function getMovieByGenre_ids(genre_ids) {
  const result = await client.search({
    index: "movies",
    body: {
      query: {
        terms: { genre_ids: genre_ids },
      },
    },
  });
  //   const movieData = body.hits.hits[0]._source.Movie_table[0];
  //   console.log(result);
  return result;
}

export async function getUserSavedList(userId) {
  const result = await client.search({
    index: "saved_list",
    body: {
      query: {
        match: { userId: userId },
      },
    },
  });
  //   console.log(result);
  return result;
}
// getMovieById().catch(console.log);

// getAllMovie().catch(console.log);

// async function test() {
//   console.log(await getMovieByGenre_ids([80]));
// }

// test();
