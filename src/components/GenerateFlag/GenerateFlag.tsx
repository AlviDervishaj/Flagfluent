// React
import { ReactElement } from "react"

// Helpers
import { GenerateFlagProps } from "./GenerateFlagHelpers"

// Styling
import styles from "./GenerateFlag.module.css";

export const GenerateFlag = ({onClick}: GenerateFlagProps): ReactElement => {
  return <button className={styles.generateFlagButton} onClick={() => onClick()}>Generate new flag</button> 
}

