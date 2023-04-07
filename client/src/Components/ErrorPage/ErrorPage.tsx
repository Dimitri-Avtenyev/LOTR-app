import foto from "./youShallNotPassKlein.png"
import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <main>
            <div className={styles.container}>
                <img src="/youShallNotPassKlein.png"></img>
                <p>Error 404: this page does not exist.</p>
                <Link to="/"> Back to home</Link>
            </div>
        </main>
    )
}

export default ErrorPage;