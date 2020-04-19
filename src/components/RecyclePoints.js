import React, { Component } from 'react'

import { StoreContext } from '../utils/store'
import YandexMap from './YandexMap'


class RecyclePoints extends Component {
  constructor(props) {
    super(props)
    this.state = {
      points: []
    }
  }

  componentDidMount = () => this.initData()

  initData = async () => this.setState({points: await this.context.store.get()})

  render = () => (
    <div className="random-events" id="random-events">
      <div className="random-events__map-container">
        <YandexMap
          points={this.state.points}
        />
      </div>
    </div>
  )
}

RecyclePoints.contextType = StoreContext

export default RecyclePoints
