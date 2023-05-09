import { Character, Movie, QuoteQuiz, WrongAnswer } from "../types";
import movieService from "../services/movieService";
import characterService from "./characterService";
import quoteService from "./quoteService";

const getQuiz = async (amountQuotes?: number): Promise<QuoteQuiz[]> => {
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
    
    let wrongAnswers: WrongAnswer = randomizeWrongAnswers(movies, foundMovie, characters, foundCharacter);
    
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
const randomizeWrongAnswers = (movies: Movie[], foundMovie: Movie, characters: Character[], foundCharacter: Character, numberOfAnswers: number = 2): WrongAnswer => {
  let wrongMovies: Movie[] = [];
  let wrongCharacters: Character[] = [];

  let movieIndex: number = movies.indexOf(foundMovie);
  let characterIndex: number = characters.indexOf(foundCharacter);
  let moviesCpy: Movie[] = [...movies];
  let charactersCpy: Character[] = [...characters];

  moviesCpy.splice(movieIndex, 1);
  charactersCpy.splice(characterIndex, 1);
  for (let i: number = 0; i < numberOfAnswers; i++) {
    
    let randomIndexMovies: number = Math.floor(Math.random() * (moviesCpy.length - i));
    let randomIndexCharacters: number = Math.floor(Math.random() * (charactersCpy.length - i));

    wrongMovies.push(moviesCpy[randomIndexMovies]);
    wrongCharacters.push(charactersCpy[randomIndexCharacters]);

    moviesCpy.splice(randomIndexMovies, 1);
    charactersCpy.splice(randomIndexCharacters, 1);
  }

  let wrongAnswers: WrongAnswer = {
    movie: wrongMovies,
    character: wrongCharacters
  }

  return wrongAnswers;
}

export default {
  getQuiz
}