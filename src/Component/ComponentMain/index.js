import React from "react";
import styles from "./index.css";

import Ticker from "./Ticker";

const ComponentMain = props => {
  const renderList = data =>
    data.map((element, index) => <Ticker data={element} key={index} displayType={props.displayType}/>);

  return (
    <div
      className={[styles.ComponentMain, styles[props.displayType]].join(" ")}
    >
      {props.query ? renderList(props.filteredData) : renderList(props.data)}
    </div>
  );
};

export default ComponentMain;
