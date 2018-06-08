import React, { Component } from 'react';
import styles from './App.css';

import ComponentSearch from './ComponentSearch'
import ComponentMain from './ComponentMain'
class App extends Component {
  render() {
    return (
      <div className={styles.Container}>
      <ComponentSearch/>
      <ComponentMain/>
      </div>
    );
  }
}

export default App;
