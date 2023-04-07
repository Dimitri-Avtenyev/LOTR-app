export interface User {
  _id?:           string;
  avatarID:       number;
  userName:       string;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
export interface Quote {
  id:           string;
  dialog:       string;
  movie:        Movie;
  character:    Character;
  wrongAnswers: WrongAnswer;
}
export interface WrongAnswer {
  movie:      Movie[];
  character:  Character[];
}
export interface Character {
  id:         string;
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
export interface Movie {
  _id:                        string;
  name:                       string;
  runtimeInMinutes:           number;
  budgetInMillions:           number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations:    number;
  academyAwardWins:           number;
  rottenTomatoesScore:        number;
}
export interface Favorite {
  character:  Character;
  quote:      Quote;
}

export interface Blacklist {
  quote:                    Quote;
  reasonForBlacklisting:    string;
}


