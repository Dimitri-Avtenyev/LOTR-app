import React, { useEffect, useState } from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { User } from './types';
import Root from './Root/Root';
import Startpage from './Startpage/Startpage';

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

  const router = createBrowserRouter([
      {
          path: "/",
          element: <Root/>,
          children: [
              {
                path: "Startpage",
                element: <Startpage/>
            },
          ]
      }
  ]);

  return (
    <div>
      <div>
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

      <div>
        <RouterProvider router={router} />
      </div>
    </div>
    
  );
}

export default App;
