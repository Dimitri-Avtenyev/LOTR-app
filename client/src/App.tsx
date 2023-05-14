
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './Components/CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './Root/Root';
import Startpage from './Components/Startpage/Startpage';
import { useEffect, useState } from 'react';
import { LoggedinContext } from './Context/LoggedinContext';
import Quizpage from './Components/Quizpage/Quizpage';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import AccountPage from './Components/AccountPage/AccountPage';
import UserPreference from './Components/UserPreference/UserPreference';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import './index.css';
import './Fonts/aniron.regular.ttf';
import ProtectedRoutes from './ProtectedRoutes';
import SuddenDeathPage from './Components/SuddenDeathPage/SuddenDeathPage';

const App = () => {
  const [loggedin, setLoggedin] = useState<boolean>(JSON.parse(localStorage.getItem("loggedin") ?? "false"));

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
          element: <Login />
        },
        {
          path: "signup",
          element: <Signup />
        },
        {
          path: "account",
          element: <ProtectedRoutes element={<AccountPage />} loggedin={loggedin} />
        },
        {
          path: "account/favorites",
          element: <ProtectedRoutes element={<UserPreference preference={"favorites"}/>} loggedin={loggedin} />
        },
        {
          path: "account/blacklist",
          element: <ProtectedRoutes element={<UserPreference preference={"blacklist"}/>} loggedin={loggedin} />
        },
        {
          path: "start/:project",
          element: <ProtectedRoutes element={<Startpage />} loggedin={loggedin}/>
        },
        {
          path: "quiz/theone",
          element: <ProtectedRoutes element={ <Quizpage/>} loggedin={loggedin}/>
        },
        {
          path: "quiz/suddendeath",
          element: <ProtectedRoutes element={ <SuddenDeathPage/>} loggedin={loggedin}/>
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
      <LoggedinContext.Provider value={{ loggedin, setLoggedin }}>
          <RouterProvider router={router} />
      </LoggedinContext.Provider>
    </div>

  );
}

export default App;
