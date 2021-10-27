/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { validatePageAccess } from '../utils/index'
import Hall from './Hall'
import Kitchen from './Kitchen'
import Login from './Login'
import Register from './Register'

const PrivateRoute = ({ Component, path, pageName }) => {
  const hasAccess = validatePageAccess(pageName)

  return (
    <>
      {hasAccess && (
        <Route exact path={path}>
          <Component />
        </Route>
      )}
      {!hasAccess && (
        <Route
          exact
          render={(props) => (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )}
        />
      )}
    </>
  )
}

PrivateRoute.propTypes = {
  Component: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/Register' component={Register} />
      <PrivateRoute exact path='/Hall' component={Hall} pageName='Hall' />
      <PrivateRoute
        exact
        path='/Kitchen'
        component={Kitchen}
        pageName='Kitchen'
      />
      <Route component={() => <div>Page 404!</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
