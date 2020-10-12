```tsx
const Doughnut = () => {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])

  const data = [50, 100, 75, 14, 89]
  const labels = ['Mobile', 'Tablet', 'Desktop', 'Test', 'Kita']

  const chartOptions = {
    legend: {
      labels: {
        fontSize: 16,
        usePointStyle: true,
        padding: 10
      },
      position: 'left' as 'left'
    }
  }

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) =>
    setSelectedIndex(value ? [+value] : [])

  return (
    <>
      <div className="row">
        <label>Select Device</label>
        <select value={selectedIndex[0]} onChange={handleChange}>
          <option>All</option>
          {
            [
              'Mobile',
              'Tablet',
              'Desktop',
            ].map((v, i) => <option value={i} key={i}>{v}</option>)
          }
        </select>
      </div>
      <div className="row">
        <DoughnutChart dataset={data} labels={labels} selectedIndex={selectedIndex} chartOptions={chartOptions} />
      </div>
    </>
  )
}
```