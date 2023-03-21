import React from "react";
import styles from "./Startpage.module.css";
import Button from 'react-bootstrap/Button';

const Startpage = () => {
    return (
        <main>
            <div className={styles.startpage}>
                <h1>Lord of the rings <br></br> Quiz</h1>
                <p>Beetje uitleg over de quiz</p>
                <Button className={styles.startButton} variant="primary" size="lg">Start Quiz</Button>
            </div>
        </main>
    )
}

export default Startpage;