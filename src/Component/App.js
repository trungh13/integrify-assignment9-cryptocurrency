import React, { Component } from "react";
import styles from "./App.css";

import ComponentHeader from './ComponentHeader'
import ComponentSearch from "./ComponentSearch";
import ComponentMain from "./ComponentMain";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: ""
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
        this.setState({ data: [Object.values(json.data)][0] });
      })
      .catch(err => console.log(err));
  }

  onUpdateData = updatedData => {
    this.setState({
      query: updatedData
    });
  };
  componentDidUpdate() {
  }
  render() {
    return (
      <div className={styles.Container}>
        <ComponentHeader/>
        <ComponentSearch onUpdate={this.onUpdateData} />
        <ComponentMain data={this.state.data} query={this.state.query}/>
      </div>
    );
  }
}

export default App;
