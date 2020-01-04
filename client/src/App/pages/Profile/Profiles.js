import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import auth0Client from '../../Auth';

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: null,
    };
  }

  async componentDidMount() {
    // const res = await axios.get('/api/profile');
    // const alt_profiles = (await axios.get('/api/profile')).data;
    // console.log('alt_profiles: ', alt_profiles);

    const profiles = (await axios.get('http://localhost:8081/api/profiles')).data;
    this.setState({
      profiles,
    });
  }

  render() {
    {auth0Client.isAuthenticated() && console.log(auth0Client.getProfile().name);}
    console.log(this.state.profiles);
    return (
      <div className="container">
        <div className="row">
          {auth0Client.isAuthenticated() && this.state.profiles && this.state.profiles.filter(profile => profile.name === auth0Client.getProfile().name).length === 0 &&
            <Link to="/new-profile">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-header">Do not have a profile?</div>
                <div className="card-body">
                  <h4 className="card-title">+ New Profile</h4>
                  <p className="card-text">Don't worry. Click here!</p>
                </div>
              </div>
              <div class="divider"></div>
            </Link>}
          </div>
         
            <span>
              <label>
              <input type="checkbox" checked={this.state.doFilter} onChange={this.handleCheckboxChange}/>
              <span>用课程筛选</span>
              </label>
              <input value={this.state.courseFilter} onChange={e => this.updateCourseFilter(e.target.value)} placeholder="e.g. ICS31"></input>
            </span>

            <span>
              <label>
              <input type="checkbox" checked={this.state.doFilter} onChange={this.handleCheckboxChange}/>
              <span>可内推</span>
              </label>
            </span>
            <div class="divider"></div>
            <p></p>

          {this.state.profiles === null && <p>Loading profiles...</p>}
          {
            this.state.profiles && this.state.profiles.map(profile => (
              <div key={profile.id} className="col-sm-6 col-md-12 col-lg-12">
                <Link to={`/profile/${profile._id}`}>
                  {/* <div className="card text-white bg-success mb-3">
                    <div className="card-header">Name: {profile.name}</div>
                    <div className="card-body">
                      <h4 className="card-title">{profile.major}</h4>
                      <p className="card-text">Year: {profile.grade}</p>
                      <p className="card-text">{profile.description}</p>
                    </div>
                  </div> */}
                  <div className='profile bg-light'>
                  <div className="row col s12">
                  <h5 className="card-title col s4">{profile.name}</h5>
                      {/* <div className="card-body"> */}
                        {/* <p className="card-text">Owner: {question.name}</p>
                        <p className="card-text">{question.description}</p>
                        <div className="card-header">Answers: {question.answers}</div> */}
                        <h5 className="card-title col s4 ">Major: {profile.major}</h5>
                        {/* <p className="col-sm-4">{question.description}</p> */}
                        <h5 className="card-title col s4">Year: {profile.grade}</h5>
                      {/* </div> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
    )
  }
}

export default  withRouter(Profiles);
