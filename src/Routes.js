/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import isAuthenticated from './utils/index'
import Hall from './components/pages/Hall'
import Kitchen from './components/pages/Kitchen'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

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
