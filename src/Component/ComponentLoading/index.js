import React from "react";
import styles from './index.css'

const ComponentLoading = (props) => (
  <div className={[styles.ComponentLoading,styles[props.isFiltering]].join(" ")}>
    <div className={styles.ComponentLoadingLine}/>
    <div className={styles.ComponentLoadingLine}/>
    <div className={styles.ComponentLoadingLine}/>
  </div>
);
export default ComponentLoading;
