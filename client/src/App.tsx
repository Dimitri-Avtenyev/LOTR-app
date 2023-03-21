
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import './App.css';
import Root from './Root/Root';
import Startpage from './Startpage/Startpage';
import Quizpage from './Quizpage/Quizpage';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "",
          element: <CommonPage/>
        },
        {
          path:"startpage/theone", //nadien fix met params -> "startpage/:"
          element: <Startpage/>
        },
        {
          path:"quizpage/theone", 
          element: <Quizpage/>
        }
      ]
    },
    {
      path: "*",
      element: <></>// <PageNotFound/>
    }
  ]);

  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>

  );
}

export default App;
