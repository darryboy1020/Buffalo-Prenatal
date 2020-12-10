import React from 'react'
import DemoComponent from './components/DemoComponent'
import ContentLoader from './pages/ContentLoader'

const App = () => {
  const prop = {
    title: 'Issa Title',
    description: 'YERRRRRRRR',
  }
  return (
    <div>
      <h1>Hello World!</h1>
      <DemoComponent {...prop} />
      <ContentLoader />
    </div>
  )
}

export default App
