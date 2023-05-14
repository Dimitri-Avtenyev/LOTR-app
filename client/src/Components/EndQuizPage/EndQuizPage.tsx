import React, { useEffect, useState, useContext } from "react";
import styles from "./EndQuizPage.module.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { User } from "../../types";
import { updateUserData } from "../../utils/fetchHandlers";

interface EndQuizPageProps {
  score: number;
}

const EndQuizPage = ({ score }: EndQuizPageProps) => {
  const [show, setShow] = useState<boolean>(true);
  const [highscore, setHighscore] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getUserHighscore();

  }, [])

  const getUserHighscore = async () => {
    try {
      let response: Response = await fetch(`${process.env.REACT_APP_API_URL}api/users/highscore`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      let highscore: number = await response.json();
      if (response.status === 200) {
        setHighscore(highscore);
        if (score > highscore) {
          setMessage("Congratulations! New highscore!")
          updateUserData(`${process.env.REACT_APP_API_URL}api/users/update`, JSON.stringify({ highscore: score }));
        } else {
          setMessage("You scored less than your personal highscore");
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal className={styles.container}
      show={show}
      backdrop="static"
      keyboard={false}
      centered={true}
    >
      <Modal.Header className={styles.header}>
        <h1>End Quiz</h1>
        <p>{message}</p>
      </Modal.Header>
      <Modal.Body>
        <p>Your score: {score}/10</p>
        <p>Your highscore: {highscore}/10</p>

      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Link to="/start/:project">Try again?</Link>
      </Modal.Footer>
    </Modal>
  )
}

export default EndQuizPage;