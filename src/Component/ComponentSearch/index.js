import React, { Component } from "react";
import styles from "./index.css";
export class ComponentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: ""
    };
  }
  componentDidUpdate(){
    
  }
  handleInput = function(e) {
    this.setState({ inputSearch: e.target.value });
    console.log("current inputSearch:", e.target.value);
    console.log("this state inputSearch:", this.state.inputSearch);
  };

  render() {
    return (
      <div className={styles.ComponentSearch}>
        <input
          className={styles.searchInput}
          type="text"
          onChange={e => this.handleInput(e)}
        />
      </div>
    );
  }
}

export default ComponentSearch;
