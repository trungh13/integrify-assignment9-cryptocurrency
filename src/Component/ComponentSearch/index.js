import React from "react";
import styles from "./index.css";

import ComponentDisplay from "./ComponentDisplay";
const ComponentSearch = props => (
  <div
    className={[styles.ComponentSearch,styles[props.fixedHeader]].join(" ")}
    ref={props.searchComponent}
  >
    <input
      className={styles.searchInput}
      type="text"
      onChange={e => props.handleSearch(e.target.value)}
      placeholder="Search by name/symbol of coins"
    />
    <ComponentDisplay
      click={props.displayClick}
      CoinsNumber={props.CoinsNumber}
      displayIcon={props.displayIcon}
    />
  </div>
);

export default ComponentSearch;
