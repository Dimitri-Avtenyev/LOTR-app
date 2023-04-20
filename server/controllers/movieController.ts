import movieService from "../services/movieService";

const getMovies = async (req:any, res:any) => {
  res.type("application/json");
  const movies = await movieService.getMovies();
  res.status(200).json(movies);
}

export default {
  getMovies
}