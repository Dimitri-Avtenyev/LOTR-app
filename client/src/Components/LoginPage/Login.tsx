import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styles from "./Login.module.css";
import { Link, NavLink, redirect } from "react-router-dom";
import { LoggedinContext } from "../../Context/LoggedinContext";
import CommonPage from "../CommonPage/CommonPage";
import { UserContext } from "../../Context/UserContext";
import { User } from "../../types";

const FORM_ENDPOINT: string = `${process.env.REACT_APP_API_URL}users/login`;

const Login = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loggedin, setLoggedin } = useContext(LoggedinContext)
  const { user, setUser } = useContext(UserContext);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setMessage("Logged in successfully.");
      }
    } catch (err) {
      setMessage("Wrong email, password or credentials do not exist. Please try again.");
    }

    setSubmitted(true);
  }

  return (
    <div>
      {loggedin && <CommonPage />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton><h1>Login</h1></Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body >
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Create password">
              <Form.Control type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" required />
            </FloatingLabel>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={false}>
              Login
            </Button>
          </Modal.Footer>
          <div>
            Dont't have an account? <Link to={"/signup"}> Sign up.</Link>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
