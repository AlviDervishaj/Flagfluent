// React Stuff
import {useState, useEffect, ReactElement, FC} from "react";

// Axios
import axios, {AxiosResponse} from "axios";

// Components
import { Flag } from "../Flag/Flag";
import { GuessFlag } from "../GuessFlag";

// Helpers
import { getRandomNumberProps } from "./FlagsHelper";

// Styles
import styles from "./Flags.module.css";

export const Flags: FC = (): ReactElement => {
  const [flagsCodes, setFlagsCodes] = useState<Array<string>>([]);
  const [allFlags, setAllFlags] = useState<any>({});
  const [flag, setFlag] = useState<Array<string>>([]);
  // Get all the available flags codes in api
  // assign a random county code to flag variable
  useEffect(() => {
    // get flags codes when component is mounting
    axios.get('https://flagcdn.com/en/codes.json').then((response: AxiosResponse) => {
      // assign body of response (which is an object)
      // to allFlags variable
      setAllFlags(response.data);
      // get keys of object that is returned
      let entries = [];
      for (let value of Object.keys(response.data)){
        entries.push(value);
      }
      // copy entries array to flagsCodes
      setFlagsCodes(entries);
      // set flag
      const randomNumber = Math.floor(Math.random() * entries.length + 1);
      const randomCountryFlag = entries[randomNumber];
      const randomCountryName = response.data[randomCountryFlag];
      setFlag([`https://flagcdn.com/${randomCountryFlag}.svg`, randomCountryName]); 
    })
  }, [])

   // get a random number from 0 to length
  const getRandomNumber = (props: getRandomNumberProps): number => {
    return Math.floor(Math.random() * (props.length + 1));
  }
  const getRandomCode = () => {
    const randomNumber = getRandomNumber({length: flagsCodes.length});
    const randomCountryCode = flagsCodes[randomNumber];
    const flagImageUrl = `https://flagcdn.com/${randomCountryCode}.svg`;
    setFlag([flagImageUrl, allFlags[randomCountryCode]]);
  }


  return <div className={styles.flagsContainer}>
    <Flag flag={flag[0]} />
    <GuessFlag country={flag[1]} changeFlag={getRandomCode}/>
  </div>
}

