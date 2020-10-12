import React from 'react'
import { LineBarChart } from 'aesthetic-charts'


const LineBar = () => {
  const labels = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].slice(5, 25)
  const barChartValues = [200, 185, 590, 621, 250, 400, 95, 200, 185, 590, 621, 250, 400, 95, 200, 185, 590, 621, 250, 400, 95, 200, 185, 590, 621, 250, 45, 321, 34, 432].slice(5, 25)
  const lineChartValues = [11, 59, 55, 60, 65, 70, 67, 50, 40, 49, 60, 47, 51, 65, 40, 49, 60, 70, 80, 90, 80, 78, 75, 60, 50, 65, 40, 49, 60, 47].map(a => a / 5).slice(5, 25)

  return (
    <>
      <div className="row">
        <LineBarChart
          barChartLabel={'Visitor'}
          lineChartLabel={'Sales'}
          secondaryBarChartLabel={'CPM'}
          barChartValues={barChartValues}
          lineChartValues={lineChartValues}
          secondaryBarChartValues={lineChartValues.map(l => l * Math.random())}
          labels={labels}
          xLabel={'Days'}
          formattedXLabels={labels.map(l => l + (l > labels[labels.length - 1] ? '/9' : '/10'))}
        />
      </div>
    </>
  )
}

export const LineBarChartExample = () => {

  return (
    <div className="example paper">
      <h4>LineBarChart Example</h4>
      <LineBar />
    </div>
  )

}