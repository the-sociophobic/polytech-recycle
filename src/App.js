import React, { Component } from 'react'

import { initialState, StoreContext } from './utils/store'
import RecyclePoints from './components/RecyclePoints'
import ProjectDescription from './components/ProjectDescription'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState({
      state: this.state,
      setState: this.setState,
    })
  }

  render = () => (
    <StoreContext.Provider value={this.state}>
      <div className="App">
        <ProjectDescription />
        <RecyclePoints />
      </div>
    </StoreContext.Provider>
  )
}

export default App
