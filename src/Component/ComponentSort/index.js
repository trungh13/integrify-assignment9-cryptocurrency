import React from "react";
import styles from "./index.css";

const ComponentSort = props => {
  let alphabetIcon, rankIcon, priceIcon;
  props.sortIcons.sortAlphabet === "asc"
    ? (alphabetIcon = "fas fa-sort-alpha-up fa-2x")
    : (alphabetIcon = "fas fa-sort-alpha-down fa-2x");
  props.sortIcons.sortRank === "asc"
    ? (rankIcon = "fas fa-sort-numeric-up fa-2x")
    : (rankIcon = "fas fa-sort-numeric-down fa-2x");
  props.sortIcons.sortPrice === "asc"
    ? (priceIcon = "fas fa-sort-amount-up fa-2x")
    : (priceIcon = "fas fa-sort-amount-down fa-2x");

  return (
    <div className={styles.sortDiv}>
      <div className={styles.sortButtonDiv} id="sort-alphabet">
        <i
          className={alphabetIcon}
          onClick={() => props.handleSort("alphabet",props.sortIcons.sortAlphabet)}
        />
      </div>
      <div className={styles.sortButtonDiv} id="sort-rank">
        <i
          className={rankIcon}
          onClick={() => props.handleSort("rank",props.sortIcons.sortRank)}
        />
      </div>
      <div className={styles.sortButtonDiv} id="sort-price">
        <i
          className={priceIcon}
          onClick={() => props.handleSort("price",props.sortIcons.sortPrice)}
        />
      </div>
    </div>
  );
};
export default ComponentSort;
