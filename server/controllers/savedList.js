import { getSaveListByUserId } from "../models/savedList.js";

export const savedList = async (req, res) => {
  const { id } = req.query;

  const list = await getSaveListByUserId(id);

  res.status(200).json(list);
};
