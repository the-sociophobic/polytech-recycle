import React, { Component } from 'react'

import Icon4 from '../img/4.png'
import Icon2 from '../img/2.png'
import Icon7 from '../img/7.png'
import Icon8 from '../img/8.png'
import Icon9 from '../img/9.png'
import Icon10 from '../img/10.png'
import Icon22 from '../img/22.png'
import Icon23 from '../img/23.png'
const ZoomByDelta = [
  {
    deltaLessThan: 5,
    zoom: 8,
  },
  {
    deltaLessThan: 2.5,
    zoom: 9,
  },
  {
    deltaLessThan: 1.5,
    zoom: 10,
  },
  {
    deltaLessThan: 1,
    zoom: 11,
  },
  {
    deltaLessThan: .5,
    zoom: 12,
  },
  {
    deltaLessThan: 0.035,
    zoom: 13,
  },
  {
    deltaLessThan: 0.025,
    zoom: 14,
  },
  {
    deltaLessThan: 0.004,
    zoom: 15,
  },
  {
    deltaLessThan: 0.0005,
    zoom: 16,
  },
  {
    deltaLessThan: 0.00025,
    zoom: 17,
  },
]

const sizeConverter = (size, W = 228, H = 370) =>
  ({
    iconImageSize: [Math.round(W / 10 * size), Math.round(H / 10 * size)],
    iconImageOffset: [-Math.round(W / 20 * size), -Math.round(H * .95 / 10 * size)]
  })

const getIcon = icon => {
  switch (parseInt(icon)) {
    case 0:
      return Icon2
    case 1:
      return Icon4
    case 2:
      return Icon7
    case 3:
      return Icon8 
    case 4:
      return Icon9
    case 5:
      return Icon10
    case 6:
      return Icon22
    case 7:
      return Icon23
    default:
      return Icon2
  }
}


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
      return state

    state.replacePoints(props)
    return state
  }

  addPoint = async point => new Promise(async (res, rej) => {
    let pos

    if (point.pos)
      pos = point.pos
    else {
      if (!point.address)
        rej("no pos, no address")

      const result = await window.ymaps.geocode("Россия, Санкт-Петербург, " + point.address)
      pos = result.geoObjects.get(0).geometry._coordinates
    }


    const added = this.map.geoObjects
      .add(new window.ymaps.Placemark(
        pos,
        {
          balloonContent: `
            <div class="yandex-baloon">
              <h2 style="margin-bottom: 10px">${point.heading}</h2>
              <small><i>${point.addressNice || point.address}</i></small><br>
              <h3 style="margin-bottom: 10px">Время работы: ${point.time}</h3><br>
              ${point.img !== "" ? `<img style='width: 4000px' src=${point.img}></img>` : ""}<br>
              ${point.comment}
              
            </div>
            `,
          iconCaption: point.heading,
        },{
          iconLayout: 'default#image',
          iconImageHref: getIcon(point.icon),
          ...sizeConverter(1.7)
        }
      ))

    res(pos) //REDO
  })

  replacePoints = async props => {
    if (!(props.points?.length > 0))
      return

    this.map.geoObjects.removeAll()
    this.minX = null
    this.maxX = null
    this.minY = null
    this.maxY = null

    for (let pointIndex in props.points) {
      const point = props.points[pointIndex]
      const res = await this.addPoint(point)

      this.minX = this.minX === null ? res[0] : Math.min(res[0], this.minX)
      this.maxX = this.maxX === null ? res[0] : Math.max(res[0], this.maxX)
      this.minY = this.minY === null ? res[1] : Math.min(res[1], this.minY)
      this.maxY = this.maxY === null ? res[1] : Math.max(res[1], this.maxY)
    }

    this.map.setCenter([(this.minX + this.maxX) / 2, (this.minY + this.maxY) / 2])

    const deltaX = this.maxX - this.minX
    const deltaY = this.maxY - this.minY
    const aspect = this.mapRef.current.clientWidth / this.mapRef.current.clientHeight
    const maxDelta = deltaX / deltaY > aspect ? deltaY : deltaX
    
    let index = 0
    while (ZoomByDelta[index].deltaLessThan > maxDelta && index < ZoomByDelta.length)
      index++
    if (index >= 0 && index < ZoomByDelta.length)
      this.map.setZoom(ZoomByDelta[index - 1].zoom)

  }


  componentDidMount = () => 
    // setTimeout(() =>
      window.ymaps.ready(() => {
        this.map = new window.ymaps.Map("map", {
          center: [59.946897, 30.332514],
          zoom: 11
        })
        this.setState({ready: true})
      })
    // , 500)

  render = () =>
    <div
      id="map"
      ref={this.mapRef}
    />
}
