import React, { useState } from 'react'

import { DoughnutChart } from 'aesthetic-charts'

const data = [50, 100, 75]
const labels = ['Mobile', 'Tablet', 'Desktop']

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])


  return <>
    <label>Select Device</label>
    <select value={selectedIndex[0]} onChange={({ target: { value } }) => setSelectedIndex(+value < 3 ? [+value] : [])}>
      {
        [
          'Mobile',
          'Tablet',
          'Desktop',
          'All'
        ].map((v, i) => <option value={i} key={i}>{v}</option>)
      }
    </select>
    <DoughnutChart dataset={data} labels={labels} selectedIndex={selectedIndex} />
  </>
}

export default App
