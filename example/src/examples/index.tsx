import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { DoughnutExample } from './Doughnut'
import { LineBarChartExample } from './LineBar'

// @ts-ignore
import doughnutExampleMd from './docs/Doughnut.md'
// @ts-ignore
import lineBarChartExampleMd from './docs/LineBar.md'


export const Examples = () => {
  const [doughnutExampleReadme, setDoughnutExampleReadme] = useState<any>(null)
  const [lineBarChartExampleReadme, setLineBarChartExampleReadme] = useState<any>(null)


  useEffect(() => {
    fetch(doughnutExampleMd).then((response) => response.text()).then((text) => {
      setDoughnutExampleReadme(text)
    })
    fetch(lineBarChartExampleMd).then((response) => response.text()).then((text) => {
      setLineBarChartExampleReadme(text)
    })
  }, [setLineBarChartExampleReadme, setDoughnutExampleReadme])

  return <div className="examples">
    <h2>Examples</h2>
    <div className="row">
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible" />
        <label htmlFor="collapsible1">DoughnutChart Example</label>
        <div className="collapsible-body">
          <DoughnutExample />
          <div className="container-sm paper">
            <ReactMarkdown source={doughnutExampleReadme} />
          </div>
        </div>
      </div>
      <div className="collapsible">
        <input id="collapsible2" type="checkbox" name="collapsible" />
        <label htmlFor="collapsible2">LineBarChart Example</label>
        <div className="collapsible-body">
          <LineBarChartExample />
          <div className="container-sm paper">
            <ReactMarkdown source={lineBarChartExampleReadme} />
          </div>
        </div>
      </div>
    </div>


  </div>
}