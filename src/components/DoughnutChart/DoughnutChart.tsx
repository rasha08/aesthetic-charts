import { ChartOptions, ChartTooltipOptions } from 'chart.js'
import React, { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartRGBColor, DoughnutChartOptions } from '../../types'

type DoughnutChartProps = {
  chartColors?: ChartRGBColor[]
  chartOptions?: ChartOptions
  dataset: number[]
  labels: string[]
  highlightLevel?: number
  selectedIndex?: number[]
  tooltipFormatter?: (a: number) => string
}

const DEFAULT_INITIAL_BORDER = 0
const DEFAULT_HIGHLIGHT_LEVEL = 4
const DEFAULT_COLORS: ChartRGBColor[] = [
  [107, 108, 139],
  [36, 37, 46],
  [254, 215, 1],
  [85, 116, 158],
  [81, 143, 125]
]

const TRANSPARENT = 'rgba(0,0,0,0)'

const DEFAULT_OPTIONS: DoughnutChartOptions | any = {
  cutoutPercentage: 50,
  responsive: true,
  legend: {
    position: 'left',
    labels: {
      usePointStyle: true,
      fontSize: 12,
      padding: 10
    },
    onClick: () => false
  }
}

const generateColor = (color: ChartRGBColor, opacity = 1) => {
  return `rgba(${[...color, opacity].join(', ')})`
}

export const DoughnutChart = ({
  selectedIndex = [],
  chartColors: chartC,
  chartOptions = DEFAULT_OPTIONS,
  dataset: ds = [],
  labels: lbs = [],
  highlightLevel = DEFAULT_HIGHLIGHT_LEVEL,
  tooltipFormatter = (a) => a.toString()
}: DoughnutChartProps) => {
  const dataset = useMemo(
    () => ds.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v),
    [ds]
  )

  const chartColors = useMemo(() => {
    if (chartC) return [...chartC, ...DEFAULT_COLORS]

    return DEFAULT_COLORS
  }, [lbs, chartC])

  const highlightedIndexes = useMemo(
    () =>
      (selectedIndex || [])
        .filter((i) => i > -1)
        .map((i) => dataset.findIndex((a) => a.i === i)),
    [selectedIndex]
  )

  const labels = useMemo(() => dataset.map(({ i }) => lbs[i]), [lbs, dataset])

  const borders = useMemo(() => {
    const highlighted = DEFAULT_INITIAL_BORDER + highlightLevel
    return labels
      .slice(0, 4)
      .map((_, i) =>
        highlightedIndexes.includes(i) ||
        !highlightedIndexes.length ||
        Number.isNaN(highlightedIndexes[0])
          ? DEFAULT_INITIAL_BORDER
          : highlighted
      )
  }, [highlightedIndexes, labels])

  const colors = useMemo(() => {
    return chartColors.map((c, i) =>
      highlightedIndexes.includes(i) ||
      !highlightedIndexes.length ||
      Number.isNaN(highlightedIndexes[0])
        ? generateColor(c)
        : generateColor(c, 0.2)
    )
  }, [highlightedIndexes])

  const data = useMemo(() => {
    const total = dataset.reduce((p, c) => p + c.v, 0)

    return {
      datasets: [
        {
          data: dataset.map(({ v }) => v),
          backgroundColor: colors,
          hoverBorderColor: [TRANSPARENT, TRANSPARENT, TRANSPARENT],
          hoverBackgroundColor: colors,
          borderWidth: borders,
          hoverBorderWidth: [0, 0, 0]
        }
      ],
      labels: labels.map((l, i) => {
        return `${l} (${((dataset[i].v / total) * 100).toFixed()}%)`
      })
    }
  }, [dataset, labels, colors])

  const options = useMemo(() => {
    return {
      ...DEFAULT_OPTIONS,
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            const i = tooltipItem.index
            return (
              data.labels[i] + ': ' + tooltipFormatter(data.datasets[0].data[i])
            )
          }
        }
      } as ChartTooltipOptions,
      ...chartOptions
    }
  }, [chartOptions])

  return <Doughnut data={data} options={options} />
}
