// React Stuff
import {useState, useEffect, ReactElement, FC} from "react";

// Axios
import axios, {AxiosResponse} from "axios";

// Components
import { Flag } from "../Flag/Flag";
import { GenerateFlag } from "../GenerateFlag";
// Helpers
import { getRandomNumberProps } from "./FlagsHelper";

// Styles
import styles from "./Flags.module.css";

export const Flags: FC = (): ReactElement => {
  const [flagsCodes, setFlagsCodes] = useState<Array<string>>([]);
  const [flag, setFlag] = useState<string>("");
  // Get all the available flags codes in api
  useEffect(() => {
    // get flags codes when component is mounting
    axios.get('https://flagcdn.com/en/codes.json').then((response: AxiosResponse) => {
      // get keys of object that is returned
      let entries = [];
      for (let value of Object.keys(response.data)){
        entries.push(value);
      }
      // copy entries array to flagsCodes
      setFlagsCodes(entries);
      // set flag
      const randomNumber = Math.floor(Math.random() * entries.length + 1);
      setFlag(`https://flagcdn.com/${entries[randomNumber]}.svg`); 
    })
  }, [])

   // get a random number from 0 to length
  const getRandomNumber = (props: getRandomNumberProps): number => {
    return Math.floor(Math.random() * (props.length + 1));
  }
  const getRandomCode = () => {
    const randomNumber = getRandomNumber({length: flagsCodes.length});
    const flagImageUrl = `https://flagcdn.com/${flagsCodes[randomNumber]}.svg`;
    setFlag(flagImageUrl);
  }

  return <div className={styles.flagsContainer}>
    <Flag flag={flag} />
    <GenerateFlag onClick={getRandomCode}/>
  </div>
}

