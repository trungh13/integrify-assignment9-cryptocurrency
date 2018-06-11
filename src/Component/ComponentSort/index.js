import React from "react";
import styles from './index.css'
const ComponentSort = props => (
  <div className={styles.sortDiv}>
    <div className={styles.sortButtonDiv} id="sort-alphabet">
      <i
        className={props.sortIcons.sortAlphabet}
        onClick={() => props.handleSort(props.sortIcons.sortAlphabet)}
      />
    </div>
    <div className={styles.sortButtonDiv} id="sort-rank">
      <i
        className={props.sortIcons.sortRank}
        onClick={() => props.handleSort(props.sortIcons.sortRank)}
      />
    </div>
    <div className={styles.sortButtonDiv} id="sort-price">
      <i
        className={props.sortIcons.sortPrice}
        onClick={() => props.handleSort(props.sortIcons.sortPrice)}
      />
    </div>
  </div>
);
export default ComponentSort;
