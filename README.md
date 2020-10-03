# aesthetic-charts

> React charts library created on top of react-chartjs-2 and chartjs for beautiful aesthetic charts

[![NPM](https://img.shields.io/npm/v/aesthetic-charts.svg)](https://www.npmjs.com/package/aesthetic-charts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save aesthetic-charts
```

```bash
yarn add aesthetic-charts
```

## Charts

### DoughnutChart

```tsx
type DoughnutChartProps = {
  chartColors?: ChartRGBColor[],
  chartOptions?: DoughnutChartOptions,
  dataset: number[],
  labels: string[],
  highlightLevel?: number,
  selectedIndex?: number[]
}
export type ChartRGBColor = [number, number, number]

export type DoughnutChartOptions = {
  cutoutPercentage: number,
  responsive: boolean,
  legend: {
    position: 'left' | 'top' | 'right' | 'bottom',
    labels: {
      usePointStyle: boolean,
      fontSize: number,
      padding: number
    }
  }
}

```


## Usage

```tsx
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

```

## License

MIT © [rasha08](https://github.com/rasha08)
