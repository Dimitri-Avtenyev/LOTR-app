
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './Components/CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Root from './Root/Root';
import Startpage from './Components/Startpage/Startpage';
import { UserContext } from './Context/UserContext';
import { Character, Movie, User } from './types';
import { useEffect, useState } from 'react';
import { LoggedinContext } from './Context/LoggedinContext';
import Quizpage from './Components/Quizpage/Quizpage';
import EndQuizPage from './Components/EndQuizPage/EndQuizPage';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import LoginPage from './Components/LoginPage/LoginPage';
import ResultPage from './Components/ResultPage/ResultPage';
import AccountPage from './Components/AccountPage/AccountPage';
import UserPreference from './Components/UserPreference/UserPreference';

const App = () => {
  const [loggedin, setLoggedin] = useState<boolean>(JSON.parse(localStorage.getItem("loggedin")?? "false"));
  const [user, setUser] = useState<User>({
    _id: "123",
    avatarID: 1,
    userName: "Gandalf",
    highscore: 10,
    favorites: [],
    blacklist: []
  });
  useEffect(() => {
    localStorage.setItem("loggedin", JSON.parse(loggedin.toString()));
}, [loggedin]);

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
          element: <LoginPage />
        },
        {
          path: "account",
          element: <AccountPage account={user}/>
        },
        {
          path: "account/favorites",
          element: <UserPreference preference={"favorites"} user={user}/>
        },
        {
          path: "account/blacklisted",
          element: <UserPreference preference={"blacklisted"} user={user}/>
        },
        {
          path: "start/:project", 
          element: <Startpage />
        },
        {
          path: "quiz/theone",
          element: <Quizpage limit={1} />
        },
        {
          path: "quiz/result",
          element: <ResultPage />
        },
        {
          path: "quiz/endquiz",
          element: <EndQuizPage />
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return (
    <div>
      <LoggedinContext.Provider value={{loggedin, setLoggedin}}>
        <UserContext.Provider value={{ user: user }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </LoggedinContext.Provider>

    </div>

  );
}

export default App;
