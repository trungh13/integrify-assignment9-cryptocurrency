import React from "react";
import styles from "./index.css";

const ComponentDisplay = props => (
  <div className={styles.ComponentDisplay}>
    <div className={styles.CoinsNumber}>
      <div className={styles.CoinsNumberDescription}>Total coins : </div>
      {props.CoinsNumber}
    </div>
    <i className={props.displayIcon} id={styles.displayIcon} onClick={props.click} />
  </div>
);
export default ComponentDisplay;
