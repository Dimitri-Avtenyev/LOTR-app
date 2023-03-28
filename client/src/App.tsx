
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Root from './Root/Root';
import Startpage from './Startpage/Startpage';
import Quizpage from './Quizpage/Quizpage';
import ErrorPage from './ErrorPage/ErrorPage';
import ResultPage from './ResultPage/ResultPage';
import EndQuizPage from "./EndQuizPage/EndQuizPage";

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
        },
        {
          path:"/result",
          element:<ResultPage/>
        }, 
        {
          path:"/endquizpage",
          element:<EndQuizPage/>
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage/>
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
