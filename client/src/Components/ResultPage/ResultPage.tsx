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
  setShow: (show:boolean) => void,
  activeQuestion: number,
  setActiveQuestion: (activeQuestion:number) => void
}

const ResultPage = ({ show, setShow, activeQuestion, setActiveQuestion, quote }: ResultPageProps) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const [blacklistReason, setBlacklistReason] = useState<string>("");


  const handleSave = () => {
    setShow(false);
    setActiveQuestion(activeQuestion + 1);
  };
  const handleShow = () => setShow(false);

  useEffect(() => {
    saveToFavorites();
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const saveToFavorites = async () => {
    let favorite: Favorite = { quote };
    let userUpdated: User = JSON.parse(JSON.stringify(user));

    if (!user.favorites.some(fav => fav.quote?.id === favorite.quote?.id)) {
      userUpdated.favorites.push(favorite);
      setUser(userUpdated);
      try {
        let response = await fetch("http://localhost:3000/api/users/updatefavorites", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            favorites: userUpdated.favorites
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
  const saveToBlacklist = async () => {
    let blacklistQuote: Blacklist = { quote, reasonForBlacklisting: blacklistReason};
    let userUpdated: User = JSON.parse(JSON.stringify(user));

    if (!user.blacklist.some(blQuote => blQuote.quote?.id === blacklistQuote.quote?.id)) {
      userUpdated.favorites.push(blacklistQuote);
      setUser(userUpdated);
      try {
        let response = await fetch("http://localhost:3000/api/users/updateblacklist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            blacklist: userUpdated.blacklist
          }),
        });

        if (response.status === 200) {
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
        <img className={styles.image} src={frodo} alt="frodo" width="" height=""></img>
        <p>race: {quote.character.race}</p>
        
        <p>Character name</p>
        <img className={styles.image}></img>
        <p>Film name</p>
        <h3>Liked or disliked the quote?</h3>
        <button className={styles.thumbsDown} onClick={() => setDislike(true)}><img src={thumbsUp} alt="thumbsDown" width="40" height="40"></img></button>
        <button className={styles.thumbsUp} onClick={() => setLike(true)}><img src={thumbsUp} alt="thumbsUp" width="40" height="40"></img>
        </button>
        <div className={styles.reason}>
          <p>
            <label htmlFor="bericht"></label>
            <textarea name="bericht" cols={40} rows={5} placeholder="reason ?" required></textarea>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.saveButton} variant="primary" size="lg" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResultPage;