
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonPage from './CommonPage/CommonPage';
import { createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import './App.css';
import Root from './Root/Root';
import Startpage from './Startpage/Startpage';

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
