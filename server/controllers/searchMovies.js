import { searchMovieByKeyword } from "../models/searchMovies.js";

export const searchMovies = async (req, res) => {
  const { keyword } = req.query;

  const movies = await searchMovieByKeyword(keyword);

  res.status(200).json(movies);
};
