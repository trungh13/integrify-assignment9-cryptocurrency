import React, { Component } from "react";
import styles from "./App.css";

import ComponentHeader from "./ComponentHeader";
import ComponentSearch from "./ComponentSearch";
import ComponentMain from "./ComponentMain";
import ComponentSort from "./ComponentSort";
import ComponentLoading from "./ComponentLoading";

class App extends Component {
  constructor(props) {
    super(props);
    this.searchComponent = React.createRef();
    this.state = {
      data: [],
      filteredData: [],
      query: "",
      displayIcon: "fas fa-2x fa-bars",
      displayType: "displayGrid",
      sortIcons: {
        sortAlphabet: "asc",
        sortRank: "asc",
        sortPrice: "asc"
      },
      ComponentSearchOffsetTop: 0,
      fixedHeader: "",
      counter: 1,
      isFiltering: false,
      totalCoins: 0,
      totalData: []
    };
  }

  componentDidMount = () => {
    this.fetchData();
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      ComponentSearchOffsetTop: this.searchComponent.current.offsetTop
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset >= this.state.ComponentSearchOffsetTop + 50)
      this.setState({ fixedHeader: "fixedHeader" });
    else this.setState({ fixedHeader: "" });
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight + 29 &&
      !this.state.isFiltering
    ) {
      // this.fetchCoinsData(this.state.counter);
      console.log("to bottom");
      this.setState({
        data: this.state.data.concat(
          this.state.totalData.slice(
            this.state.data.length,
            this.state.data.length + 100
          )
        )
      });
    }
    if (this.state.data.length === this.state.totalCoins) {
      this.setState({
        isFiltering: true
      });
      console.log(
        `End of the coin list with total ${this.state.totalCoins} coins`
      );
    } else
      this.setState({
        isFiltering: false
      });
    // console.log("scroll");
  };

  fetchData = () => {
    fetch(
      `https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=${Math.min(
        this.state.counter,
        this.state.totalCoins
      )}`
    )
      .then(res => res.json())
      .then(json => {
        if (this.state.totalCoins === 0) {
          this.setState({
            totalCoins: json.metadata.num_cryptocurrencies
          });
        }
        if (this.state.counter <= this.state.totalCoins) {
          this.setState({
            totalData: this.state.totalData.concat(Object.values(json.data)),
            filteredData: this.state.totalData.concat(Object.values(json.data)),
            counter: this.state.counter + 100
          });
          if (this.state.totalData.length === 100)
            this.setState({
              data: this.state.totalData
            });
          this.fetchData();
        }
      })
      .catch(err => console.log(err));
  };

  displayHandle = () => {
    this.state.displayIcon === "fas fa-2x fa-bars"
      ? this.setState({
          displayIcon: "fas fa-2x fa-th",
          displayType: "displayTable"
        })
      : this.setState({
          displayIcon: "fas fa-2x fa-bars",
          displayType: "displayGrid"
        });
  };

  handleSearch = searchInput => {
    searchInput !== ""
      ? this.setState({
          query: searchInput,
          filteredData: this.state.totalData.filter(el => {
            return (
              el.name.toLowerCase().includes(searchInput.toLowerCase()) ||
              el.symbol.toLowerCase().includes(searchInput.toLowerCase())
            );
          }),
          isFiltering: true
        })
      : this.setState({
          filteredData: this.state.totalData,
          isFiltering: false
        });
  };

  sortNameFunc = asc => {
    const filteredData = [...this.state.data];
    return filteredData.sort(function(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (asc) {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
      }
      return 0;
    });
  };

  sortRankFunc = asc => {
    const filteredData = [...this.state.data];
    return filteredData.sort(function(a, b) {
      return asc ? a.rank - b.rank : b.rank - a.rank;
    });
  };
  sortPriceFunc = asc => {
    const filteredData = [...this.state.data];
    return filteredData.sort(function(a, b) {
      return asc
        ? a.quotes.USD.price - b.quotes.USD.price
        : b.quotes.USD.price - a.quotes.USD.price;
    });
  };
  handleSort = (type,typeSort) => {
    switch (`${type} ${typeSort}`) {
      case "alphabet asc":
        this.setState({
          data: this.sortNameFunc(true),
          sortIcons: {
            ...this.state.sortIcons,
            sortAlphabet: "desc"
          }
        });
        break;
      case "alphabet desc":
        this.setState({
          data: this.sortNameFunc(false),
          sortIcons: {
            ...this.state.sortIcons,
            sortAlphabet: "asc"
          }
        });
        break;
      case "rank asc":
        this.setState({
          data: this.sortRankFunc(true),
          sortIcons: {
            ...this.state.sortIcons,
            sortRank: "desc"
          }
        });
        break;
      case "rank desc":
        this.setState({
          data: this.sortRankFunc(false),
          sortIcons: {
            ...this.state.sortIcons,
            sortRank: "asc"
          }
        });
        break;
      case "price asc":
        this.setState({
          data: this.sortPriceFunc(true),
          sortIcons: {
            ...this.state.sortIcons,
            sortPrice: "desc"
          }
        });
        break;
      case "price desc":
        this.setState({
          data: this.sortPriceFunc(false),
          sortIcons: {
            ...this.state.sortIcons,
            sortPrice: "asc"
          }
        });
        break;
      default:
        break;
    }
  };
  render() {
    const renderData = this.state.isFiltering
      ? this.state.filteredData
      : this.state.data;
    return (
      <div className={styles.Container}>
        <ComponentHeader />
        <ComponentSearch
          className={styles.ComponentSearch}
          handleSearch={this.handleSearch}
          CoinsNumber={this.state.filteredData.length}
          displayClick={this.displayHandle}
          displayIcon={this.state.displayIcon}
          searchComponent={this.searchComponent}
          fixedHeader={this.state.fixedHeader}
          totalData={this.state.totalData}
          totalCoins={this.state.totalCoins}
          data={this.state.data}
        />
        <ComponentMain
          renderData={renderData}
          displayType={this.state.displayType}
          fixedHeader={this.state.fixedHeader}
        />
        <ComponentSort
          sortIcons={this.state.sortIcons}
          handleSort={this.handleSort}
        />
        <ComponentLoading isFiltering={this.state.isFiltering.toString()} />
      </div>
    );
  }
}

export default App;
