import React, { useEffect, useState } from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ResultPage from "../ResultPage/ResultPage";
import { Quote } from "../../types";
import { act } from "react-dom/test-utils";

const Quizpage = () => {
    const [loading, setLoading] = useState(false);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(0);

    useEffect(() => {
        setLoading(true);
        const loadQuotes = async () => {
        let response = await fetch("http://localhost:3000/api/quiz");
        let data: Quote[] = await response.json();
        setQuotes(data);
        setLoading(false);
        }
        loadQuotes();
    }, []);

    const submitAnswerHandler = () => {
        setActiveQuestion((prev) => prev + 1)
    }

    const onAnswerSelected = (answer : string, index : number) => {
        setSelectedAnswerIndex(index)
        if(answer === quotes[activeQuestion].character.name) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    return (
        <main className={styles.main}>
            {loading && <LoadingIndicator/>}
            <div>
                <h3>{activeQuestion}/10</h3>
                <h3>Quote: {quotes[activeQuestion]?.dialog}</h3>
            </div>
                
            <div className={styles.quizForm}>
                <div className={styles.columnLeft}>
                    <p>{quotes[activeQuestion]?.character.name}</p>
                    <p>{quotes[activeQuestion]?.wrongAnswers.character[0].name}</p>
                    <p>{quotes[activeQuestion]?.wrongAnswers.character[1].name}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.columnRight}>
                    <p>{quotes[activeQuestion]?.movie.name}</p>
                    <p>{quotes[activeQuestion]?.wrongAnswers.movie[0].name}</p>
                    <p>{quotes[activeQuestion]?.wrongAnswers.movie[1].name}</p>
                </div>
            </div>
            <button className={styles.submitButton} onClick={submitAnswerHandler}>Submit Answer</button>
        </main>
    )
}

export default Quizpage;