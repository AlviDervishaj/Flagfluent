// React
import {FC, ReactElement, useState} from "react";

// Helpers 
import {GuessFlagProps} from "./GuessFlagHelpers";

// Components
import { GenerateFlag } from "../GenerateFlag"; 

// Styling
import styles from "./GuessFlag.module.css";

export const GuessFlag: FC<GuessFlagProps> = ({country, changeFlag}): ReactElement => {
  const [userGuess, setUserGuess] = useState<boolean>();
  const [guess, setGuess] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  // check user guess
  const checkUserGuess = (): void => {
    if(guess === country) {
      setUserGuess(true);
      // reset input after guessing correctly
      setGuess("");
      // clear correct answer 
      setCorrectAnswer("");
      // generate a new flag
      changeFlag();
    }
    else {
      // set user guess to false
      setUserGuess(false);
      // display the correct answer
      setCorrectAnswer(country);
    }
  }
  const clearAndGenerateNewFlag = (): void => {
    // clear guess
    setGuess("");
    // clear correct answer
    setCorrectAnswer("")
    // generate flag
    changeFlag();
  }
  return <>
  {correctAnswer && <h2 className={styles.correctAnswer}>{correctAnswer}</h2> }
  <input type="text" name="guess" 
    className={`${styles.guessInput} ${userGuess ? styles.correctGuess : styles.failedGuess}`} 
    placeholder={"Guess the country ..."} 
    value={guess}
    onChange={(event) => setGuess(event.target.value)} 
    onBlur={() => checkUserGuess()}
  />
  <GenerateFlag onClick={clearAndGenerateNewFlag}/>
  </>
}
