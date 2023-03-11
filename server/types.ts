import { ObjectId } from "mongodb";

interface User {
  _id?:           ObjectId;
  userName:       string;
  password:       string;
  highscore:      number;
  favorites:      Favorite[];
  blacklist:      Blacklist[];
}
interface Favorite {
  characterName:  string;
  quote:          string;
}

interface Blacklist {
  quote:                    string;
  reasonForBlacklisting:    string;
}

export {
  User,
  Favorite,
  Blacklist
}

