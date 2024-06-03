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
  //   const movieData = body.hits.hits[0]._source.Movie_table[0];
  //   console.log(result);
  return result;
}

export async function getMovieById(id) {
  const result = await client.search({
    index: "movies",
    body: {
      query: {
        match: { id: id },
      },
    },
  });
  //   const movieData = body.hits.hits[0]._source.Movie_table[0];
  //   console.log(result);
  return result;
}
// getMovieById().catch(console.log);

// getAllMovie().catch(console.log);
