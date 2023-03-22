import React, { useEffect, useState } from "react";
import styles from "./Startpage.module.css";
import Button from 'react-bootstrap/Button';
import { Quote } from "../types";


const Startpage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const loadQuotes = async () => {
      let response = await fetch("http://localhost:3000/api/quotes");
      let data: Quote[] = await response.json();
      setQuotes(data);
    }
    loadQuotes();
  }, [])

  return (
    <div>
      <main>
          <div className={styles.startpage}>
              <h1>Lord of the rings <br></br> Quiz</h1>
              <p>Beetje uitleg over de quiz</p>
              <Button href="/quizpage/theone" className={styles.startButton} variant="primary" size="lg">Start Quiz</Button>
          </div>
      </main>
      {quotes.map((quote:Quote) => { // test 10 random quotes
        return (
          <p key={quote.id}>
            {quote.dialog}
          </p>
        )
      })}
    </div>
  )
}

export default Startpage;