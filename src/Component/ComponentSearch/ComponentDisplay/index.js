import React from "react";
import styles from "./index.css";

const ComponentDisplay = props => {
  return (
    <div className={styles.ComponentDisplay}>
      <div className={styles.CoinsNumber}>
        <div className={styles.CoinsNumberDescription}>Total coins : </div>
        {props.totalData.length < props.totalCoins 
        ? (<React.Fragment>
            <i className="fas fa-sync-alt" />
            {props.CoinsNumber}/{props.totalCoins}
          </React.Fragment>) 
        : (<React.Fragment>{props.CoinsNumber}</React.Fragment>)}
      </div>
      <i
        className={props.displayIcon}
        id={styles.displayIcon}
        onClick={props.click}
      />
    </div>
  );
};
export default ComponentDisplay;
