import { useEffect, useState } from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import {  Quote } from "../../types";
import ResultPage from "../ResultPage/ResultPage";

const Quizpage = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false);
  const [selectedAnswerCharacterIndex, setSelectedAnswerMovieIndex] = useState(0);
  const [show, setShow] = useState(false);

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

  let characterArray = [quotes[activeQuestion]?.character.name, quotes[activeQuestion]?.wrongAnswers.character[0].name, quotes[activeQuestion]?.wrongAnswers.character[1].name];

  let movieArray = [quotes[activeQuestion]?.movie.name, quotes[activeQuestion]?.wrongAnswers.movie[0].name, quotes[activeQuestion]?.wrongAnswers?.movie[1]?.name]

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  shuffleArray(characterArray);
  shuffleArray(movieArray);

  const submitAnswerHandler = () => {
    setShow(true);
  }

  const onAnswerSelected = (answer: string) => {
    if (answer === quotes[activeQuestion].character.name) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }
  
  return (
    <main className={styles.main}>
      {show && <ResultPage show={show} setShow={setShow} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} quote={quotes[activeQuestion]}/>}
      {loading && <LoadingIndicator />}
      <div>
        <h3>{activeQuestion + 1}/10</h3>
        <h3>Quote: {quotes[activeQuestion]?.dialog}</h3>
      </div>

      <div className={styles.quizForm}>
        <div className={styles.columnLeft}>
          {characterArray.map((character: string, index:number) => {
            return (
              <p key={index}>{character}</p>
            )
          })}
        </div>
        <div className={styles.line}></div>
        <div className={styles.columnRight}>
          {movieArray.map((movie: string, index:number) => {
            return (
              <p key={index}>{movie}</p>
            )
          })}
        </div>
      </div>
      <button className={styles.submitButton} onClick={submitAnswerHandler}>Submit Answer</button>
    </main>
  )
}

export default Quizpage;