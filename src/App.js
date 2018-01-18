import React, {Component} from 'react';
import { Router} from 'react-router-dom'
import RouteSwitch from './routing/RouteSwitch';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
          <RouteSwitch />
      </Router>    
    );
  }
}

export default App;

