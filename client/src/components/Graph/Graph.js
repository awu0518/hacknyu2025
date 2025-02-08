import './Graph.css'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 
  
  function Graph() {
    const [data, setData] = useState([])

    useEffect(() => {
        const tempdata = generateRechartsStockData()
        setData(tempdata)
    }, [])

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


    return (
<ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      {/* XAxis with smaller font */}
      <XAxis
        dataKey="date"
        tick={{ fontSize: 10 }} // Reduced from default 12
        angle={-45}
        textAnchor="end"
        height={60} // Give more space for angled labels
      />

      {/* YAxis with smaller font */}
      <YAxis
        tick={{ fontSize: 10 }} // Reduced from default 12
        width={80} // Prevent label truncation
      />

      {/* Compact Tooltip */}
      <Tooltip
        contentStyle={{
          fontSize: 10, // Smaller text
          padding: 8, // Reduced from default 8
          lineHeight: '1.2', // Tighter spacing
          background: '#ffffff',
          border: '1px solid #cccccc',
          borderRadius: 4
        }}
        itemStyle={{
          fontSize: 10, // Individual item text size
          padding: 0
        }}
        formatter={(value) => [value.toFixed(2), 'Price']} // Compact value display
      />

      <Line
        type="monotone"
        dataKey="price"
        stroke="#2196F3"
        strokeWidth={4}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
    );
  }
  
  export default Graph;