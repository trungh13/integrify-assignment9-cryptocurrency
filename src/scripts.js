const url = "https://api.coinmarketcap.com/v2/ticker/?limit=2000&convert=BTC";
const iconSrc = "https://s2.coinmarketcap.com/static/img/coins/16x16/";
let myData;
let newData;
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    myData = [Object.values(myJson.data)][0];
    newData = myData;
    renderList(myData);
  });

let searchData = [];
let sortType = "";
let typeSort = "";
const crytoList = document.getElementById("cryto-list");
const searchPanel = document.getElementById("search-panel");
const sortName = document.getElementById("sort-alphabet");
const sortRank = document.getElementById("sort-rank");
const sortPrice = document.getElementById("sort-price");
const sortButton = document.querySelectorAll("i");

const render = item => {
  const itemNode = document.createElement("div");
  itemNode.className = "item";
  itemNode.id = item.symbol;

  const itemHeader = document.createElement("div");
  itemHeader.className = "item-header";
  const itemHeaderIcon = document.createElement("img");
  itemHeaderIcon.className = "item-header-icon";
  itemHeaderIcon.src = `${iconSrc}${item.id}.png`;
  const itemHeaderSymbol = document.createElement("a");
  itemHeaderSymbol.className = "item-header-symbol";
  itemHeaderSymbol.href = `https://coinmarketcap.com/currencies/${item.name}`;
  itemHeaderSymbol.setAttribute("target", "_blank");
  itemHeaderSymbol.innerHTML = item.symbol;
  const itemHeaderName = document.createElement("div");
  itemHeaderName.className = "item-header-name";
  itemHeaderName.appendChild(itemHeaderIcon);
  itemHeaderName.appendChild(itemHeaderSymbol);
  itemHeaderName.innerHTML += `(${item.name})`;
  const itemHeaderRank = document.createElement("div");
  itemHeaderRank.className = "item-header-rank";
  itemHeaderRank.innerHTML = item.rank;
  itemHeader.appendChild(itemHeaderName);
  itemHeader.appendChild(itemHeaderRank);

  const itemBody = document.createElement("div");
  itemBody.className = "item-body";
  const itemBodyMarketCap = document.createElement("div");
  itemBodyMarketCap.className = "item-body-marketCap";
  itemBodyMarketCap.innerHTML = `Market cap : ${item.quotes.USD.market_cap}`;

  const itemBodyPriceUSD = document.createElement("div");
  itemBodyPriceUSD.className = "item-body-priceUSD";
  itemBodyPriceUSD.innerHTML = `USD : ${item.quotes.USD.price}`;
  const itemBodyPriceBTC = document.createElement("div");
  itemBodyPriceBTC.className = "item-body-priceBTC";
  itemBodyPriceBTC.innerHTML = `BTC : ${item.quotes.BTC.price}`;
  const itemBodyVol24h = document.createElement("div");
  itemBodyVol24h.className = "item-body-volumn24h";
  itemBodyVol24h.innerHTML = `Volume 24h : ${item.quotes.USD.volume_24h}`;
  const itemBodyChange24h = document.createElement("div");
  itemBodyChange24h.className = "item-body-change24h";
  itemBodyChange24h.innerHTML = `Change 24h : ${
    item.quotes.USD.percent_change_24h
  }`;
  itemBody.appendChild(itemBodyMarketCap);
  itemBody.appendChild(itemBodyPriceUSD);
  itemBody.appendChild(itemBodyPriceBTC);
  itemBody.appendChild(itemBodyVol24h);
  itemBody.appendChild(itemBodyChange24h);

  itemNode.appendChild(itemHeader);
  itemNode.appendChild(itemBody);
  crytoList.appendChild(itemNode);
};
const renderList = theList => {
  crytoList.innerHTML = "";
  theList.forEach(element => {
    render(element);
  });
};

searchPanel.addEventListener("input", event => {
  searchLog = event.target.value;
  console.log(searchLog);
  searchData = myData.filter(el => {
    return el.name.toLowerCase().includes(searchLog.toLowerCase());
  });
  console.log(searchData.length, "result(s)");
  crytoList.innerHTML = null;
  renderList(searchData);
});
//Change logos
sortName.addEventListener("click", event => {
  if (event.target.classList.contains("fa-sort-alpha-up")) {
    sortType = "name-asc";
    event.target.classList.remove("fa-sort-alpha-up");
    event.target.classList.add("fa-sort-alpha-down");
  } else {
    sortType = "name-desc";
    event.target.classList.remove("fa-sort-alpha-down");
    event.target.classList.add("fa-sort-alpha-up");
  }
});
sortRank.addEventListener("click", event => {
  typeSort = "rank";
  if (event.target.classList.contains("fa-sort-numeric-up")) {
    sortType = "rank-asc";
    event.target.classList.remove("fa-sort-numeric-up");
    event.target.classList.add("fa-sort-numeric-down");
  } else {
    sortType = "rank-desc";
    event.target.classList.remove("fa-sort-numeric-down");
    event.target.classList.add("fa-sort-numeric-up");
  }
});
sortPrice.addEventListener("click", event => {
  typeSort = "quotes.USD.price";
  if (event.target.classList.contains("fa-sort-amount-up")) {
    sortType = "price-asc";
    event.target.classList.remove("fa-sort-amount-up");
    event.target.classList.add("fa-sort-amount-down");
  } else {
    sortType = "price-desc";
    event.target.classList.remove("fa-sort-amount-down");
    event.target.classList.add("fa-sort-amount-up");
  }
});
//sort function
sortButton.forEach(sortBtn => {
  sortBtn.addEventListener("click", event => {
    switch (sortType) {
      case "name-asc":
        newData = sortNameFunc(myData);
        break;
      case "name-desc":
        newData = sortNameFunc(myData).reverse();
        break;
      case "rank-asc":
        newData = sortRankFunc(myData);
        break;
      case "rank-desc":
        newData = sortRankFunc(myData).reverse();
        break;
      case "price-asc":
        newData = sortPriceFunc(myData);
        break;
      case "price-desc":
        newData = sortPriceFunc(myData).reverse();
        break;
      default:
        break;
    }
    renderList(newData);
  });
});

function sortNameFunc(data) {
  newData = data.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return newData;
}
function sortRankFunc(data) {
  newData = data.sort(function(a, b) {
    return a.rank - b.rank;
  });
  return newData;
}
function sortPriceFunc(data) {
  newData = data.sort(function(a, b) {
    return a.quotes.USD.price - b.quotes.USD.price;
  });
  return newData;
}
