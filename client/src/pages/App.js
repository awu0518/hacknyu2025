import './App.css';
import Home from './Home.js';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(null);

  const handleStart = (amount) => {
    setAmount(amount); 
    console.log('Amount entered:', amount);
  };

  return (
    <div className="App">
      <header className="App-header">
        {amount && <p>Amount entered: ${amount}</p>}
        <Home onStart={handleStart} />
      </header>
    </div>
  );
}

export default App;
