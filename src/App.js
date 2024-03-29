import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin.js'



function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=50&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => alert('Its not workin'))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h3 className='coin-text'>🇨🇦 Search for your favourite coin below 🇨🇦</h3>
          <form>
            <input 
            type='text' 
            placeholder='Search...' 
            className='coin-input' 
            onChange={handleChange} />
          </form>
      </div>
      <div className='title-row'>
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COIN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PRICE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VOLUME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PCT%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MKTCAP&nbsp;</h3>
          </div>
      {filteredCoins.map(coin => {
        return (
          <>

        <Coin 
        key={coin.id} 
        name={coin.name} 
        image={coin.image} 
        symbol={coin.symbol}
        marketcap={coin.market_cap}
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        volume={coin.total_volume}
         />
         </>
         )
        
      })}
    </div>
  );
}

export default App;
