
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './Components/CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Root from './Root/Root';
import Startpage from './Components/Startpage/Startpage';
import { UserContext } from './Context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { LoggedinContext } from './Context/LoggedinContext';
import Quizpage from './Components/Quizpage/Quizpage';
import EndQuizPage from './Components/EndQuizPage/EndQuizPage';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import AccountPage from './Components/AccountPage/AccountPage';
import UserPreference from './Components/UserPreference/UserPreference';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { User } from './types';

const App = () => {
  const [loggedin, setLoggedin] = useState<boolean>(JSON.parse(localStorage.getItem("loggedin") ?? "false"));
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem("user") ?? JSON.stringify(
    {
      _id: "",
      avatarID: 1,
      username: "",
      highscore: 0,
      favorites: [],
      blacklist: []
    }
    )));
    
  useEffect(() => {
    localStorage.setItem("loggedin", JSON.parse(loggedin.toString()));
  }, [loggedin]);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <CommonPage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <Signup />
        },
        {
          path: "account",
          element: <AccountPage />
        },
        {
          path: "account/favorites",
          element: <UserPreference preference={"favorites"} user={user} />
        },
        {
          path: "account/blacklist",
          element: <UserPreference preference={"blacklist"} user={user} />
        },
        {
          path: "start/:project",
          element: <Startpage />
        },
        {
          path: "quiz/theone",
          element: <Quizpage/>
        },
        {
          path: "quiz/endquiz",
          element: <EndQuizPage />
        },
      ]
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return (
    <div>
      <LoggedinContext.Provider value={{ loggedin, setLoggedin }}>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </LoggedinContext.Provider>

    </div>

  );
}

export default App;
