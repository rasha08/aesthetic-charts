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