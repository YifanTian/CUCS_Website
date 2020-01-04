import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  // console.log(auth0Client.getProfile().name);
  return (
    // <nav className="navbar navbar-dark bg-primary fixed-top">
    <nav>
      {/* <Link className="navbar-brand" to="/"> Home </Link>
      <Link className="navbar-brand" to="/questions"> Q&App </Link>
      <Link className="navbar-brand" to="/profiles"> Profiles </Link>
      <Link className="navbar-brand" to="/reviews"> Reviews </Link> */}
      {/* {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      } */}

      <div class="nav-wrapper teal lighten-2">
        
        <a href="/" class="brand-logo"> 主页</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">

          {/* <li><a href="/">sass <span class="new badge">4</span></a></li> */}

          {
            !auth0Client.isAuthenticated() &&
            <div>
            
            <li><a href="/questions">交换课程</a></li>
            <li><a href="/profiles">校友系统</a></li>
            <li><a href="/reviews">学习资料</a></li>
            <li><a href="/ratecourse">课程测评</a></li>
            
            <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
            </div>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
              <li><a href="/questions">交换课程</a></li>
              <li><a href="/profiles">校友系统</a></li>
              <li><a href="/reviews">学习资料</a></li>
              <li><a href="/ratecourse">课程测评</a></li>
              <li> <a href="/dashboard">{auth0Client.getProfile().name}</a></li>
              <button className="btn green" onClick={() => {signOut()}}>Sign Out</button>
            </div>
          }

        </ul>
      </div>

    </nav>
  );
  
}

export default withRouter(NavBar);
