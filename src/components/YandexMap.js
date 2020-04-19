import React, { Component } from 'react'


const defaultIcon = "https://kiss-graph.com/libs/recycle-polytech/icon.png"
const ZoomByDelta = [
  {
    deltaLessThan: .5,
    zoom: 11,
  },
  {
    deltaLessThan: 0.035,
    zoom: 12,
  },
  {
    deltaLessThan: 0.025,
    zoom: 13,
  },
  {
    deltaLessThan: 0.005,
    zoom: 14,
  },
]


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      replacePoints: this.replacePoints,
    }

    this.mapRef = new React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.ready)
      return

    state.replacePoints(props)
    return state
  }

  replacePoints = async props => {
    this.map.geoObjects.removeAll()

    props.points.forEach(point =>
      this.map.geoObjects
        .add(new window.ymaps.Placemark(
          point.pos,
          {
            balloonContent: `
              <div class="yandex-baloon">
                <h2 style="margin-bottom: 10px">${point.heading}</h2>
                <small><i>${point.addressNice || point.address}</i></small><br>
                <h3 style="margin-bottom: 10px">Время работы: ${point.time}</h3><br>
                ${point.comment}<br><br>
                ${point.img !== "" ? `<img style='width: 70%' src=${point.img}></img>` : ""}
              </div>
              `,
            iconCaption: point.heading,
          },{
            iconLayout: 'default#image',
            iconImageHref: point.icon || defaultIcon,
            iconImageSize: [64, 64],
            iconImageOffset: [-30, -30]
          }
        ))
    )
  }


  componentDidMount = () => {
    window.ymaps.ready(() => {
      this.map = new ymaps.Map("map", {
        center: [59.946897, 30.332514],
        zoom: 11
      })
      this.setState({ready: true})
    })
  }

  render = () =>
    <div
      id="map"
      ref={this.mapRef}
    />
}
