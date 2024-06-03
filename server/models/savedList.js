import dotenv from "dotenv";

dotenv.config();

export const getSaveListByUserId = async (id) => {
  const searchQuery = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        match: {
          userId: id,
        },
      },
    }),
  };

  const response = await fetch(
    `http://${process.env.esHost}/saved_list/_search`,
    searchQuery
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.hits.hits;
};
