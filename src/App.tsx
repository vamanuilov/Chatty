import { BrowserRouter as Router } from 'react-router-dom'

import './App.scss'
import Routes from './routes'

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
