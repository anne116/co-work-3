import { getMovieById, getMoviesByGenre } from "../models/movies.js";

export const getRecommendByMovie = async (req, res) => {
  const { id } = req.query;

  const movie = await getMovieById(id);

  const genreIds = movie._source.genre_ids;
  //   console.log(genreIds);

  const result = await Promise.all(
    genreIds.map(async (genreId) => {
      const movies = await getMoviesByGenre(genreId);
      return movies;
    })
  );

  const flatten = (arr) =>
    arr.reduce(
      (acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : [item]),
      []
    );

  const recommendMovies = flatten(result);

  res.status(200).json(recommendMovies);
};
