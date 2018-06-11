import React, { Component } from "react";
import styles from "./index.css";

import Ticker from "./Ticker";

export class ComponentMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      query: this.props.query,
      displayType: "displayGrid"
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.query !== state.query) { 
        return {
        query: props.query,
        filteredData:props.data.filter(el => {
            return (
              el.name.toLowerCase().includes(props.query.toLowerCase()) ||
              el.symbol.toLowerCase().includes(props.query.toLowerCase())
            );
          })
      };
    }
    return null;
  }

  render() {
    const renderList=(data) => data.map((element, index) => (
        <Ticker data={element} key={index} />
      ));
    console.log(this.state.query);
    return (
      <div
        className={[styles.ComponentMain, styles[this.state.displayType]].join(" ")}>
        {this.state.query?renderList(this.state.filteredData):renderList(this.props.data)}
      </div>
    );
  }
}

export default ComponentMain;
