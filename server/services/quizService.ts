import axios from "axios";
import { Character, Movie, Quote, QuoteQuiz } from "../types";
import movieService from "../services/movieService";
import characterService from "./characterService";
import quoteService from "./quoteService";

const getQuiz = async (amountQuotes:number) => {
  let quoteQuiz:QuoteQuiz[] = [];

  let randomQuotes:Quote[] = await quoteService.getQuotes(amountQuotes);
  let movies:Movie[] = await movieService.getMovies();
  let characters:Character[] = await characterService.getCharacters();

  for (var quote of randomQuotes) {
    let foundMovie:Movie = {} as Movie;
    let foundCharacter:Character = {} as Character;
    try {
      foundMovie = await movieService.getMovie(movies, quote.movie);
      foundCharacter = await characterService.getCharacter(characters, quote.character);
  
    } catch (err) {
      console.log(err);
    }
    let quoteQuizElement:QuoteQuiz = 
    {
      id:  quote.id,
      dialog: quote.dialog,
      movie: foundMovie,
      character: foundCharacter
    }
    quoteQuiz.push(quoteQuizElement);
  }
  return quoteQuiz;
}
export default {
  getQuiz
}