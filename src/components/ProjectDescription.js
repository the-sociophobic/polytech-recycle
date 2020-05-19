import React, { Component } from 'react'

import { StoreContext } from '../utils/store'
import ExternalLink from './ExternalLink'
import { registerListeners, unregisterListeners } from '../utils/preventMobileScrolling'


const infoBlocks = [
  {
    h2: "Организатор проекта",
    desc: <>
      Студенческое объединение <ExternalLink to="http://regreen.tilda.ws/we">REGREEN</ExternalLink>. Основной задачей объединия является изменение мира к лучшему и вовлечение в культуру устойчивого развития.
    </>,
    bottom: <>
      <ExternalLink to="https://vk.com/regreen_polytech">VK</ExternalLink>, <ExternalLink to="https://www.instagram.com/regreenpolytech/">instagram</ExternalLink>
    </>
  },
  {
    h2: "Проект реализовали",
    desc: <>
      {[
        {
          name: "Роберт Андреев",
          link: "https://vk.com/lelysh1",
        },
        {
          name: "Лев Васильев",
          link: "https://kiss-graph.com/node/the_sociophobic",
        },
        {
          name: "Армен Барсегян",
          link: "https://vk.com/doc.schulz",
        },
        {
          name: "Ван Сыюй",
          link: "https://vk.com/wangera",
        },
        {
          name: "Жэнь Мэнгуан",
          link: "https://vk.com/id459591978",
        },
        {
          name: "Игорь Лебедев",
          link: "https://vk.com/id51388488",
        },
      ].map(person =>
        <ExternalLink to={person.link}>{person.name}</ExternalLink>
      ).reduce((a, b) => Array.isArray(a) ? [...a, ", ", b] : [a, ", ", b])
      } в рамках работы по предмету Основы Проектной Деятельности.
    </>,
    // bottom: <>
    //   Исходный код на <ExternalLink to="https://github.com/the-sociophobic/recycle-polytech">github.com</ExternalLink>
    // </>
  },
]


class ProjectDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMobile: false
    }

    this.aboutButtonRef = React.createRef()
  }

  componentDidMount = () =>
    registerListeners(this.aboutButtonRef.current)
  componentWillUnmount = () =>
    unregisterListeners(this.aboutButtonRef.current)

  render = () => (
    <div className="project-description">
      <div
        ref={this.aboutButtonRef}
        className="project-description__mobile-open"
        onClick={() => this.setState({showMobile: true})}
      >
        О Проекте
      </div>
      <div className={"project-description__container " + (this.state.showMobile && "project-description__container--open")}>
        <div
          className="project-description__mobile-close"
          onClick={() => this.setState({showMobile: false})}
        />
        <div className="project-description__h1">
          Карта раздельного сбора в Политехе
        </div>
        <div className="project-description__blocks">
          {infoBlocks.map(item =>
            <div className="project-description__blocks__item">
              <div className="project-description__blocks__item__h2">
                {item.h2}
              </div>
              <div className="project-description__blocks__item__desc">
                {item.desc}
              </div>
              {item.bottom &&
                <div className="project-description__blocks__item__bottom">
                  {item.bottom}
                </div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ProjectDescription.contextType = StoreContext

export default ProjectDescription
