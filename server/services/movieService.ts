import axios from "axios";
import { Movie } from "../types";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } };

const getMovies = async () => {
  let movies: Movie[] = [];
  let response = await axios.get(`${process.env.API_URL}/movie`, API_HEADER);
  let data: Movie[] = await response.data.docs;

  movies = data;

  return movies;
}
const getMovie = async (movies:Movie[], id:string) => {
    let foundMovie:Movie | null = movies.find(movie => movie._id === id) || null;
    if (foundMovie === null) {
      throw "Movie not found";
    }
    return foundMovie;
}
export default {
  getMovies,
  getMovie
}