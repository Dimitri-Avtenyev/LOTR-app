import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


interface User {
  _id?:       string;
  name:       string;
  highscore:  number;
  favorites:  Favorite[];
  blacklist:  Blacklist[];
}
interface Favorite {
  characterName:  string;
  quote:      string[];
}
interface Blacklist {
  quote:    string[];
  reason:   string[];
}
const App = () => {
  const [accounts, setAccounts] = useState<User[]> ();

  useEffect(() => {
    const loadApi = async () => {
      let response = await fetch("http://localhost:5005/api/users");
      let data:User[] = await response.json();
      setAccounts(data);
    }
    loadApi();
  }, [])

  return (
    <div>
      {accounts && accounts.map((user:User, index:number) => {
        return (
          <div>
            <p>{user._id}: {user.name}</p>
            <p>highscore: </p>{user.highscore}
          </div>
          )
      })
      }
    </div>
  );
}

export default App;
