import React from 'react'
import ContentLoader from './pages/ContentLoader'
import { HOME_YAML, SURVEY_YAML } from './pages/PageNames'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route
            path='/survey'
            render={(props) => <ContentLoader yaml={SURVEY_YAML} {...props} />}
          />
          <Route
            path='/'
            exact
            render={(props) => <ContentLoader yaml={HOME_YAML} {...props} />}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
