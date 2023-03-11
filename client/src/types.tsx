export interface User {
  _id?:           string;
  userName:       string;
  password:       string;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
export interface Quote {
  id:         string;
  dialog:     string;
  movie:      string;
  character:  string;
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
export interface Favorite {
  character:  Character;
  quote:      Quote;
}

export interface Blacklist {
  quote:                    Quote;
  reasonForBlacklisting:    string;
}


