import React, {useState} from "react";
import styles from "./EndQuizPage.module.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

interface EndQuizPageProps {
    score: number;
}

const EndQuizPage = ({score} : EndQuizPageProps) => {
    const [show, setShow] = useState<boolean>(true);

    return (
        <Modal className={styles.container}
            show={show}
            backdrop="static"
            keyboard={false}
            centered={true}
        >
            <Modal.Header className={styles.header}>
                <h1>End Quiz</h1>
            </Modal.Header>
            <Modal.Body>
                <p>Your score: {score}/10</p>
                <p>Your highscore: X/10</p>
                
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                <Link to="/start/:project">Try again?</Link>
            </Modal.Footer>
        </Modal>
       ) 
}

export default EndQuizPage;