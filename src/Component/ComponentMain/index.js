import React, { Component } from "react";
export class ComponentMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: []
    };
  }

  componentDidMount = () => {
    this.fetchCoinsData();
    this.delay=setTimeout(() => {
        console.log(this.state.myData)
    }, 1000);
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
    return <div />;
  }
}

export default ComponentMain;
