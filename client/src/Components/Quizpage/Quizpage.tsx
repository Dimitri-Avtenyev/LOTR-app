import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import frodo from "./assets/frodo.webp";
import thumbsUp from "./assets/thumbs-down.svg";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../Context/UserContext";
import { Favorite, Quote, User } from "../../types";
import { StringDecoder } from "string_decoder";

const ResultPage = ({ quote }: { quote: Quote }) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const saveToFavorites = async () => {
    let favorite: Favorite = { quote };
    let userUpdated:User = JSON.parse(JSON.stringify(user));
   
    if (!user.favorites.some(fav => fav.quote?.id === favorite.quote?.id)) {
      userUpdated.favorites.push(favorite);
      setUser(userUpdated);
      try {
        let response = await fetch("http://localhost:3000/api/users/updatefavorites", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            favorites: user.favorites
          }),
        });

        if (response.status === 200) {
          setMessage("Successfuly added to favorites!");
          setErrorMessage("");
        }
      } catch (err) {

      }
    } else {
      setErrorMessage("Already added to favorites!");
      setMessage("");
    }

  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered={true}
    >
      <Modal.Header>
        <Modal.Title>{quote.dialog}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{errorMessage || message}</div>
        <p>race: Hobbit</p>
        <img className={styles.image} src={frodo} alt="frodo" width="" height=""></img>
        <p>Character name</p>
        <img className={styles.image}></img>
        <p>Film name</p>
        <h3>Liked or disliked the quote?</h3>
        <button className={styles.thumb}><img src={thumbsUp} alt="thumbsUp" width="40" height="40"></img></button>
        <button className={styles.thumbsUp} onClick={saveToFavorites}><img src={thumbsUp} alt="thumbsDown" width="40" height="40"></img>
        </button>
        <div className={styles.reason}>
          <p>
            <label htmlFor="bericht"></label>
            <textarea name="bericht" cols={40} rows={5} placeholder="reason ?" required></textarea>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.saveButton} variant="primary" size="lg" onClick={handleClose}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

const Quizpage = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
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

  let movieArray = [quotes[activeQuestion]?.movie.name, quotes[activeQuestion]?.wrongAnswers.movie[0].name, quotes[activeQuestion]?.wrongAnswers.movie[1].name]

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
    setActiveQuestion((prev) => prev + 1)
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
      {show && <ResultPage quote={quotes[activeQuestion]} />}
      {loading && <LoadingIndicator />}
      <div>
        <h3>{activeQuestion + 1}/10</h3>
        <h3>Quote: {quotes[activeQuestion]?.dialog}</h3>
      </div>

      <div className={styles.quizForm}>
        <div className={styles.columnLeft}>
          {characterArray.map((character: string) => {
            return (
              <p>{character}</p>
            )
          })}
        </div>
        <div className={styles.line}></div>
        <div className={styles.columnRight}>
          {movieArray.map((movie: string) => {
            return (
              <p>{movie}</p>
            )
          })}
        </div>
      </div>
      <button className={styles.submitButton} onClick={submitAnswerHandler}>Submit Answer</button>
    </main>
  )
}

export default Quizpage;