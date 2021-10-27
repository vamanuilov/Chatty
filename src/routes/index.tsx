import { Switch, Route } from 'react-router-dom'
import { publicRoutes } from './endpoints'

const Routes: React.FC = () => {
  return (
    <Switch>
      {publicRoutes.map((route, index) => (
        <Route key={index} exact={route.exact} path={route.path} component={route.component} />
      ))}
    </Switch>
  )
}

export default Routes
