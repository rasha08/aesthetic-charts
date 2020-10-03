import React, { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { ChartRGBColor, DoughnutChartOptions } from '../../types';


type DoughnutChartProps = {
  chartColors?: ChartRGBColor[],
  chartOptions?: DoughnutChartOptions,
  dataset: number[],
  labels: string[],
  highlightLevel?: number,
  selectedIndex?: number[]
}

const DEFAULT_INITIAL_BORDER = 4
const DEFAULT_HIGHLIGHT_LEVEL = 16
const DEFAULT_COLORS: ChartRGBColor[] = [
  [107, 108, 139],
  [36, 37, 46],
  [254, 215, 1]
]

const TRANSPARENT = 'rgba(0,0,0,0)'

const DEFAULT_OPTIONS: DoughnutChartOptions = {
  cutoutPercentage: 50,
  responsive: true,
  legend: {
    position: 'left',
    labels: {
      usePointStyle: true,
      fontSize: 20,
      padding: 20
    }
  },
}

const generateColor = (color: ChartRGBColor, opacity = 1) => {
  return `rgba(${[...color, opacity].join(', ')})`
}

export const DoughnutChart = ({ selectedIndex = [], chartColors = DEFAULT_COLORS, chartOptions = DEFAULT_OPTIONS, dataset = [], labels = [], highlightLevel = DEFAULT_HIGHLIGHT_LEVEL }: DoughnutChartProps) => {

  const borders = useMemo(() => {
    const highlighted = DEFAULT_INITIAL_BORDER + highlightLevel
    return labels.map((_, i) => selectedIndex.includes(i) || !selectedIndex.length ? DEFAULT_INITIAL_BORDER : highlighted)
  }, [selectedIndex, labels])

  const colors = useMemo(() => {
    return chartColors.map((c, i) => selectedIndex.includes(i) || !selectedIndex.length ? generateColor(c) : generateColor(c, 0.6))

  }, [selectedIndex])


  const data = useMemo(() => {
    const total = dataset.reduce((p, c) => p + c, 0)

    return {
      datasets: [{
        data: dataset,
        backgroundColor: colors,
        hoverBorderColor: [
          TRANSPARENT,
          TRANSPARENT,
          TRANSPARENT
        ],
        hoverBackgroundColor: colors,
        borderWidth: borders,
        hoverBorderWidth: [0, 0, 0]
      }],
      labels: labels.map((l, i) => {
        return `${l} (${(dataset[i] / total * 100).toFixed()} %)`
      })
    }
  }, [dataset, labels, colors])

  const options = useMemo(() => {
    return {
      ...chartOptions,
      labels: {
        ...chartOptions.legend,
        ...{
          labels: {
            ...chartOptions.legend.labels,
            fontColor: labels.map((_, i) => selectedIndex.includes(i) ? '#000000' : '#1e1e1e')
          }
        }
      }
    }
  }, [labels, selectedIndex, chartOptions])

  return (
    <Doughnut data={data} options={options} />
  )
}