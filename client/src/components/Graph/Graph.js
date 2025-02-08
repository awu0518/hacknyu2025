import './Graph.css'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 
  
function Graph({ data, dataKey }) {

    return (
<ResponsiveContainer width="100%" height={200}>
    <div>Something</div>
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
          formatter={(value, name) => {
            if (name === 'price') return [`$${value.toFixed(2)}`, 'Price'];
            if (name === 'volume') return [value.toLocaleString(), 'Volume'];
            return [value, name];
  }}
      />

      <Line
        type="monotone"
        dataKey={dataKey}
        stroke="#2196F3"
        strokeWidth={4}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
    );
  }
  
  export default Graph;