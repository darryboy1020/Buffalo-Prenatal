import React, { useRef } from 'react'
import YAMLData from '../../content/content.yaml'
import Image from '../components/Image'
import ArticleWithImage from '../components/ArticleWithImage'
import NavScroll from '../components/NavScroll'
import NaviBar from '../components/Navibar'
import BackdropSite from '../components/BackdropSite'
import Testimonials from '../components/Testimonials'

const ContentLoader = () => {
  const { content } = YAMLData

  const testRef = useRef(null)
  const testRef2 = useRef(null)

  const navScrollProps = {
    items: [
      {
        text: 'Take the survey',
        executeScroll: () => {
          testRef.current.scrollIntoView({ behavior: 'smooth' })
        },
      },
      {
        text: 'Learn More',
        executeScroll: () =>
          testRef2.current.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        text: 'Learn More',
        executeScroll: () =>
          testRef2.current.scrollIntoView({ behavior: 'smooth' }),
      },
    ],
  }

  return (
    <div>
      {content.map(({ component, ...componentProps }, index) => {
        switch (component) {
          case 'naviBar':
            return (
              <NaviBar key={`${componentProps}-${index}`} {...componentProps} />
            )
          case 'image':
            return (
              <Image key={`${componentProps}-${index}`} {...componentProps} />
            )
          case 'backdropSite':
            return (
              <BackdropSite
                key={`${componentProps}-${index}`}
                {...componentProps}
              />
            )
          case 'testimonials':
            return (
              <Testimonials
                key={`${componentProps}-${index}`}
                {...componentProps}
              />
            )
          case 'articleWithImage':
            return (
              <div ref={testRef2} key={`${componentProps}-${index}`}>
                <ArticleWithImage
                  key={`${componentProps}-${index}`}
                  {...componentProps}
                />
              </div>
            )
          case 'navScroll':
            return (
              <NavScroll
                key={`${componentProps}-${index}`}
                {...navScrollProps}
              />
            )
          default:
            return (
              <p key={`${componentProps}-${index}`}>
                component not found: {component}
              </p>
            )
        }
      })}
    </div>
  )
}
export default ContentLoader
