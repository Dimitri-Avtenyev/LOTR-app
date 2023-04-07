import styles from "./ResultPage.module.css";
import thumbsUp from "./assets/thumbs-down.svg";
import thumbsDown from "./assets/thumbs-up.svg";
import frodo from "./assets/frodo.webp";
import Button from 'react-bootstrap/Button';

const ResultPage = () => {
    return(
        <main>
            <div>
                <h1>Right/Wrong answer</h1>
                <div className={styles.answer}>
                    <p>answer:</p>
                    <h4>"Een mega coole quote"</h4>
                    <p>race: Hobbit</p>
                    <img className={styles.image}src={frodo}alt="frodo"width="" height=""></img>
                    <p>Character name</p>
                    <img className={styles.image}></img>
                    <p>Film name</p>
                </div>
                <div className={styles.likeOrDislike}>
                    <p>Liked or disliked the quote?</p>
                    <button className={styles.thumb}><img src={thumbsUp} alt="thumbsUp"width="40" height="40"></img></button>
                    <button className={styles.thumbsUp}><img src={thumbsUp}alt="thumbsDown"width="40" height="40"></img></button>
                    <div className ={styles.reason}>
                    <p>
                        <label htmlFor="bericht"></label>
                        <textarea name="bericht"  cols={40} rows={5} required>Schrijf hier uw bericht</textarea>
                    </p> 
                    <Button href="" className={styles.saveButton} variant="primary" size="lg">Save</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResultPage;