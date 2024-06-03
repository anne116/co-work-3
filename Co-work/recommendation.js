import { Client } from "@elastic/elasticsearch";
import {
  getAllMovie,
  getMovieById,
  getUserSavedList,
  getMovieByGenre_ids,
} from "./search.js";

export const client = new Client({ node: "http://localhost:9200" });

export async function recommendMovie() {
  let data = await getAllMovie();
  let recommendMovie = data.hits.hits;
  const weightAverage = (voteAverage, voteCount) => {
    const weight = 0.7; //將voteCount的權重設為0.8
    return voteAverage * voteCount + voteCount * weight;
  };

  recommendMovie.sort((a, b) => {
    const ratioA = weightAverage(a._source.vote_average, a._source.vote_count);
    const ratioB = weightAverage(b._source.vote_average, b._source.vote_count);
    return ratioB - ratioA; // 降序排列
  });
  recommendMovie = recommendMovie.map((list) => {
    list._source.poster_path =
      "https://media.themoviedb.org/t/p/w220_and_h330_face" +
      list._source.poster_path;
    return list;
  });

  recommendMovie = recommendMovie.slice(0, 9);
  return recommendMovie;
}

export async function userRecommendation(userId) {
  //取得用戶收藏清單saved_list
  let userData = await getUserSavedList(userId);
  userData = userData.hits.hits;
  let userMovie = userData.map((data) => {
    return data._source.movie_source_id;
  });
  //   console.log(userMovie);

  //根據用戶收藏movieId取得電影詳細資訊，並返回相關類型genre_ids
  let moviesId = await getMovieById(userMovie);
  moviesId = moviesId.hits.hits;
  //   console.log(moviesId);
  //   return;
  const moviesType = moviesId.flatMap((data) => {
    return data._source.genre_ids;
  });

  // 計算每個 genre_id 出現的次數
  const genreCounts = {};
  moviesType.forEach((genreId) => {
    genreCounts[genreId] = (genreCounts[genreId] || 0) + 1;
  });
  // 將 genreCounts 轉換為陣列並按出現次數排序
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  // 取出前五個出現次數最高的 genre_id
  const topGenres = sortedGenres.slice(0, 9).map((entry) => parseInt(entry[0]));
  //   console.log(topGenres);

  let moviesGenreIds = await getMovieByGenre_ids(topGenres);
  moviesGenreIds = moviesGenreIds.hits.hits;

  moviesGenreIds.map((data) => {
    data._source.poster_path =
      "https://media.themoviedb.org/t/p/w220_and_h330_face" +
      data._source.poster_path;
    return data;
  });
  console.log(moviesGenreIds);

  return moviesGenreIds;
}

// async function main() {
//   const movies = await userRecommendation("6cz40o8Be3fnJv9MhRw6");
//   console.log(movies);
// }

// main();
