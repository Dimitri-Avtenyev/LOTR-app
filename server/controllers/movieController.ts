import { Request, Response } from "express";
import movieService from "../services/movieService";

const getMovies = async (req:Request, res:Response):Promise<Response> => {
  res.type("application/json");
  const movies = await movieService.getMovies();
  return res.status(200).json(movies);
}

export default {
  getMovies
}