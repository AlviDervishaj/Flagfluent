// React
import {useEffect, useState} from "react";

// Styles
import styles from "./Flag.module.css"

// Helpers
import {FlagProps} from "./FlagHelpers";
export const Flag = (props: FlagProps) => {
  const [flagURL, setFlagURL] = useState<string>("");
  useEffect(() => {
    if(!props.flag) return;
    else setFlagURL(props.flag);
  }, [props.flag])
  return (
    <img src={flagURL} alt="Flag" className={styles.flag} />
  )
}
