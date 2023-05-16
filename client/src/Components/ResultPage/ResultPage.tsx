import styles from "./ResultPage.module.css";
import thumbsUp from "./assets/thumbs-up.svg";
import thumbsDown from "./assets/thumbs-down.svg"
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from "react";
import { Blacklist, Favorite, Quote, User } from "../../types";
import { Modal } from "react-bootstrap";
import Movie from "../Movie/Movie";
import { updateUserData } from "../../utils/fetchHandlers";

interface ResultPageProps {
  quote: Quote,
  show: boolean,
  setShow: (show: boolean) => void,
  activeQuestion: number,
  setActiveQuestion: (activeQuestion: number) => void,
  selectedCharacterIndex: number,
  setSelectedCharacterIndex: (index: number) => void,
  selectedMovieIndex: number,
  setSelectedMovieIndex: (index: number) => void,
  selectedCharacter: boolean,
  setSelectedCharacter: (selectedCharacter: boolean) => void,
  selectedMovie: boolean,
  setSelectedMovie: (selectedMovie: boolean) => void
}

const ResultPage = ({ show, setShow, activeQuestion, setActiveQuestion, quote, selectedCharacterIndex, setSelectedCharacterIndex, selectedMovieIndex, setSelectedMovieIndex, selectedCharacter, setSelectedCharacter, selectedMovie, setSelectedMovie }: ResultPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("none");
  const [blacklistReason, setBlacklistReason] = useState<string>("");

  const handleSave =  () => {

    if (like) {
      saveToFavorites();
    } else if (dislike) {
      saveToBlacklist();
    }
    setShow(false);
    setActiveQuestion(activeQuestion + 1);
    setSelectedCharacterIndex(-1);
    setSelectedMovieIndex(-1);

  };

  const handleClose = () => {
    setShow(false);
    setActiveQuestion(activeQuestion + 1);
    setSelectedCharacterIndex(-1);
    setSelectedMovieIndex(-1);
  }

  const saveToFavorites = async () => {
    let favorite: Favorite = { quote };
    let body:BodyInit = JSON.stringify({typeitem: favorite});
    await updateUserData(`${process.env.REACT_APP_API_URL}api/users/user/favorites/${favorite.quote.id}`, body);
    } 
  const saveToBlacklist = async () => {
    let blacklistQuote: Blacklist = { quote, reasonForBlacklisting: blacklistReason };
    let body:BodyInit = JSON.stringify({typeitem: blacklistQuote});
    await updateUserData(`${process.env.REACT_APP_API_URL}api/users/user/blacklist/${blacklistQuote.quote.id}`, body);
  }

  const checkAnswer = () => {
    if (selectedCharacter === true && selectedMovie === true) {
      return (
        <Modal.Title className={styles.correctAnswer}>Both answers are correct!</Modal.Title>
      )
    } else if(selectedCharacter === true && selectedMovie === false) {
      return (
        <Modal.Title className={styles.oneCorrectAnswer}>You only answered the character correctly!</Modal.Title>
      )
    } else if(selectedCharacter === false && selectedMovie === true){
      return (
        <Modal.Title className={styles.oneCorrectAnswer}>You only answered the movie correctly!</Modal.Title>
      )
    } else {
      return (
        <Modal.Title className={styles.incorrectAnswer}>Both answers are incorrect ...</Modal.Title>
      )
    }
  }

  const handleLikeClick = () => {
    setActiveButton("like");
    setLike(true);
    setDislike(false);
  }

  const handleDislikeClick = () => {
    setActiveButton("dislike");
    setDislike(true);
    setLike(false);
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered={true}
    >
      <Modal.Header className={styles.resultPageHeader}>
        {checkAnswer()}
        <Modal.Title><q>{quote.dialog}</q></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{errorMessage || message}</div>
        <div className={styles.resultForm}>
          <Movie movie={quote.movie}/>
          <p>Character: <b>{quote.character.name}</b></p>
          <h3>What do you think of the quote?</h3>
          <div className={styles.thumbButtons}>
            <button style={{backgroundColor : like ? "rgb(27, 50, 27)" : ""}}
              onClick={handleLikeClick}
            >
              <img className={styles.thumbsUp} src={thumbsUp} alt="thumbsUp" width="40" height="40"></img>
            </button>
            <button style={{backgroundColor : dislike ? "rgb(27, 50, 27)" : ""}}
              onClick={handleDislikeClick}
            >
              <img className={styles.thumbsDown} src={thumbsDown} alt="thumbsDown" width="40" height="40"></img>
            </button>
          </div>
          <div className={styles.reason}>
              <label htmlFor="message"></label>
              {dislike &&
                <textarea
                  name="message" cols={40} rows={5}
                  placeholder="Why did you dislike this quote?"
                  required
                  value={blacklistReason}
                  onChange={(e) => { setBlacklistReason(e.target.value) }}
                >
                </textarea>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
          <div>
            <Button className={styles.footerButtons} variant="primary" size="lg" onClick={handleSave} disabled={!like && !dislike}>Save</Button> 
            <Button className={styles.footerButtons} variant="primary" size="lg" onClick={handleClose}>Close</Button>
          </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ResultPage;