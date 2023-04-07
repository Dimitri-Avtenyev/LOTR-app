import React from "react";
import { User } from "../types";

interface IUserContext {
  user:   User
}

export const UserContext = React.createContext<IUserContext>({
  user: {
    _id:            "",
    avatarID:       1,
    userName:       "Guest",
    highscore:      0,
    favorites:      [],
    blacklist:      []
  } 
})