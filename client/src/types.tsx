export interface User {
  _id?:           string;
  userName:       string;
  password:       string;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
export interface Favorite {
  characterName:  string;
  quote:          string;
}

export interface Blacklist {
  quote:                    string;
  reasonForBlacklisting:    string;
}


