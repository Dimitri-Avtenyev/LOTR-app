import React from "react";
import styles from "./EndQuizPage.module.css";
import { Link } from "react-router-dom";


const EndQuizPage = () => {
    return (
        <main>
            <div className={styles.container}>
            <h1>End Quiz</h1>
            <p>Your score: X/10</p>
            <p>Your highscore: X/10</p>
            <Link to="/startpage/theone">Try again?</Link>
            </div>
        </main>
       ) 
}

export default EndQuizPage;