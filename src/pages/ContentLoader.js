import React from 'react'
import YAMLData from '../../content/content.yaml'
import DemoComponent from '../components/DemoComponent'
import NavBar from '../components/NavBar'
import Image from '../components/Image'
import NaviBar from '../components/Navibar'
import BackdropSite from '../components/BackdropSite'
import Testimonials from '../components/Testimonials'

const ContentLoader = () => {
  const { content } = YAMLData

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
