import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Login.module.css";
import { Link, Navigate } from "react-router-dom";
import { LoggedinContext } from "../../Context/LoggedinContext";
import { UserContext } from "../../Context/UserContext";
import { User } from "../../types";


const FORM_ENDPOINT: string = `${process.env.REACT_APP_API_URL}login`;

const Login = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { loggedin, setLoggedin } = useContext(LoggedinContext)
  const { user, setUser } = useContext(UserContext);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let userResponse: User = await response.json();
      if (response.status === 200) {
        setLoggedin(true);
        setUser(userResponse);
        setShow(false);
        setEmail("");
        setPassword("");
        setErrorMessage("");
      } else if (response.status === 401) {

        setErrorMessage(`${response.statusText}, please try again.`);
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div>
      {loggedin && <Navigate to={"/"} />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1>Login</h1>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body >
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Your password">
              <Form.Control type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" required />
            </FloatingLabel>

          </Modal.Body>
          <Modal.Footer>
            <div>
              {!loading ?
                <Button variant="primary" type="submit" disabled={false}>
                  Login
                </Button> :
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span >Loading...</span>
                </Button>}
            </div>
          </Modal.Footer>
          <div>{errorMessage}</div>
          <div>
            Dont't have an account? <Link to={"/signup"}> Sign up.</Link>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
