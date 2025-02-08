import './App.css';
import Graph from '../components/Graph/Graph'
import { useState, useEffect } from 'react'

function App() {
  const [balance, setBalance] = useState('')
  const [data, setData] = useState(generateRechartsStockData())

  function generateRechartsStockData(days = 30, startPrice = 100) {
      const data = [];
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - days); // Start from X days ago
      let price = startPrice;
      let trendDirection = Math.random() > 0.5 ? 1 : -1; // Random upward/downward trend
      
      for (let i = 0; i < days; i++) {
          // Base fluctuation (-1.5% to +1.5%)
          const fluctuation = (Math.random() * 0.03 - 0.015) * trendDirection;
          
          // Add occasional spikes/dips
          if (Math.random() < 0.1) { // 10% chance of event
          price *= (1 + (Math.random() * 0.05 - 0.025)); // ±2.5% event
          }
          
          price = price * (1 + fluctuation);
          price = Math.round(price * 100) / 100; // Round to 2 decimals
      
          data.push({
          date: new Date(currentDate).toISOString().split('T')[0], // YYYY-MM-DD format
          price: price,
          // Optional volume simulation
          volume: Math.floor(Math.random() * 5000000 + 1000000) 
          });
      
          currentDate.setDate(currentDate.getDate() + 1);
          
          // Gradually strengthen the trend
          trendDirection *= 1.001;
      }
      
      return data;
  }

  useEffect(() => {
    const bal = localStorage.getItem('money')
    const tempdata = generateRechartsStockData()
    setData(tempdata)
    setBalance(bal)
  }, [])

  const handleBuy = () => {
    setData(() => generateRechartsStockData())
  }
  
  return (<>
    <div className="money-container">Balance: {balance}</div>
    <div className="App">
      <header className="App-header">
        <Graph data={data} dataKey={"price"} />
        <Graph data={data} dataKey={"volume"} />
        <Graph data={generateRechartsStockData()} />
      </header>
      <div className="button-container">
        <p className="buy-button" onClick={handleBuy}>Buy</p>
        <p className="no-buy-button">Wait</p>
      </div>
    </div>
    </>
  );
}

export default App;
