import { Character, Movie, Quote, QuoteQuiz, WrongAnswer } from "../types";
import movieService from "../services/movieService";
import characterService from "./characterService";
import quoteService from "./quoteService";

const getQuiz = async (amountQuotes: number) => {
  let quoteQuiz: QuoteQuiz[] = [];

  let [randomQuotes, movies, characters] = await Promise.all([
    quoteService.getQuotes(amountQuotes), 
    movieService.getMovies(), 
    characterService.getCharacters()
  ]);
  
  for (var quote of randomQuotes) {
    let foundMovie: Movie = {} as Movie;
    let foundCharacter: Character = {} as Character;
    try {
      [foundMovie, foundCharacter] = await Promise.all([
        movieService.getMovie(movies, quote.movie),
        characterService.getCharacter(characters, quote.character)
      ])
    
    } catch (err) {
      console.log(err);
    }

    let wrongAnswers: WrongAnswer = randomizeWrongAnswers(movies, characters);

    let quoteQuizElement: QuoteQuiz =
    {
      id: quote.id,
      dialog: quote.dialog,
      movie: foundMovie,
      character: foundCharacter,
      wrongAnswers: wrongAnswers
    }
    quoteQuiz.push(quoteQuizElement);
  }

  return quoteQuiz;
}
const randomizeWrongAnswers = (movies: Movie[], characters: Character[], numberOfAnswers: number = 2, min: number = 0): WrongAnswer => {
  let wrongMovies:Movie[] = [];
  let wrongCharacters:Character[] = [];

  for (let i: number = 0; i < numberOfAnswers; i++) {
   
    while(wrongMovies.length !== numberOfAnswers) {
      let randomIndexMovies: number = Math.floor(Math.random() * (movies.length - min)) + min;
      if (!wrongMovies.find(movie => movie._id.toString() === movies[randomIndexMovies]._id.toString())) {
        wrongMovies.push(movies[randomIndexMovies]);
      }
    }
   
    while(wrongCharacters.length !== numberOfAnswers) {
      let randomIndexCharacters: number = Math.floor(Math.random() * (characters.length - min)) + min;
      if (!wrongCharacters.find(character => character._id.toString() === characters[randomIndexCharacters]._id.toString())) {
        wrongCharacters.push(characters[randomIndexCharacters]);
      }
    }
 
  }
  let wrongAnswers: WrongAnswer = {
    movie:      wrongMovies,
    character:  wrongCharacters
  }

  return wrongAnswers;
}

export default {
  getQuiz
}