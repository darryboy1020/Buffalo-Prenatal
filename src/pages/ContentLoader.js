import React from 'react'
import YAMLData from '../../content/content.yaml'
import DemoComponent from '../components/DemoComponent'
import { NavBar } from '../components/NavBar'

const ContentLoader = () => (
  <div>
    {YAMLData.content.map(({ component, ...componentProps }) => {
      // eslint-disable-next-line default-case
      switch (component) {
        case 'demoComponent':
          return (
            <DemoComponent key={`component${component}`} {...componentProps} />
          )
        case 'navBar':
          return <NavBar {...componentProps} />
      }
    })}
  </div>
)
export default ContentLoader
