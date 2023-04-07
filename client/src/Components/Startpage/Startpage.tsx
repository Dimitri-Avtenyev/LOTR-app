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
              <p>Beetje uitleg over de quiz</p>
              <Button href="/quiz/theone" className={styles.startButton} variant="primary" size="lg">Start Quiz</Button>
          </div>
      </main>
    </div>
  )
}

export default Startpage;