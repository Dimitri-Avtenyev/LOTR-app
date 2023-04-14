import styles from "./ResultPage.module.css";
import thumbsUp from "./assets/thumbs-down.svg";
import thumbsDown from "./assets/thumbs-up.svg";
import frodo from "./assets/frodo.webp";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Blacklist, Favorite, Quote, User } from "../../types";
import { Modal } from "react-bootstrap";

interface ResultPageProps {
  quote: Quote,
  show: boolean,
  setShow: (show: boolean) => void,
  activeQuestion: number,
  setActiveQuestion: (activeQuestion: number) => void,
  selectedCharacterIndex: number,
  setSelectedCharacterIndex: (index: number) => void,
  selectedMovieIndex: number,
  setSelectedMovieIndex: (index: number) => void
}

const ResultPage = ({ show, setShow, activeQuestion, setActiveQuestion, quote, selectedCharacterIndex, setSelectedCharacterIndex, selectedMovieIndex, setSelectedMovieIndex }: ResultPageProps) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const [blacklistReason, setBlacklistReason] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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

  const saveToFavorites = async () => {
    let favorite: Favorite = { quote };
    let userUpdated: User = JSON.parse(JSON.stringify(user));

    if (!user.favorites.some(fav => fav.quote?.id === favorite.quote?.id)) {
      userUpdated.favorites.push(favorite);

      try {
        let response = await fetch("http://localhost:3000/api/users/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            favorites: userUpdated.favorites
          }),
        });

        if (response.status === 200) {
          setUser(userUpdated);
          setMessage("Successfuly added to favorites!");
          setErrorMessage("");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage("Already added to favorites!");
      setMessage("");
    }
  }
  const saveToBlacklist = async () => {
    let blacklistQuote: Blacklist = { quote, reasonForBlacklisting: blacklistReason };
    let userUpdated: User = JSON.parse(JSON.stringify(user));

    if (!user.blacklist.some(blQuote => blQuote.quote?.id === blacklistQuote.quote?.id)) {
      userUpdated.blacklist.push(blacklistQuote);

      try {
        let response = await fetch("http://localhost:3000/api/users/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            blacklist: userUpdated.blacklist
          })
        });

        if (response.status === 200) {
          setUser(userUpdated);
          setMessage("Successfuly added to blacklist!");
          setErrorMessage("");
        }
      } catch (err) {

      }
    } else {
      setErrorMessage("Already added to blacklist!");
      setMessage("");
    }
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered={true}
    >
      <Modal.Header>
        <Modal.Title><q>{quote.dialog}</q></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{errorMessage || message}</div>
        <div className={styles.resultForm}>
          <img className={styles.image} src={frodo} alt="frodo" width="" height=""></img>
          <p>Race: {quote.character.race}</p>

          <p>Character Name: {quote.character.name}</p>
          <img className={styles.image}></img>
          <p>Movie Name: {quote.movie.name}</p>
          <h3>Liked or disliked the quote?</h3>
          <button className={dislike ? styles.thumbsUpClicked : styles.thumbsDown}
            onClick={() => setDislike(true)}
            disabled={like}
          >
            <img src={thumbsUp} alt="thumbsDown" width="40" height="40"></img>
          </button>
          <button className={like ? styles.thumbsDownClicked : styles.thumbsUp}
            onClick={() => setLike(true)}
            disabled={dislike}
          >
            <img src={thumbsUp} alt="thumbsUp" width="40" height="40"></img>
          </button>
          <div className={styles.reason}>
            <p>
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
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.saveButton} variant="primary" size="lg" onClick={handleSave} disabled={!like && !dislike}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResultPage;