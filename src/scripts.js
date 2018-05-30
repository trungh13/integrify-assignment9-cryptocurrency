const url = "https://api.coinmarketcap.com/v2/ticker/?limit=2000&convert=BTC";
const coinURL = "https://coinmarketcap.com/currencies/";
let data;
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    loadedData(myJson);
  });

const crytoList = document.getElementById("cryto-list");
const render = item => {
  const itemNode = document.createElement("div");
  itemNode.className = "item";
  itemNode.id = item.symbol;

  const itemHeader = document.createElement("div");
  itemHeader.className = "item-header";
  const itemHeaderRank = document.createElement("div");
  itemHeaderRank.className = "item-header-rank";
  itemHeaderRank.innerHTML = item.rank;
  const itemHeaderSymbol = document.createElement("a");
  itemHeaderSymbol.className = "item-header-symbol";
  itemHeaderSymbol.innerHTML = item.symbol;
  itemHeaderSymbol.href = coinURL + item.name;
  const itemHeaderName = document.createElement("div");
  itemHeaderName.className = "item-header-name";
  itemHeaderName.appendChild(itemHeaderSymbol);
  itemHeaderName.innerHTML += `(${item.name})`;
  
itemHeaderName.setAttribute = ("target", "_blank");
  itemHeader.appendChild(itemHeaderName);
  itemHeader.appendChild(itemHeaderRank);

  const itemBody = document.createElement("div");
  itemBody.className = "item-body";
  const itemBodyMarketCap = document.createElement("div");
  itemBodyMarketCap.className = "item-body-marketCap";
  itemBodyMarketCap.innerHTML = `Market cap: ${item.quotes.USD.market_cap}`;

  const itemBodyPriceUSD = document.createElement("div");
  itemBodyPriceUSD.className = "item-body-priceUSD";
  itemBodyPriceUSD.innerHTML = `USD: ${item.quotes.USD.price}`;
  const itemBodyPriceBTC = document.createElement("div");
  itemBodyPriceBTC.className = "item-body-priceBTC";
  itemBodyPriceBTC.innerHTML = `BTC: ${item.quotes.BTC.price}`;
  const itemBodyVol24h = document.createElement("div");
  itemBodyVol24h.className = "item-body-volumn24h";
  itemBodyVol24h.innerHTML = `Volume 24h: ${item.quotes.USD.volume_24h}`;
  const itemBodyChange24h = document.createElement("div");
  itemBodyChange24h.className = "item-body-change24h";
  itemBodyChange24h.innerHTML = `Change 24h: ${
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

loadedData = db => {
  myData = [Object.values(db.data)][0];
  myData.forEach(element => {
    render(element);
  });
};
