import React, { useEffect, useState } from "react";
import styles from "./Startpage.module.css";
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
      <h1>Lord of the rings Quiz</h1>
      <p>uitleg</p>
      <button></button>
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