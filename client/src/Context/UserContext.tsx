import React from "react";
import { User } from "../types";

interface IUserContext {
  user:     User;
  setUser:  (user:User) => void;
}

export const UserContext = React.createContext<IUserContext>({
  user: {
    _id:            "",
    avatarID:       3,
    userName:       "",
    highscore:      0,
    favorites:      [],
    blacklist:      []
  },
  setUser: (user:User) => {}
})