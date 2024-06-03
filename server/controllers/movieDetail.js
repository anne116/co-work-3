import { getMovieById } from "../models/searchMovies.js";

export const movieDetail = async (req, res) => {
  const { id } = req.query;

  const movie = await getMovieById(id);

  res.status(200).json(movie);
};
