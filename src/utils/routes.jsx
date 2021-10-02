import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import isAuthenticated from './authentication'
import Hall from '../pages/Hall/index'
import Kitchen from '../pages/Kitchen/index'
import Login from '../pages/Login/index'
import Register from '../pages/Register/index'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/Register' component={Register} />
      <PrivateRoute exact path='/Hall' component={Hall} />
      <PrivateRoute exact path='/Kitchen' component={Kitchen} />
      <Route component={() => <div>Page 404!</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
