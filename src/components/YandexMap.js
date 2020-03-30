import React, { Component } from 'react'

const points = [
  {
    pos: [60.007711, 30.374162],
    text: {
      balloonContent: '<strong>Пункт раздельного сбора №1</strong><br>Режим работы: 8:00 - 18:00',
       iconCaption: 'Пункт раздельного сбора №1',
    },
    icon: {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    },
  },
  {
    pos: [60.008927, 30.373703],
    text: {
      balloonContent: '<strong>Пункт раздельного сбора №2</strong><br>Режим работы: 8:00 - 18:00',
       iconCaption: 'Пункт раздельного сбора №2',
    },
    icon: {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    },
  },
  {
    pos: [60.007072, 30.376653],
    text: {
      balloonContent: '<strong>Пункт раздельного сбора №3</strong><br>Режим работы: 8:00 - 18:00',
       iconCaption: 'Пункт раздельного сбора №3',
    },
    icon: {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    },
  },
  {
    pos: [60.005256, 30.370340],
    text: {
      balloonContent: '<strong>Пункт раздельного сбора №4</strong><br>Режим работы: 8:00 - 18:00',
       iconCaption: 'Пункт раздельного сбора №4',
    },
    icon: {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    },
  },
  {
    pos: [60.001567, 30.370843],
    text: {
      balloonContent: '<strong>Пункт раздельного сбора №5</strong><br>Режим работы: 8:00 - 18:00',
       iconCaption: 'Пункт раздельного сбора №5',
    },
    icon: {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    },
  },
]

export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const ymaps = window.ymaps

    ymaps.ready(() => {
      this.map = new ymaps.Map("map", {
        center: [60.007177, 30.37599260],
        zoom: 15
      })

      points.forEach(point =>
        this.map.geoObjects
          .add(new ymaps.Placemark(point.pos, point.text, point.icon)
        )
      )
    })
  }

  render = () =>
    <div id="map" />
}
