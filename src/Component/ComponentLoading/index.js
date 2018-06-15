import React from "react";
import styles from './index.css'
import PropTypes from 'prop-types'
const ComponentLoading = (props) =>{ 
  return(
  <div className={[styles.ComponentLoading,styles[props.isFiltering]].join(" ")}>
    <div className={styles.ComponentLoadingLine}/>
    <div className={styles.ComponentLoadingLine}/>
    <div className={styles.ComponentLoadingLine}/>
  </div>
);}

ComponentLoading.propTypes={isFiltering: PropTypes.string.isRequired}
export default ComponentLoading;
