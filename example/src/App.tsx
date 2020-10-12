import React from 'react'
import { Examples } from './examples'


import './index.css'
import { Types } from './types/Types'

const App = () => {


  return <div className="app paper container">
    <h1>Aesthetic Charts</h1>
    <div className="row flex-spaces tabs">
      <input id="tab1" type="radio" name="tabs" />
      <label htmlFor="tab1">Installation</label>

      <input id="tab2" type="radio" name="tabs" />
      <label htmlFor="tab2">Documentation</label>

      <input id="tab3" type="radio" name="tabs" />
      <label htmlFor="tab3">Examples</label>

      <input id="tab4" type="radio" name="tabs" />
      <label htmlFor="tab4">Roadmap</label>

      <div className="content" id="content1">
        <h2>Installation Notes</h2>
      </div>
      <div className="content" id="content2">
        <h2>Documentation</h2>
      </div>
      <div className="content" id="content3">
        <Examples />

      </div>
      <div className="content" id="content4">
        <h2>Roadmap</h2>
        <Types />
      </div>
    </div>

  </div>
}

export default App
