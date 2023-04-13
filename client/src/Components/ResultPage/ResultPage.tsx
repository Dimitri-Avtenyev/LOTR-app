import styles from "./ResultPage.module.css";
import thumbsUp from "./assets/thumbs-down.svg";
import thumbsDown from "./assets/thumbs-up.svg";
import frodo from "./assets/frodo.webp";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Favorite, Quote, User } from "../../types";
import { Modal } from "react-bootstrap";

interface ResultPageProps {
  quote: Quote,
}

const ResultPage = ({ quote }: ResultPageProps) => {
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

export default ResultPage;