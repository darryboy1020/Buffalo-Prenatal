import React from 'react'
import YAMLData from '../../content/content.yaml'
import DemoComponent from '../components/DemoComponent'
import NavBar from '../components/NavBar'

const ContentLoader = () => {
  const { content } = YAMLData

  return (
    <div>
      {content.map(({ component, ...componentProps }, index) => {
        switch (component) {
          case 'navBar':
            return (
              <NavBar key={`${componentProps}-${index}`} {...componentProps} />
            )
          case 'demoComponent':
            return (
              <DemoComponent
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
