import './App.css';
import Graph from '../components/Graph/Graph'
import { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';

function App() {
  const [balance, setBalance] = useState('')
  const [data, setData] = useState([])
  const [originalData, setOrig] = useState([])
  const [done, setDone] = useState(false)
  const [company, setCompany] = useState('')

  const companies = ["amd", "tesla", "capitalone", "alphabetA"]

  const fetchData = async () => {

    const selected = Math.floor(Math.random() * 3)
    setCompany(companies[selected])
    
    const payload = {
      "csv_url": `https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/${companies[selected]}.csv`
    }

    const headers = {
      "Content-Type": "application/json"
    }

    try {
      const res = await fetch("https://mfvqo6rzzj.execute-api.us-east-1.amazonaws.com/gd", {
        method: 'POST', 
        headers: headers,
        body: JSON.stringify(payload)
      })
      const js = await res.json()

      let array = js.data
      let reversedArray = [];
      for (let i = array.length - 1; i >= 0; i--) {
          reversedArray.push(array[i]);
      }
      const clone = structuredClone(reversedArray);
      setOrig(clone)

      reversedArray.splice(reversedArray.length - 5, 5)

      setData(reversedArray)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

    fetchData()

    const bal = localStorage.getItem('money')
    setBalance(bal)

  }, [])

  const handleBuy = () => {
    const latest = data[data.length - 1].price
    const newest = originalData[originalData.length - 1].price

    setBalance((bal) => bal - (latest - newest))
    setData(() => originalData)
    setDone(true)
  }

  const handleNext = () => {
    fetchData()
    setDone(false)
  }
  
  return (<>
    <div className="money-container">
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      <div className="modal-container">
        <Graph data={data} dataKey={"volume"} height={170} name={"RSI"} /> <br></br>
        <Graph data={data} dataKey={"7_day_ma"} height={170} name={"7 Day MA"} />
      </div>
      
    </Popup>
    Balance: {balance}</div>
    <div className="App">
      <header className="App-header">
        <p>{company}</p>
        <Graph data={data} dataKey={"price"} height={400} name={"Price"} />
      </header>
      <div className="button-container">
        <p className="buy-button" onClick={handleBuy}>Buy</p>
        <p className="no-buy-button">Wait</p>
        { done && <p className="next-button" onClick={handleNext}>Next </p>}
      </div>
    </div>
    </>
  );
}

export default App;
