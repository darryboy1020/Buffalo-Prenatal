import React from 'react';
import DemoComponent from './components/DemoComponent';

const App = () =>{

  const prop = {
    title: 'Issa Title',
    description: 'YERRRRRRRR'
  }
  return(
    <div>
      <h1>Hello World!</h1>
      <DemoComponent {...prop}/>
    </div>
  )
}

export default App;