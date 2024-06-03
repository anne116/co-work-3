import { Client } from "@elastic/elasticsearch";
import { getAllMovie } from "./search.js";

export const client = new Client({ node: "http://localhost:9200" });

export async function recommendMovie() {
  let data = await getAllMovie();
  let recommendMovie = data.hits.hits;
  const weightAverage = (voteAverage, voteCount) => {
    const weight = 0.7; //將voteCount的權重設為0.8
    return voteAverage * voteCount + voteCount * weight;
  };

  recommendMovie.sort((a, b) => {
    const ratioA = weightAverage(
      a._source.data.vote_average,
      a._source.data.vote_count
    );
    const ratioB = weightAverage(
      b._source.data.vote_average,
      b._source.data.vote_count
    );
    return ratioB - ratioA; // 降序排列
  });

  recommendMovie = recommendMovie.slice(0, 5);
  return recommendMovie;
}

export async function userRecommendation() {}

// async function main() {
//   const movies = await recommendMovie();
//   console.log(movies);
// }

// main();
