import React, { useEffect, useState } from "react";
import styles from "./Startpage.module.css";
import Button from 'react-bootstrap/Button';
import { Quote } from "../../types";


const Startpage = () => {
  
  return (
    <div>
      <main>
          <div className={styles.startpage}>
              <h1>Lord of the rings <br></br> Quiz</h1>
              <p className={styles.info}>Welcome to our Lord of the Rings quiz! This quiz will test your knowledge of Middle-earth and its inhabitants. From hobbits to wizards, dwarves to elves, and everything in between, this quiz will challenge even the most ardent fans of J.R.R. Tolkien’s epic fantasy series. So grab your sword and shield, and let’s journey into Middle-earth together!
              <br></br><br></br>
              You will see quotes that can be heard during the films. Link a character and a movie to this quote. You always get the choice of three characters and three movies. Good luck!</p>
              <div className={styles.buttonRow}>
                <Button href="/quiz/theone" className={styles.startButton} variant="primary" size="lg">Start Quiz</Button>
                <Button href="/quiz/suddendeath" className={styles.startButton} variant="primary" size="lg">Sudden Death</Button>
              </div>
          </div>
      </main>
    </div>
  )
}

export default Startpage;