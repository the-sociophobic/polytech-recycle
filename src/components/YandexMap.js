import React, { Component } from 'react'


const defaultIcon = "https://kiss-graph.com/libs/recycle-polytech/icon.png"
const ZoomByDelta = [
  {
    deltaLessThan: .2,
    zoom: 10,
  },
  {
    deltaLessThan: .15,
    zoom: 11,
  },
  {
    deltaLessThan: 0.1,
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
              ${point.comment}<br><br>
              ${point.img !== "" ? `<img style='width: 70%' src=${point.img}></img>` : ""}
            </div>
            `,
          iconCaption: point.heading,
        },{
          iconLayout: 'default#image',
          iconImageHref: point.icon || defaultIcon,
          iconImageSize: [34, 51],
          iconImageOffset: [-17, -51]
        }
      ))

    res(pos) //REDO
  })

  replacePoints = async props => {
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
    // console.log(index)
    if (index >= 0 && index < ZoomByDelta.length)
      this.map.setZoom(ZoomByDelta[index - 1].zoom)

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
