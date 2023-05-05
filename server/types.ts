import { ObjectId } from "mongodb";

interface TokenPayload {
  _id?:           string;
  username:       string;
  avatarID:       number;
}
interface TokenPayloadDecoded extends TokenPayload {
  iat:    number;
  exp:    number;
}
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
  _id:        ObjectId;
  dialog:     string;
  movie:      string;
  character:  string;
  id:         string
}
interface Character {
  _id:        ObjectId;
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
  _id:                        ObjectId;
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
  TokenPayload,
  TokenPayloadDecoded,
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

