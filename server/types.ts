import { ObjectId } from "mongodb";

interface UserCredentials {
  username:       string;
  password:       string;
}
interface User extends UserCredentials {
  _id?:           ObjectId;
  avatarID:       number;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
interface UserBasic {
  _id?:           ObjectId;
  username:       string;
  avatarID:       number;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
interface QuoteQuiz {
  id:             string;
  dialog:         string;
  movie:          Movie;
  character:      Character;
  wrongAnswers?:  WrongAnswer;
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
  UserBasic,
  Quote,
  QuoteQuiz,
  WrongAnswer,
  Movie,
  Character,
  Favorite,
  Blacklist,
  UserHighscore
};

