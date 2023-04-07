import React, { useEffect, useState } from "react";
import styles from "./Quizpage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { Quote } from "../../types";

interface QuizProps {
    limit: number
}

const Quizpage = ({limit = 1} : QuizProps) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const loadQuotes = async (limit : number) => {
        let response = await fetch("http://localhost:3000/api/quiz/" + limit);
        let data: Quote[] = await response.json();
        setQuotes(data);
        setLoading(false);
        }
        loadQuotes(limit);
        
    }, [limit])

    let characterArray : string[] = [];
    quotes.map((quote : Quote) => {
        return (
            characterArray.push(quote.character.name),
            characterArray.push(quote.wrongAnswers.character[0].name),
            characterArray.push(quote.wrongAnswers.character[1].name)
        )
    });

    let movieArray : string[] = [];
    quotes.map((quote : Quote) => {
        return (
            movieArray.push(quote.movie.name),
            movieArray.push(quote.wrongAnswers.movie[0].name),
            movieArray.push(quote.wrongAnswers.movie[1].name)
        )
    })

    const shuffleArray = (array : string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    shuffleArray(characterArray);
    shuffleArray(movieArray);

   
    return (
        
        <main className={styles.main}>
            {loading && <LoadingIndicator/>}
            
            {quotes.map((quote: Quote) => {
                return (
                    <div>
                        <h3>1/10</h3>
                        <h3>Quote: {quote.dialog}</h3>
                    </div>
                )
            })}
            <div className={styles.quizForm}>
                <div className={styles.columnLeft}>
                    {characterArray.map((character : string) => {
                        return (
                            <p>{character}</p>
                        )
                    })}
                </div>
                <div className={styles.line}></div>
                <div className={styles.columnRight}>
                    {movieArray.map((movie : string) => {
                        return (
                            <p>{movie}</p>
                        )
                    })}
                </div>
            </div>
            <button className={styles.submitButton}>Submit Answer</button>
        </main>
    )
}
 /*
<div>
                        <h3>1/10</h3>
                        <h3>Quote: Dialog</h3>
                        
                        <div className={styles.quizForm}>
                            <div className={styles.columnLeft}>
                                <p>Character</p>
                                <p>Character</p>
                                <p>Character</p>
                            </div> 
                            <div className={styles.line}></div>
                            <div className={styles.columnRight}>
                                <p>Movie</p>
                                <p>Movie</p>
                                <p>Movie</p>
                            </div>
                        </div>
                    </div>
*/

export default Quizpage;