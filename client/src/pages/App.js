import './App.css';
import Graph from '../components/Graph/Graph'

function App() {
  
  return (<>
    <div className="money-container">BALANCE</div>
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
