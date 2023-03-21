import styles from "./ResultPage.module.css";
import thumbsUp from "./assets/thumbs-down.svg";
import thumbsDown from "./assets/thumbs-up.svg";

const ResultPage = () => {
    return(
        <main>
            <div>
                <h1>Right/Wrong answer</h1>
                <div className={styles.answer}>
                    <p>answer:</p>
                    <h2>quote</h2>
                    <img></img>
                    <img></img>
                </div>
                <div className={styles.likeOrDislike}>
                    <p>Liked or disliked the quote?</p>
                    <button><img src={thumbsUp} alt="thumbsUp"width="40" height="40"></img></button>
                    <button><img src={thumbsDown}alt="thumbsDown"width="40" height="40"></img></button>
                    <button>Save</button>
                </div>
            </div>
        </main>
    )
}

export default ResultPage;