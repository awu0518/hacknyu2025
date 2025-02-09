import './App.css';
import Graph from '../components/Graph/Graph';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

function generateRechartsStockData(days = 30, startPrice = 100) {
  const data = [];
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - days);
  let price = startPrice;
  let trendDirection = Math.random() > 0.5 ? 1 : -1;

  for (let i = 0; i < days; i++) {
    const fluctuation = (Math.random() * 0.03 - 0.015) * trendDirection;
    if (Math.random() < 0.1) price *= 1 + (Math.random() * 0.05 - 0.025);
    price = Math.round(price * (1 + fluctuation) * 100) / 100;

    data.push({
      date: new Date(currentDate).toISOString().split('T')[0],
      price: price,
      volume: Math.floor(Math.random() * 5000000 + 1000000),
    });

    currentDate.setDate(currentDate.getDate() + 1);
    trendDirection *= 1.001;
  }
  return data;
}

function App() {
  const [data, setData] = useState(generateRechartsStockData());
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(100);
  const [invest, setInvest] = useState(0); 
  const [shares, setShares] = useState(0);
  const [numStocks, setNumStocks] = useState(0);

  useEffect(() => {
    const bal = parseFloat(localStorage.getItem('money')) || 1000;
    setBalance(bal);
    setData(generateRechartsStockData());
  }, []);

  const handleSell = () => {
    const investment = parseFloat(invest);

    if (investment <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    if (investment > numStocks + 0.001) {
      setError('Not enough stocks');
      return;
    }

    setError(''); 
    const lastPrice = data[data.length - 1].price;
    let stocksSold = investment * lastPrice;
    setInvest(Math.round(investment * 100) / 100);
    stocksSold = Math.round(stocksSold * 100) / 100;


    setNumStocks(prevNumStocks => prevNumStocks - investment);
    setBalance(prevBalance => prevBalance + stocksSold);

    setData(generateRechartsStockData());
    setInvest(0);
  }

  const handleBuy = () => {
    const investment = parseFloat(invest);

    if (investment <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    if (investment > balance + 0.001) {
      setError('Balance amount exceeded.');
      return;
    }

    setError('');
    setInvest(Math.round(investment * 100) / 100);

    
    const lastPrice = data[data.length - 1].price;
    let stocksBought = investment / lastPrice;
    stocksBought = Math.round(stocksBought * 100) / 100;

    
    setNumStocks(prevNumStocks => prevNumStocks + stocksBought);
    setBalance(prevBalance => prevBalance - investment);
    setData(generateRechartsStockData());
    setInvest(0); 
  };

  const handleInvestChange = (e) => {
    const value = e.target.value;
    setInvest(value === '' ? 0 : parseFloat(value));
  };

  const hanldeWait = () => {
    setData(generateRechartsStockData());
  }

  return (
    <>
      <div className="money-container">Stock Market Simulation</div>
      <div className="App">
        <header className="App-header">
          <div className="graph-container">
            <Graph data={data} dataKey="price" height={400} name="Price" />
          </div>
        </header>

        <div className="elem-container">
          <div className="balance-info">
            <p>Balance: ${balance.toFixed(2)}</p>
            <p>Number of Shares: {numStocks.toFixed(2)}</p>
          </div>

          <div className="input-wrapper">
            <span className="dollar-sign">$</span>
            <input
              type="number"
              className="amount-input"
              placeholder="Amount"
              value={invest}
              onChange={handleInvestChange}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="in-line-buttons">
            <p className="sell-button"onClick={handleSell}>Sell</p>
            <p className="buy-button" onClick={handleBuy}>Buy</p>
            <p className="no-buy-button" onClick={hanldeWait}> Wait</p>
          </div>

          <Popup trigger={<button className="info-button">Information</button>} modal>
            <div className="modal-container">
              <Graph data={data} dataKey="volume" height={170} name="RSI" />
              <br />
              <Graph data={generateRechartsStockData()} height={170} name="Moving Average" />
            </div>
          </Popup>
        </div>
      </div>
    </>
  );
}

export default App;
