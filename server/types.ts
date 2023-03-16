import { ObjectId } from "mongodb";

interface User {
  _id?:           ObjectId;
  username:       string;
  password:       string;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
interface Quote {
  id:         string;
  dialog:     string;
  movie:      string;
  character:  string;
}
interface Character {
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
  Quote,
  Favorite,
  Blacklist,
  UserHighscore
};

