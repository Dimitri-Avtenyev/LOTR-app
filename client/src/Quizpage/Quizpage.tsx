import React, { useEffect, useState } from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Quote, Movie, Character } from "../types";


interface QuizProps {
    limit: number
}

const Quizpage = ({limit = 1} : QuizProps) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        const loadQuotes = async (limit : number) => {
        let response = await fetch("http://localhost:3000/api/quiz/" + limit);
        let data: Quote[] = await response.json();
        setQuotes(data);
        }
        loadQuotes(limit);
    }, [limit])

   
    return (
        <main className={styles.main}>
            {quotes.map((quote: Quote) => {
                return (
                    <div>
                        <h3>1/10</h3>
                        <h3>Quote: {quote.dialog}</h3>
                        
                        <div className={styles.quizForm}>
                            <div className={styles.columnLeft}>
                                <p>{quote.character.name}</p>
                                <p>{quote.wrongAnswers.character[0].name}</p>
                                <p>{quote.wrongAnswers.character[1].name}</p>
                            </div> 
                            <div className={styles.line}></div>
                            <div className={styles.columnRight}>
                                <p>{quote.movie.name}</p>
                                <p>{quote.wrongAnswers.movie[0].name}</p>
                                <p>{quote.wrongAnswers.movie[1].name}</p>
                            </div>
                        </div>
                    </div>
                )
            })}

            <button className={styles.submitButton}>Submit Answer</button>
        </main>
    )
}

export default Quizpage;