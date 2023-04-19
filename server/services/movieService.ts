import axios from "axios";
import { Movie } from "../types";
import failsafeService from "./failsafeService";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } };

const getMovies = async () => {
  let movies: Movie[] = [];

  try {
    let response = await axios.get(`${process.env.API_URL}/movie`, API_HEADER);

    if (response.status === 200) {
      movies = await response.data.docs;
      await failsafeService.populateDbMovies(movies);
    }
  } catch (err) {
    console.log(`${err}: fetching from db`);
    movies = await failsafeService.getDbMovies();
  }
  
  return movies;
}
const getMovie = async (movies:Movie[], id:string) => {
    let foundMovie:Movie | null = movies.find(movie => movie._id.toString() === id) || null;
    if (foundMovie === null) {
      throw "Movie not found";
    }
    return foundMovie;
}

export default {
  getMovies,
  getMovie
}