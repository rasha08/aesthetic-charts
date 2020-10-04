```tsx
const LineBar = () => {
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  const barChartValues = [200, 185, 590, 621, 250, 400, 95, 200, 185, 590, 621, 250, 400, 95, 200, 185, 590, 621, 250, 400, 95, 200, 185, 590, 621, 250, 45, 321, 34, 432]
  const lineChartValues = [51, 59, 55, 60, 65, 70, 67, 50, 40, 49, 60, 47, 51, 65, 40, 49, 60, 70, 80, 90, 80, 78, 75, 60, 50, 65, 40, 49, 60, 47].map(a => a / 5)

  return (
    <div className="row">
      <LineBarChart
        barChartLabel={'Visitor'}
        lineChartLabel={'Sales'}
        barChartValues={barChartValues}
        lineChartValues={lineChartValues}
        labels={labels}
      />
    </div>
  )
}
```