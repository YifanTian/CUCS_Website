import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import auth0Client from './Auth';
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import Landing from './pages/Landing';
import Reviews from './pages/Reviews';
import RateCourse from './pages/RateCourse';
import Question from './pages/Question/Question';
import Questions from './pages/Question/Questions';
import Profile from './pages/Profile/Profile';
import Profiles from './pages/Profile/Profiles';
import Calender from './pages/Event/Calender';
import NewQuestion from './pages/Question/NewQuestion';
import NewProfile from './pages/Profile/NewProfile';
import Dashboard from './pages/Dashboard/Dashboard';
import SecuredRoute from './pages/SecuredRoute/SecuredRoute';
import Callback from './Callback';

import 'materialize-css/dist/css/materialize.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    const App = () => (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/questions' component={Questions} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/calender' component={Calender} />
          <Route exact path='/reviews' component={Reviews} />
          <Route exact path='/ratecourse' component={RateCourse} />
          <Route exact path='/question/:questionId' component={Question} />
          <Route exact path='/profile/:profileId' component={Profile} />
          <Route exact path='/callback' component={Callback} />
          <SecuredRoute path='/new-question'
            component={NewQuestion}
            checkingSession={this.state.checkingSession} />
          <SecuredRoute path='/new-profile'
            component={NewProfile}
            checkingSession={this.state.checkingSession} />
          </Switch>
        <Footer />
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default withRouter(App);
