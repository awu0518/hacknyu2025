import './App.css';
import Graph from '../components/Graph/Graph'
import { useState, useEffect } from 'react'

function App() {
  const [balance, setBalance] = useState('')

  useEffect(() => {
    const bal = localStorage.getItem('money')
    setBalance(bal)
  }, [])
  
  return (<>
    <div className="money-container">Balance: {balance}</div>
    <div className="App">
      <header className="App-header">
        <Graph />
      </header>
      <div className="button-container">
        <p className="buy-button">Buy</p>
        <p className="no-buy-button">Wait</p>
      </div>
    </div>
    </>
  );
}

export default App;
