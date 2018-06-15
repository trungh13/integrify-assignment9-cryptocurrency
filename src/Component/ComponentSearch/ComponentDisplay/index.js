import React from "react";
import styles from "./index.css";

const ComponentDisplay = props => {
  return (
    <div className={styles.ComponentDisplay}>
      <div className={styles.CoinsNumber}>
        <div className={styles.CoinsNumberDescription}>
        {props.totalData.length < props.totalCoins
          ?"Loading"
          :`Displaying:`}
        </div>
        {props.totalData.length < props.totalCoins 
          ? (<React.Fragment>
            <i className="fas fa-sync-alt" />
            {props.CoinsNumber}/{props.totalCoins}
          </React.Fragment>) 
          :props.data.length < props.totalData.length
            ?(<React.Fragment>{props.data.length}/{props.totalData.length}</React.Fragment>)
            :(<React.Fragment>{props.CoinsNumber}</React.Fragment>)
        }
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
