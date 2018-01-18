import React , { Component } from 'react'
import {  Switch,  Route} from 'react-router-dom'
import { withRouter } from 'react-router';
import {routes} from "../routing/routes"

class RouteSwitch extends Component {
  
  render() {
    const { location } = this.props
   
   //Using routing to easily scale the app
    return (
        <Switch location={location}>
          {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
          ))}
        </Switch>
    )
  }
}


RouteSwitch = withRouter(RouteSwitch);


export default RouteSwitch;