import { ObjectId } from "mongodb";

interface User {
  _id?:           ObjectId;
  username:       string;
  password:       string;
  avatarID:       number;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
interface UserCredentials {
  username:       string;
  password:       string;
}
interface QuoteQuiz {
  id:           string;
  dialog:       string;
  movie:        Movie;
  character:    Character;
  wrongAnswers: WrongAnswer;
}
interface WrongAnswer {
  movie:      Movie[];
  character:  Character[];
}
interface Quote {
  id:         string;
  dialog:     string;
  movie:      string;
  character:  string;
}
interface Character {
  _id:         string;
  height:     string;
  race:       string;
  gender:     string;
  spouse:     string;
  death:      string;
  realm:      string;
  hair:       string;
  name:       string;
  wikiUrl:    string;
}
interface Movie {
  _id:                        string;
  name:                       string;
  runtimeInMinutes:           number;
  budgetInMillions:           number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations:    number;
  academyAwardWins:           number;
  rottenTomatoesScore:        number;
}
interface Favorite {
  character:  Character;
  quote:      Quote;
}

interface Blacklist {
  quote:                    Quote;
  reasonForBlacklisting:    string;
}

interface UserHighscore {
  userName:       string;
  score:          number;
}

export {
  User,
  UserCredentials,
  Quote,
  QuoteQuiz,
  WrongAnswer,
  Movie,
  Character,
  Favorite,
  Blacklist,
  UserHighscore
};

