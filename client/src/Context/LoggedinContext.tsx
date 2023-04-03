import React from "react"


interface ILoggedinContext {
  loggedin:       boolean;
  setLoggedin:    (loggedin:boolean) => void;
}

export const LoggedinContext = React.createContext<ILoggedinContext>({loggedin: false, setLoggedin: (loggedin:boolean) => {}});