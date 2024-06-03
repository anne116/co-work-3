import dotenv from "dotenv";

dotenv.config();

export const searchMovieByKeyword = async (keyword) => {
  const searchQuery = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        multi_match: {
          query: keyword,
          fields: ["overview", "title^3"],
        },
      },
    }),
  };

  const response = await fetch(
    `http://${process.env.esHost}/movies/_search`,
    searchQuery
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.hits.hits;
};

export const getMovieById = async (id) => {
  const searchQuery = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        match: {
          _id: id,
        },
      },
    }),
  };

  const response = await fetch(
    `http://${process.env.esHost}/movies/_search`,
    searchQuery
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.hits.hits;
};
