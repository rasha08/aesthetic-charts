import { ChartOptions, ChartTooltipOptions } from 'chart.js'
import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useScreenSize } from '../../hooks/useScreenSize'
import './customStyle'

type LineBarChartProps = {
  lineChartValues: number[];
  barChartValues: number[];
  barChartLabel: string;
  lineChartLabel: string;
  labels: number[] | string[],
  chartOptions?: ChartOptions,
  secondaryBarChartValues?: number[];
  secondaryBarChartLabel?: string;
  tooltipFormatter?: (n: number) => string
  xLabel?: string,
  formattedXLabels?: string[]
}

const format = (num: any) => Math.round((num + Number.EPSILON) * 100) / 100

export const LineBarChart = ({ lineChartLabel, lineChartValues, labels, barChartLabel, barChartValues, chartOptions = {}, tooltipFormatter = a => a.toString(), secondaryBarChartLabel, secondaryBarChartValues, xLabel, formattedXLabels = [] }: LineBarChartProps) => {
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
          yAxisID: 'y-axis-2',
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
          barThickness: (width || 0) > 500 ? 12 : 6,
        },
        ...(secondaryBarChartValues?.length ? [
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
            barThickness: (width || 0) > 500 ? 12 : 6,
          }] :
          []
        )
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
          },
        },
        tooltips: {
          mode: 'index',
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
                callback: function (value: any) {
                  // @ts-ignore
                  return formattedXLabels[labels.indexOf(value)] || value
                },
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: `${barChartLabel} ${secondaryBarChartValues?.length ? ` / ${secondaryBarChartLabel}` : ''}`
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
                  return tooltipFormatter(format(value));
                },
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
                  return '$' + tooltipFormatter(format(value));
                },
              }
            },
          ]
        }
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function (tooltipItem: any, data: any) {
            const i = tooltipItem.datasetIndex;
            return data.datasets[i].label + ': ' + tooltipFormatter(format(+tooltipItem.value)) + (i !== 1 ? '$' : '');
          },
          title: function (tooltipItem: any) {
            return formattedXLabels[tooltipItem[0].index] || tooltipItem[0].label
          }
        }
      } as ChartTooltipOptions,
      ...chartOptions
    } as ChartOptions;
  }, [width])

  const plugins = useMemo(() => [
    {
      beforeDraw: function (c: any) {
        c.legend.legendItems.forEach(function (e: any, i: number) {
          if (i === 0) {
            e.fillStyle = 'rgba(255,214,13, 1)'
          }
        });
      }
    }
  ], [])


  return (
    // @ts-ignore
    <Bar data={data} options={options} height={null} width={null} plugins={plugins} />
  )
}
