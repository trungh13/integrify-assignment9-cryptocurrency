import React from 'react'
import styles from "./index.css";

const dataIconSrc = "https://s2.coinmarketcap.com/static/img/coins/16x16/";
const dataLink="https://coinmarketcap.com/currencies/"

const Ticker = (props) => {
  const data=props.data;
  return (
    <div className={[styles.Ticker,styles[props.displayType]].join(" ")}>
      <div className={[styles.TickerHeader,styles[props.displayType]].join(" ")}>
        <div className={[styles.TickerHeaderName,styles[props.displayType]].join(" ")}>
          <img className={styles.TickerHeaderNameIcon} src={`${dataIconSrc}${data.id}.png`} alt=""/>
          <a className={styles.TickerHeaderNameSymbol} href={`${dataLink}${data.name}`}>{data.symbol}</a>
          <p className={styles.TickerHeaderNameName}>({data.name})</p>
        </div>
        <div className={styles.TickerHeaderRank}>{data.rank}</div>
      </div>
      <div className={[styles.TickerContent,styles[props.displayType]].join(" ")}>
        <div className={styles.TickerContentPriceUSD}>{`USD : ${data.quotes.USD.price}`}</div>
        <div className={styles.TickerContentPriceBTC}>{`BTC : ${data.quotes.BTC.price}`}</div>
        <div className={styles.TickerContentChange1h}>{`Change in 1h : ${data.quotes.USD.percent_change_1h}% `}
        {data.quotes.USD.percent_change_1h>=0?<i className={["fas fa-caret-up",styles["up"]].join(" ")}></i>: <i className={["fas fa-caret-down",styles["down"]].join(" ")}></i>}
        </div>
        <div className={styles.TickerContentChange24h}>{`Change in 24h : ${data.quotes.USD.percent_change_24h}% `} 
        {data.quotes.USD.percent_change_24h>=0?<i className={["fas fa-caret-up",styles["up"]].join(" ")}></i>: <i className={["fas fa-caret-down",styles["down"]].join(" ")}></i>}
        </div>
      </div>
      
    </div>
  )
}

export default Ticker
