import { observer } from 'mobx-react-lite'
import { Switch, Route, Redirect } from 'react-router-dom'

import { publicRoutes, privateRoutes } from './endpoints'

import user from '../store/user'

const Routes: React.FC = () => {
  const wsConnectKey = user.wsConnectKey

  if (wsConnectKey) {
    return (
      <Switch>
        {privateRoutes.map((route) => (
          <Route key={route.id} exact={route.exact} path={route.path} component={route.component} />
        ))}
        <Redirect to="/messages" />
      </Switch>
    )
  }

  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route key={route.id} exact={route.exact} path={route.path} component={route.component} />
      ))}
      <Redirect to="/login" />
    </Switch>
  )
}

export default observer(Routes)
