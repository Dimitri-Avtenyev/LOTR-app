import React from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Quizpage = () => {
    return (
        <main>
            <div>
                <h3>1/10</h3>
                <h3>Quiz quote: randomly generated quote</h3>
            </div>
            <div className={styles.Quizform}>
                <div className={styles.quizColumn}>
                    <p>image</p>
                    <label>character name</label>
                    <input type="radio"></input>
                </div>
                <div className={styles.line}></div>
                <div className={styles.quizColumn}>
                    <p>image</p>
                    <label>movie name</label>
                    <input type="radio"></input>
                </div>
            </div>
        </main>
    )
}

export default Quizpage;