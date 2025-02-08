import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const handleButtonClick = () => {
    if (parseFloat(amount) > 0) {
        navigate('/start', { state: { amount } });
      setError('');
    } else {
      setError('Please enter a valid amount greater than 0.');
    }
  };

  return (
    <div className="home-container">
      <div className="input-wrapper">
        <span className="dollar-sign">$</span>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="amount-input"
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button className="start-button" onClick={handleButtonClick}>Start</button>
    </div>
  );
}

export default Home;
