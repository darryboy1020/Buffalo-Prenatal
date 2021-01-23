import React, { useRef } from 'react'
import Image from '../components/Image'
import ArticleWithImage from '../components/ArticleWithImage'
import NavScroll from '../components/NavScroll'
import NaviBar from '../components/Navibar'
import BackdropSite from '../components/BackdropSite'
import Testimonials from '../components/Testimonials'
import InfoBox from '../components/InfoBox'
import SurverFrom from '../components/SurveyForm'
import SurverForm from '../components/SurveyForm'

const ContentLoader = ({ yaml }) => {
  const { content } = yaml

  const testRef = useRef(null)
  const contactRef2 = useRef(null)

  const navScrollProps = {
    items: [
      {
        text: 'Testominials',
        executeScroll: () => {
          testRef.current.scrollIntoView({ behavior: 'smooth' })
        },
      },
      {
        text: 'Contact us',
        executeScroll: () =>
          contactRef2.current.scrollIntoView({ behavior: 'smooth' }),
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
              <div ref={testRef} key={`${componentProps}-${index}`}>
                <Testimonials {...componentProps} />
              </div>
            )
          case 'articleWithImage':
            return (
              <ArticleWithImage
                key={`${componentProps}-${index}`}
                {...componentProps}
              />
            )
          case 'navScroll':
            return (
              <NavScroll
                key={`${componentProps}-${index}`}
                {...navScrollProps}
              />
            )
          case 'infoBox':
            return (
              <InfoBox key={`${componentProps}-${index}`} {...componentProps} />
            )
          case 'surveyForm':
            return (
              <SurverForm
                key={`${componentProps}-${index}`}
                {...componentProps}
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
