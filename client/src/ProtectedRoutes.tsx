import { useState } from "react";
import AccessPage from "./Components/AccessPage/AccessPage";
import Login from "./Components/Login/Login";
import { Link } from "react-router-dom";


const ProtectedRoutes = ({ element, loggedin }: { element: JSX.Element, loggedin: boolean }) => {
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);

  if (loggedin) {
    return (
      element
    );
  }
  return (
    <AccessPage message={"You must be logged in to have access"} show={show} setShow={setShow} />
  )
}

export default ProtectedRoutes;