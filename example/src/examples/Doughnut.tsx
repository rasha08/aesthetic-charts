import React, { ChangeEvent, useState } from 'react'
import { DoughnutChart } from 'aesthetic-charts'

const Doughnut = () => {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])

  const data = [50, 100, 75, 2, 89].slice(0, 4)
  const labels = ['Mobile', 'Tablet', 'Desktop', 'Test', 'Kita'].slice(0, 4)

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLSelectElement>) => setSelectedIndex(value ? [+value] : [])

  return (
    <>
      <div className='row'>
        <label>Select Device</label>
        <select value={selectedIndex[0]} onChange={handleChange}>
          <option>All</option>
          {['Mobile', 'Tablet', 'Desktop'].map((v, i) => (
            <option value={i} key={i}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div className='row'>
        <DoughnutChart
          dataset={data}
          labels={labels}
          selectedIndex={selectedIndex}
          chartOptions={{
            legend: {
              labels: {
                fontSize: 16,
                usePointStyle: true,
                padding: 10
              },
              position: 'left' as 'left'
            }
          }}
        />
      </div>
    </>
  )
}

export const DoughnutExample = () => {
  return (
    <div className='example paper'>
      <h4>Doughnut Example</h4>
      <Doughnut />
    </div>
  )
}
