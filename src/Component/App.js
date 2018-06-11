import React, { Component } from "react";
import styles from "./App.css";

import ComponentHeader from "./ComponentHeader";
import ComponentSearch from "./ComponentSearch";
import ComponentMain from "./ComponentMain";
import ComponentSort from "./ComponentSort";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: "",
      displayIcon: "fas fa-2x fa-bars",
      filteredData: [],
      displayType: "displayGrid",
      sortIcons: {
        sortAlphabet: "fas fa-sort-alpha-up fa-2x",
        sortRank: "fas fa-sort-numeric-up fa-2x",
        sortPrice: "fas fa-sort-amount-up fa-2x"
      }
    };
  }
  componentDidMount = () => {
    this.fetchCoinsData();
    this.delay = setInterval(() => {
      console.log("Updated data");
      this.fetchCoinsData();
    }, 1000 * 60);
  };

  fetchCoinsData = () => {
    const url = "https://api.coinmarketcap.com/v2/ticker/?convert=BTC";
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: [Object.values(json.data)][0] });
      })
      .catch(err => console.log(err));
  };

  displayHandle = () => {
    this.state.displayIcon === "fas fa-2x fa-bars"
      ? this.setState({
          displayIcon: "fas fa-2x fa-th",
          displayType: "displayGrid"
        })
      : this.setState({
          displayIcon: "fas fa-2x fa-bars",
          displayType: "displayTable"
        });
  };

  handleSearch = searchInput => {
    this.setState({
      query: searchInput,
      filteredData: this.state.data.filter(el => {
        return (
          el.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          el.symbol.toLowerCase().includes(searchInput.toLowerCase())
        );
      })
    });
  };
  sortNameFunc=()=> {
    return this.state.data.sort(function(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  sortRankFunc=()=> {
    return this.state.data.sort(function(a, b) {
      return a.rank - b.rank;
    });
  }
  sortPriceFunc=()=> {
    return this.state.data.sort(function(a, b) {
      return a.quotes.USD.price - b.quotes.USD.price;
    });
  }
  handleSort = type => {
    switch (type) {
      case "fas fa-sort-alpha-up fa-2x":
        this.setState({
          filteredData:this.sortNameFunc(),
          sortIcons: {
            ...this.state.sortIcons,
            sortAlphabet: "fas fa-sort-alpha-down fa-2x"
          }
        });
        break;
      case "fas fa-sort-alpha-down fa-2x":
        this.setState({
          filteredData:this.sortNameFunc().reverse(),
          sortIcons: {
            ...this.state.sortIcons,
            sortAlphabet: "fas fa-sort-alpha-up fa-2x"
          }
        });
        break;
      case "fas fa-sort-numeric-up fa-2x":
        this.setState({
          filteredData:this.sortRankFunc(),
          sortIcons: {
            ...this.state.sortIcons,
            sortRank: "fas fa-sort-numeric-down fa-2x"
          }
        });
        break;
      case "fas fa-sort-numeric-down fa-2x":
        this.setState({
          filteredData:this.sortRankFunc().reverse(),
          sortIcons: {
            ...this.state.sortIcons,
            sortRank: "fas fa-sort-numeric-up fa-2x"
          }
        });
        break;
      case "fas fa-sort-amount-up fa-2x":
        this.setState({
          filteredData:this.sortPriceFunc(),
          sortIcons: {
            ...this.state.sortIcons,
            sortPrice: "fas fa-sort-amount-down fa-2x"
          }
        });
        break;
      case "fas fa-sort-amount-down fa-2x":
        this.setState({
          filteredData:this.sortPriceFunc().reverse(),
          sortIcons: {
            ...this.state.sortIcons,
            sortPrice: "fas fa-sort-amount-up fa-2x"
          }
        });
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <div className={styles.Container}>
        <ComponentHeader />
        <ComponentSearch
          handleSearch={this.handleSearch}
          CoinsNumber={this.state.filteredData.length || this.state.data.length}
          displayClick={this.displayHandle}
          displayIcon={this.state.displayIcon}
        />
        <ComponentMain
          data={this.state.data}
          query={this.state.query}
          displayType={this.state.displayType}
          filteredData={this.state.filteredData}
        />
        <ComponentSort
          sortIcons={this.state.sortIcons}
          handleSort={this.handleSort}
        />
      </div>
    );
  }
}

export default App;
