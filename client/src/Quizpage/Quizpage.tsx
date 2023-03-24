import React, { useEffect, useState } from "react";
import { Quote } from "../types";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

interface QuizpageProps {
    limit? : number
}

const Quizpage = ({limit=1} : QuizpageProps) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        const loadQuotes = async (limit : number) => {
        let response = await fetch("http://localhost:3000/api/quotes" + limit);
        let data: Quote[] = await response.json();
        setQuotes(data);
        }
        loadQuotes(limit);
    }, [limit])

    return (
        <main>
            <div>
                <h3>1/10</h3>
                <h3>Quiz quote:</h3>
                {quotes.map((quote : Quote) => {
                    return (
                        <p key={quote.id}>
                            {quote.dialog}
                        </p>
                    )
                })}
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