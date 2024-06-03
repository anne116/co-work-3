import { format } from "date-fns";
import dotenv from "dotenv";

const todayDate = format(new Date(), "yyyyMMdd");
dotenv.config();

export const getMovieById = async (id) => {
  const response = await fetch(
    `http://${process.env.esHost}/movies/_doc/${id}`
  );
  const data = await response.json();

  return data;
};

export const getMoviesByGenre = async (genreId) => {
  const esOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        bool: {
          must: [
            { match: { version: todayDate } },
            { match: { genre_ids: genreId } },
          ],
        },
      },
    }),
  };

  const response = await fetch(
    `http://${process.env.esHost}/movies/_search`,
    esOptions
  );
  const data = await response.json();

  return data.hits.hits;
};
