import { ChartOptions, ChartTooltipOptions } from 'chart.js'
import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useScreenSize } from '../../hooks/useScreenSize'
import './customStyle'

type LineBarChartProps = {
  lineChartValues: number[]
  barChartValues: number[]
  barChartLabel: string
  lineChartLabel: string
  labels: number[] | string[]
  chartOptions?: ChartOptions
  secondaryBarChartValues?: number[]
  secondaryBarChartLabel?: string
  tooltipFormatter?: (n: number) => string
  xLabel?: string
  formattedXLabels?: string[]
}

const format = (num: any) => Math.round((num + Number.EPSILON) * 100) / 100

export const LineBarChart = ({
  lineChartLabel,
  lineChartValues,
  labels,
  barChartLabel,
  barChartValues,
  chartOptions = {},
  tooltipFormatter = (a) => a.toString(),
  secondaryBarChartLabel,
  secondaryBarChartValues,
  xLabel,
  formattedXLabels = []
}: LineBarChartProps) => {
  const { width } = useScreenSize()
  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: lineChartLabel,
          type: 'line',
          data: lineChartValues,
          fill: false,
          borderColor: 'rgba(255,214,13, 1)',
          strokeWidth: '3px',
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: 'rgba(255,214,13, 1)',
          pointHoverBorderColor: 'rgba(255,214,13, 1)',
          borderWidth: 4,
          yAxisID: 'y-axis-2'
        },
        {
          type: 'bar',
          label: barChartLabel,
          data: barChartValues,
          fill: false,
          backgroundColor: '#000000',
          borderColor: '#1e1e1e',
          hoverBackgroundColor: '#1e1e1e',
          hoverBorderColor: '#1e1e1e',
          yAxisID: 'y-axis-1',
          barThickness:
            labels.length < 14
              ? 300 / ((width || 0) > 500 ? labels.length : labels.length * 2)
              : (width || 0) > 500
              ? labels.length > 31
                ? 7
                : 18
              : labels.length > 31
              ? 4
              : 8
        },
        ...(secondaryBarChartValues?.length
          ? [
              {
                type: 'bar',
                label: secondaryBarChartLabel,
                data: secondaryBarChartValues,
                fill: false,
                backgroundColor: '#55749e',
                borderColor: '#55749e',
                hoverBackgroundColor: '#55749e',
                hoverBorderColor: '#55749e',
                yAxisID: 'y-axis-1',
                barThickness: 0,
                borderWidth: 0
              }
            ]
          : [])
      ]
    }
  }, [lineChartLabel, lineChartValues, barChartLabel, barChartValues])

  const options: ChartOptions = useMemo(() => {
    return {
      ...{
        aspectRatio: (width || 0) > 500 ? 3 : 1.5,
        responsive: true,
        labels: labels,
        legend: {
          labels: {
            usePointStyle: true,
            filter: function (item) {
              // Logic to remove a particular legend item goes here
              return item.datasetIndex !== 2
            }
          },
          onClick: () => false
        },
        tooltips: {
          mode: 'index'
        },
        elements: {
          line: {
            fill: false
          }
        },
        scales: {
          xAxes: [
            {
              display: true,
              stacked: true,
              gridLines: {
                display: false
              },
              labels: labels,
              scaleLabel: {
                display: true,
                labelString: xLabel || ''
              },
              ticks: {
                beginAtZero: false,
                callback: function (value: any, index) {
                  return formattedXLabels[index] || value
                },
                maxTicksLimit:
                  (width || 0) < 500
                    ? labels.length / 2
                    : labels.length > 31
                    ? 24
                    : 31
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: barChartLabel
              },
              id: 'y-axis-1',
              gridLines: {
                display: false
              },
              labels: {
                show: true
              },
              ticks: {
                beginAtZero: false,
                callback: function (value: any) {
                  return tooltipFormatter(format(value))
                },
                maxTicksLimit: (width || 0) < 500 ? labels.length / 4 : 20
              }
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              scaleLabel: {
                display: true,
                labelString: lineChartLabel
              },
              gridLines: {
                display: false
              },
              labels: {
                show: true
              },
              ticks: {
                beginAtZero: true,
                callback: function (value: any) {
                  return '$' + tooltipFormatter(format(value))
                },
                maxTicksLimit: (width || 0) < 500 ? labels.length / 4 : 20
              }
            }
          ]
        }
      },
      tooltips: {
        mode: 'label',
        filter: () => true,
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            const i = tooltipItem.datasetIndex
            if (i === 2) {
              return (
                data.datasets[i].label +
                ': ' +
                format(+tooltipItem.value).toLocaleString(
                  window.navigator.language,
                  { minimumFractionDigits: 3, maximumFractionDigits: 3 }
                ) +
                (i !== 1 ? '$' : '')
              )
            }
            return (
              data.datasets[i].label +
              ': ' +
              tooltipFormatter(format(+tooltipItem.value)) +
              (i !== 1 ? '$' : '')
            )
          },
          title: function (tooltipItem: any) {
            return (
              formattedXLabels[tooltipItem[0].index] || tooltipItem[0].label
            )
          }
        }
      } as ChartTooltipOptions,
      ...chartOptions
    } as ChartOptions
  }, [width])

  const plugins = useMemo(
    () => [
      {
        beforeDraw: function (c: any) {
          c.legend.legendItems.forEach(function (e: any, i: number) {
            if (i === 0) {
              e.fillStyle = 'rgba(255,214,13, 1)'
            }
          })
        }
      }
    ],
    []
  )

  return (
    // @ts-ignore
    <Bar
      data={data}
      options={options}
      height={null}
      width={null}
      plugins={plugins}
    />
  )
}
