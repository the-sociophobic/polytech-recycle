import React, { Component } from 'react'

import { StoreContext } from '../utils/store'
import ExternalLink from './ExternalLink'
import { registerListeners, unregisterListeners } from '../utils/preventMobileScrolling'


const infoBlocks = [
  {
    h2: "Экологичным быть: в Политехе запущен раздельный сбор отходов!",
    desc: <>
      Активисты экологического объединения <ExternalLink to="https://vk.com/regreen_polytech">ReGreen</ExternalLink> совместно с руководством СПбПУ разработали и внедрили систему раздельного сбора отходов (РСО) на территории университета.
     <p> Контейнеры уже установленны и функционируют! </p>
    </>,
    bottom: <>
      Сайт разработан инициативной группой студентов в рамках дисциплины "Основы проектной деятельности".
    </>
  }
    // bottom: <>
    //   Исходный код на <ExternalLink to="https://github.com/the-sociophobic/recycle-polytech">github.com</ExternalLink>
    // </>
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
          Карта раздельного сбора
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
