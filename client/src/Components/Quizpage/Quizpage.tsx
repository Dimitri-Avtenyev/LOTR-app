import { useEffect, useState } from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { Quote } from "../../types";
import ResultPage from "../ResultPage/ResultPage";
import wallppaper from "./assets/wallpaper.jpg";
import EndQuizPage from "../EndQuizPage/EndQuizPage";
import ProgressTimer from "../ProgressTimer/ProgressTimer";
import { isArgumentsObject } from "util/types";


const Quizpage = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [movies, setMovies] = useState<string[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedCharacter, setSelectedCharacter] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<boolean>(false);
  const [selectedCharacterIndex, setselectedCharacterIndex] = useState<number>(-1);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [active, setActive] = useState<boolean>(true);
  const [fullQuote, setFullQuote] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const loadQuotes = async () => {
      let response = await fetch(`${process.env.REACT_APP_API_URL}api/quiz`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      let data: Quote[] = await response.json();
      setQuotes(data);

      let characters: string[] = [
        data[activeQuestion].character.name,
        data[activeQuestion]?.wrongAnswers?.character[0].name,
        data[activeQuestion]?.wrongAnswers?.character[1].name
      ];
      let movies: string[] = [
        data[activeQuestion]?.movie.name,
        data[activeQuestion]?.wrongAnswers?.movie[0].name,
        data[activeQuestion]?.wrongAnswers?.movie[1]?.name
      ]
      shuffleArr(characters);
      shuffleArr(movies);

      setCharacters(characters);
      setMovies(movies);

      setLoading(false);
    }
    loadQuotes();

  }, []);

  useEffect(() => {
    setSelectedCharacter(false);
    setSelectedMovie(false);

    let characters: string[] = [
      quotes[activeQuestion]?.character.name,
      quotes[activeQuestion]?.wrongAnswers?.character[0].name,
      quotes[activeQuestion]?.wrongAnswers?.character[1].name
    ];
    let movies: string[] = [
      quotes[activeQuestion]?.movie.name,
      quotes[activeQuestion]?.wrongAnswers?.movie[0].name,
      quotes[activeQuestion]?.wrongAnswers?.movie[1]?.name
    ]

    shuffleArr(characters);
    shuffleArr(movies);

    setCharacters(characters);;
    setMovies(movies);
    
    setActive(true);
  }, [activeQuestion]);

useEffect(() => {
  if (!active) {
    setShow(true);
    checkAnswer();
  } 
}, [active]);

  const shuffleArr = (arr: string[]): string[] => {
    for (let i: number = 0; i < arr.length; i++) {
      let randomIndex: number = Math.floor((Math.random() * arr.length));
      let tempRef: string = arr[i];
      let tempNext: string = arr[randomIndex];

      arr[i] = tempNext;
      arr[randomIndex] = tempRef;
    }
    return arr;
  }

  const submitAnswerHandler = () => {
    setShow(true);
    setActive(false);
  }

  const onCharacterSelected = (character: string, index: number) => {
    setselectedCharacterIndex(index);
    if (character === quotes[activeQuestion].character.name) {
      setSelectedCharacter(true)
    } else {
      setSelectedCharacter(false)
    }
  }

  const onMovieSelected = (movie: string, index: number) => {
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
    } else if (selectedCharacter === true || selectedMovie === true) {
      setScore(score + 0.5)
    } else {
    }
  }

  const ReadMore = () => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const toggleReadMore = () => {
      setIsReadMore(false);
    }
    return (
      <div>
        {isReadMore ? 
        <div>
          <h3>
          {quotes[activeQuestion]?.dialog.slice(0, 70).concat("...")}
          </h3>
          <button className={styles.readMoreButton} onClick={toggleReadMore}>Read More...</button>
        </div> :
        <div>
          <h3>{quotes[activeQuestion]?.dialog}</h3>
        </div>
        }
        
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <img className={styles.wallpaper} src={wallppaper} />
      {show && <ResultPage show={show} setShow={setShow} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} quote={quotes[activeQuestion]} selectedCharacterIndex={selectedCharacterIndex} setSelectedCharacterIndex={setselectedCharacterIndex} selectedMovieIndex={selectedMovieIndex} setSelectedMovieIndex={setSelectedMovieIndex} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}
      {loading && <LoadingIndicator />}
      {
        activeQuestion === 10 ? <EndQuizPage score={score} /> :
          <div>
            {!loading && <ProgressTimer timer={15} active={active} setActive={setActive} />}
            <div>
              <h3>{activeQuestion + 1}/10</h3>
              <h3>
              {
              quotes[activeQuestion]?.dialog.length > 70 ? <ReadMore/> :
              quotes[activeQuestion]?.dialog 
              }
              </h3>
            </div>

            <div className={styles.quizForm}>
              <div className={styles.columnLeft}>
                {characters.map((character: string, index: number) => {
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
                {movies.map((movie: string, index: number) => {
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

            <button className={styles.submitButton} onClick={submitAnswerHandler} disabled={selectedCharacterIndex > -1 && selectedMovieIndex > -1 ? false : true}>Submit Answer</button>
            <h3>Score: {score}</h3>
          </div>
      }
    </main>
  )
}

export default Quizpage;