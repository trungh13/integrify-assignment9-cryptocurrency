import React from "react";
import styles from "./index.css";
const Ticker = props => {
  const { id, name, symbol, rank } = this.props.data;

  return (
    <div className={styles.Ticker}>
      <div className={styles.TickerHeader}>
        <div className={styles.TickerHeaderName}>
          <img className={styles.TickerHeaderNameIcon} />>
          <a className={styles.TickerHeaderNameSymbol}>{symbol}</a>
          <p className={styles.TickerHeaderNameName}>({name})</p>
        </div>
        <div className={styles.TickerHeaderRank}>{rank}</div>
      </div>
      <div className={styles.TickerContent} />
    </div>
  );
};

export default Ticker;
