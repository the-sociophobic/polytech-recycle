import React, { Component } from 'react'

import IconPolyPlastic from '../img/new/0.png'
import IconPolyPaper from '../img/new/1.png'
import IconPolyGlass from '../img/new/2.png'
import IconPolyRare from '../img/new/3.png'
import IconPolyBattery from '../img/new/4.png'
import IconPolyPlasticPaper from '../img/new/5.png'
import IconPolyPlasticGlass from '../img/new/6.png'
import IconPolyPaperGlass from '../img/new/7.png'
import IconPolyPlasticPaperGlass from '../img/new/8.png'
import IconPolyCaps from '../img/new/9.png'
import IconPolyVolunteer from '../img/new/10.png'
import IconPlastic from '../img/new/90.png'
import IconPaper from '../img/new/91.png'
import IconGlass from '../img/new/92.png'
import IconRare from '../img/new/93.png'
import IconBattery from '../img/new/94.png'
import IconPlasticPaper from '../img/new/95.png'
import IconPlasticGlass from '../img/new/96.png'
import IconPaperGlass from '../img/new/97.png'
import IconPlasticPaperGlass from '../img/new/98.png'
import IconCaps from '../img/new/99.png'
import IconPolyCafe from '../img/new/100.png'
import IconPolyWater from '../img/new/101.png'
import IconPolyBike from '../img/new/102.png'

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

const sizeConverter = (size, W = 370, H = 370) =>
  ({
    iconImageSize: [Math.round(W / 10 * size), Math.round(H / 10 * size)],
    iconImageOffset: [-Math.round(W * .95 / 10 * size), -Math.round(H * .95 / 10 * size)]
  })

  const getIcon = icon => {
    switch (parseInt(icon)) {
      case 0:
        return IconPolyPlastic
      case 1:
        return IconPolyPaper
      case 2:
        return IconPolyGlass
      case 3:
        return IconPolyRare 
      case 4:
        return IconPolyBattery
      case 5:
        return IconPolyPlasticPaper
      case 6:
        return IconPolyPlasticGlass
      case 7:
        return IconPolyPaperGlass
      case 8:
        return IconPolyPlasticPaperGlass
      case 9:
        return IconPolyCaps
      case 10:
        return IconPolyVolunteer
      case 90:
        return IconPlastic
      case 91:
        return IconPaper
      case 92:
        return IconGlass
      case 93:
        return IconRare 
      case 94:
        return IconBattery
      case 95:
        return IconPlasticPaper
      case 96:
        return IconPlasticGlass
      case 97:
        return IconPaperGlass
      case 98:
        return IconPlasticPaperGlass
      case 99:
        return IconCaps
      case 100:
        return IconPolyCafe
      case 101:
        return IconPolyWater
      case 102:
        return IconPolyBike
      default:
        return IconPolyBike
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
    let bubbleImage

    if (point.pos)
      pos = point.pos
    else {
      if (!point.address)
        rej("no pos, no address")

      const result = await window.ymaps.geocode("Россия, Санкт-Петербург, " + point.address)
      pos = result.geoObjects.get(0).geometry._coordinates
    }
    bubbleImage = point.img.replace(/^\[.*\]\(/gim, '');
    bubbleImage = bubbleImage.replace(/album.*/gim, 'album');
    bubbleImage = bubbleImage.replace(/\[/gim, '');

    const added = this.map.geoObjects
      .add(new window.ymaps.Placemark(
        pos,
        {
          balloonContent: `
            <div class="yandex-baloon">
              <h2 style="margin-bottom: 10px">${point.heading}</h2>
              <small><i>${point.addressNice || point.address}</i></small><br>
              <h3 style="margin-bottom: 10px">Время работы: ${point.time}</h3><br>
              ${point.img !== "" ? `<img style='width: 100%' src=${bubbleImage}></img>` : ""}<br>
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

    for (let pointIndex in props.points) {
      const point = props.points[pointIndex]
      const res = await this.addPoint(point)
    }
  }


  componentDidMount = () => 
    // setTimeout(() =>
      window.ymaps.ready(() => {
        this.map = new window.ymaps.Map("map", {
          center: [59.999707, 30.366714],
          zoom: 13,
          controls: ['searchControl', 'typeSelector', 'zoomControl', 'geolocationControl', 'fullscreenControl']
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
