import React, { Component } from "react";
import styles from "./index.css";
export class ComponentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  update = e => {
    // console.log(e.target.value);
    this.props.onUpdate(e.target.value);
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <div className={styles.ComponentSearch}>
        <input
          className={styles.searchInput}
          type="text"
          onChange={this.update}
          placeholder="Type the name of coin you want to search"
        />
      </div>
    );
  }
}

export default ComponentSearch;
