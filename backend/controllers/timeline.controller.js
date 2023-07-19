import {
  getAll,
  getOne,
  createOne,
  editOne,
  deleteOne
} from "../models/timeline.model.js";

export const create = async (req, res) => {
  res.json(await createOne());
}

export const read = async (req, res) => {

  try {
    const [result] = await getAll();

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error with server" })
  }
}

export const readOne = async (req, res) => {
  res.json(await getOne());
}

export const update = async (req, res) => {
  res.json(await editOne());
}

export const destroy = async (req, res) => {
  res.json(await deleteOne());
}