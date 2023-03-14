import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { User } from './types';
import CommonPage from './CommonPage/CommonPage';

interface Favorite {
  characterName:  string;
  quote:      string;
}
interface Blacklist {
  quote:    string[];
  reason:   string[];
}
const App = () => {
  const [users, setUsers] = useState<User[]> ();

  useEffect(() => {
    const loadApi = async () => {
      let response = await fetch("http://localhost:3000/api/users");
      let data:User[] = await response.json();
      setUsers(data);
    }
    loadApi();
  }, [])
  return (
    <div>
      <CommonPage/>
      {users && users.map((user:User, index:number) => {
        return (
          <div key={index}>
            <p>{user._id}: {user.userName}</p>
            <p>highscore: </p>{user.highscore}
          </div>
          )
      })
      }
    </div>
  );
}

export default App;
