import movieService from "../services/movieService";

const getMovies = async (req:any, res:any) => {
  res.type("application/json");
  const quotes = await movieService.getMovies();
  res.status(200).json(quotes);
}

export default {
  getMovies
}