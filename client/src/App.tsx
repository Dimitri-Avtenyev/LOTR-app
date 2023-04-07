
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './Components/CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Root from './Root/Root';
import Startpage from './Components/Startpage/Startpage';
import { UserContext } from './Context/UserContext';
import { User } from './types';
import { useEffect, useState } from 'react';
import { LoggedinContext } from './Context/LoggedinContext';
import Quizpage from './Components/Quizpage/Quizpage';
import EndQuizPage from './Components/EndQuizPage/EndQuizPage';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import LoginPage from './Components/LoginPage/LoginPage';
import ResultPage from './Components/ResultPage/ResultPage';

const App = () => {
  const [loggedin, setLoggedin] = useState<boolean>(JSON.parse(localStorage.getItem("loggedin")?? "false"));
  const [user, setUser] = useState<User>({
    _id: "123",
    userName: "Guest",
    highscore: 0,
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
          path: "startpage/:project", 
          element: <Startpage />
        },
        {
          path: "quizpage/theone",
          element: <Quizpage limit={1} />
        },
        {
          path: "quizpage/result",
          element: <ResultPage />
        },
        {
          path: "quizpage/endquizpage",
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
