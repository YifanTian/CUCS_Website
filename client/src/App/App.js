import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import NavBar from './pages/NavBar';
import Landing from './pages/Landing';
import Reviews from './pages/Reviews';
import Callback from './Callback';

import 'materialize-css/dist/css/materialize.min.css';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/reviews' component={Reviews}/>
          <Route exact path='/callback' component={Callback}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
