import React, { Component } from "react";
import styles from "./index.css";

import Ticker from "./Ticker";

export class ComponentMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: [],
      displayType: "displayGrid"
    };
  }

  componentDidMount = () => {
    this.fetchCoinsData();
    this.delay = setInterval(() => {
      console.log("Updated data");
      this.fetchCoinsData();
    }, 1000 * 60);
  };

  fetchCoinsData() {
    const url = "https://api.coinmarketcap.com/v2/ticker/?convert=BTC";
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ myData: [Object.values(json.data)][0] });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div
        className={[styles.ComponentMain, styles[this.state.displayType]].join(
          " "
        )}
      >
        {this.state.myData.map((element, index) => (
          <Ticker data={element} key={index} />
        ))}
      </div>
    );
  }
}

export default ComponentMain;
