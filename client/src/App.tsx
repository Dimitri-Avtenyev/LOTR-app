
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Root from './Root/Root';
import Startpage from './Startpage/Startpage';
import Quizpage from './Quizpage/Quizpage';
import ErrorPage from './ErrorPage/ErrorPage';
import ResultPage from './ResultPage/ResultPage';
import EndQuizPage from "./EndQuizPage/EndQuizPage";
import LoginPage from './LoginPage/LoginPage';
import { UserContext } from './Context/UserContext';
import { User } from './types';
import { useState } from 'react';
import { LoggedinContext } from './Context/LoggedinContext';

const App = () => {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    _id: "123",
    userName: "Guest",
    highscore: 0,
    favorites: [],
    blacklist: []
  });
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
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "startpage/theone", //nadien fix met params -> "startpage/:"
          element: <Startpage />
        },
        {
          path: "quizpage/theone",
          element: <Quizpage />
        },
        {
          path: "/result",
          element: <ResultPage />
        },
        {
          path: "/endquizpage",
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
