import { Client } from "@elastic/elasticsearch";
export const client = new Client({ node: "http://localhost:9200" });

export async function searchMovies(query) {
  const result = await client.search({
    index: "movies_new",
    body: {
      query: {
        match: {
          "data.title": query,
        },
      },
    },
  });
  return result.hits.hits;
}

// async function test(query) {
//   const test = await searchMovies(query);
//   console.log(test);
// }

// test("Civil");
