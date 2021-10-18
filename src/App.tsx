import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import './App.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
