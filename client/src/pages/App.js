import './App.css';
import Graph from '../components/Graph/Graph'
import { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';

function App() {
  const [balance, setBalance] = useState(0)
  const [data, setData] = useState([])
  const [originalData, setOrig] = useState([])
  const [done, setDone] = useState(false)
  const [company, setCompany] = useState('')
  const [news, setNews] = useState('News')
  const [amount, setAmount] = useState(0)
  const [analysis, setAnalysis] = useState('')

  const companies = ["amd", "tesla", "capitalone", "alphabetA", "costco", "expedia"]

  const fetchData = async () => {

    const selected = Math.floor(Math.random() * 6)
    setCompany(companies[selected])
    
    const payload = {
      "csv_url": `https://hacknyu2025lkjyoe.s3.us-east-1.amazonaws.com/${companies[selected]}.csv`
    }

    const payload2 = {
      "stock_name": companies[selected]
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
      console.log(clone)

      reversedArray.splice(reversedArray.length - 5, 5)

      setData(reversedArray)
      
      const res2 = await fetch("https://fkc1fmei3f.execute-api.us-east-1.amazonaws.com/gn", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload2)
      })

      const newsdata = await res2.json()
      console.log(newsdata)
      setNews(newsdata.news)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

    fetchData()

    const bal = parseInt(localStorage.getItem('money'))
    setBalance(bal)

  }, [])

  const getAnalyze = async () => {
    const payload3 = {
      "stock_info": data,
      "news": news
    }

    const headers = {
      "Content-Type": "application/json"
    }
    
    try {
      const response = await fetch("https://v2zlde1262.execute-api.us-east-1.amazonaws.com/ga", {
        method: "POSt", 
        headers: headers,
        body: JSON.stringify(payload3)
      })
  
      const analysis = await response.json()
  
      console.log(analysis)
      setAnalysis(analysis.message)
    } catch (e) {
      console.log(e)
    }

  }

  const handleBuy = () => {
    if (amount <= balance) {
      const latest = data[data.length - 1].price
      const newest = originalData[originalData.length - 1].price

      const prof = (newest / latest) * amount - amount

      getAnalyze()

      setBalance((bal) => bal + prof)
      setData(() => originalData)
      setDone(true)
    } 
  }

  const handleNext = () => {
    fetchData()
    setDone(false)
    setAnalysis('')
  }

  const handleWait = () => {
    fetchData()
    setDone(false)
  }
  
  return (<>
    <div className="money-container">
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      <div className="modal-container">
        <Graph data={data} dataKey={"volume"} height={170} name={"RSI"} /> <br></br>
        <Graph data={data} dataKey={"7_day_ma"} height={170} name={"7 Day MA"} /> 
        <p>{ news }</p>
      </div>
      
    </Popup>
    Balance: { balance.toFixed(2) }</div>
    <div className="App">
      <header className="App-header">
        <p>{company}</p>
        <Graph data={data} dataKey={"price"} height={400} name={"Price"} />
        <div><p>{ analysis }</p></div>
      </header>
      <div className="button-container">
        {!done &&
          <div className="input-wrapper">
            <span className="dollar-sign">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="amount-input"
            />
          </div>
        }
        <p className="buy-button" onClick={handleBuy}>Buy</p>
        <p className="no-buy-button" onClick={handleWait}>Wait</p>
        { done && <p className="next-button" onClick={handleNext}>Next </p>}
      </div>
    </div>
    </>
  );
}

export default App;
