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
  const [selectedCharacter, setSelectedCharacter] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<boolean>(false);
  const [selectedCharacterIndex, setselectedCharacterIndex] = useState<number>(-1);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

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

  let movieArray = [quotes[activeQuestion]?.movie.name, quotes[activeQuestion]?.wrongAnswers.movie[0].name, quotes[activeQuestion]?.wrongAnswers?.movie[1]?.name];

  /*
  const shuffleArray = (array : string[]) => {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i+1));
      oldElement = array[i];
      array[i] = array[random];
      array[random] = oldElement;
    }
    return array;
  }

  shuffleArray(characterArray);
  shuffleArray(movieArray);
  */

  const submitAnswerHandler = () => {
    setShow(true);
    checkAnswer();
  }

  const onCharacterSelected = (character : string, index : number) => {
    setselectedCharacterIndex(index);
    if (character === quotes[activeQuestion].character.name) {
      setSelectedCharacter(true)
    } else {
      setSelectedCharacter(false)
    }
  }

  const onMovieSelected = (movie : string, index : number) => {
    setSelectedMovieIndex(index);
    if (movie === quotes[activeQuestion].movie.name) {
      setSelectedMovie(true)
    } else {
      setSelectedMovie(false)
    }
  }

  const checkAnswer = () => {
    if (selectedCharacter === true && selectedMovie === true) {
      setScore(score + 1);
    } else if(selectedCharacter === true || selectedMovie === true) {
      setScore(score + 0.5)
    } else {
    }
  }
  
  return (
    <main className={styles.main}>
      {show && <ResultPage show={show} setShow={setShow} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} quote={quotes[activeQuestion]} selectedCharacterIndex={selectedCharacterIndex} setSelectedCharacterIndex={setselectedCharacterIndex} selectedMovieIndex={selectedMovieIndex} setSelectedMovieIndex={setSelectedMovieIndex}/>}
      {loading && <LoadingIndicator />}
      <div>
        <h3>{activeQuestion + 1}/10</h3>
        <h3>Quote: {quotes[activeQuestion]?.dialog}</h3>
      </div>

      <div className={styles.quizForm}>
        <div className={styles.columnLeft}>
          {characterArray.map((character: string, index:number) => {
            return (
              <button key={index} onClick={() => onCharacterSelected(character, index)}
              style={{
                backgroundColor: selectedCharacterIndex === index ? "#50695d" : ""
              }}
              >{character}</button>
            )
          })}
        </div>
        <div className={styles.line}></div>
        <div className={styles.columnRight}>
          {movieArray.map((movie: string, index:number) => {
            return (
              <button key={index} onClick={() => onMovieSelected(movie, index)}
              style={{
                backgroundColor: selectedMovieIndex === index ? "#50695d" : ""
              }}
              >{movie}</button>
            )
          })}
        </div>
      </div>
      <button className={styles.submitButton} onClick={submitAnswerHandler}>Submit Answer</button>
      <h3>Score: {score}</h3>
    </main>
  )
}

export default Quizpage;