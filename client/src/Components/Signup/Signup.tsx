import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import Login from "../LoginPage/Login";

const FORM_ENDPOINT:string = "http://localhost:3000/api/users/signup";

const Signup = () => {
  const [show, setShow] = useState(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    let response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 201) {
      setEmail("");
      setPassword("");
      setMessage("Signed up successfully, please loging to continue.");
    } else if (response.status === 400) {
      setEmail("");
      setPassword("");
      setMessage("User already exist.");
    }
  } catch (err) {
    setMessage("Something went wrong signing up.");
  }
    setSubmitted(true);
  }
  
  return (
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Header closeButton><h1>{submitted ? message : "Signup"}</h1></Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body >
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@example.com" required/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Create password">
              <Form.Control type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" required/>
            </FloatingLabel>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={submitted}>
              Signup
            </Button>
          </Modal.Footer>
          <div>
            Already have an account? <Link to={"/login"}> Log in.</Link>
          </div>
        </Form>
      </Modal>
  );
};

export default Signup;
