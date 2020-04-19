import axios from 'axios'

import sliceBetweenWords from '../sliceBetweenWords'


const tagsMap = [
  {
    tag: "широта",
    propName: "posX",
    required: true,
  },
  {
    tag: "долгота",
    propName: "posY",
    required: true,
  },
  {
    tag: "адрес",
    propName: "address",
    // required: true,
  },
  {
    tag: "время работы",
    propName: "time",
  },
  {
    tag: "комментарий",
    propName: "comment",
  },
  {
    tag: "картинка",
    propName: "img",
  },
  {
    tag: "icon",
    propName: "icon",
  },
]


export default class store {
  constructor(props) {
    this.props = props
    this.data = new Promise(async (res, rej) => {
      const data = (await axios.get(props.DBlink)).data
      let listId = data.lists.filter(list => list.name === "Database")

      if (listId.length < 1)
        rej("no Database board")

      const mappedPoints = data.cards
        .filter(card => card.idList === listId[0].id)
        .map(card => {
          let damadged = false
          const parsedTags = tagsMap
            .map(tag => {
              const parsedText = sliceBetweenWords(card.desc, `<${tag.tag}>`, `</${tag.tag}>`)
              
              if (tag.required && parsedText === "")
                damadged = true

              return ({[tag.propName]: parsedText})
            })
            .reduce((a, b) => ({...a, ...b}))

          return ({
            ...parsedTags,
            pos: [parsedTags.posX, parsedTags.posY],
            heading: card.name,
            damadged: damadged
          })
        })
        .filter(point => !point.damadged)

      res(mappedPoints)
    })
  }

  get = () => this.data
}