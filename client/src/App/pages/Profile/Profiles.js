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
    const profiles = (await axios.get('http://localhost:8081/api/profiles')).data;
    this.setState({
      profiles,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {auth0Client.isAuthenticated() && this.state.profiles && this.state.profiles.filter(profile => profile.name === auth0Client.getProfile().name).length === 0 &&
            <Link to="/new-profile">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-header">还没有个人信息?</div>
                <div className="card-body">
                  <h4 className="card-title">+添加信息</h4>
                  <p className="card-text">别着急，点击这里!</p>
                </div>
              </div>
              <div class="divider"></div>
            </Link>}
          </div>
         
            {/* <span>
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
            </span> */}
            <div class="divider"></div>
            <p></p>

            <table class="striped highlight centered responsive-table">
              <thead>
                <tr>
                    <th>姓名</th>
                    <th>专业</th>
                    <th>年级</th>
                    <th>LinkedIn</th>
                </tr>
              </thead>
              {this.state.profiles === null && <p>Loading profiles...</p>}
              <tbody>
              {
                this.state.profiles && this.state.profiles.map(profile => (
                  <tr>
                    <Link to={`/profile/${profile._id}`}>
                    <td>{profile.name}</td>
                    </Link>
                    <td>{profile.major}</td>
                    <td>{profile.grade}</td>
                    <td><a href={profile.description}>链接</a></td>
                  </tr>
                ))
              }
              </tbody>
            </table>

          {/* {
            this.state.profiles && this.state.profiles.map(profile => (
              <div key={profile.id} className="col-sm-6 col-md-12 col-lg-12">
                <Link to={`/profile/${profile._id}`}>
                  <div className='profile bg-light'>
                  <div className="row col s12">
                  <h6 className="card-title col s4">姓名:{profile.name}</h6>
                        <h6 className="card-title col s4 ">在读/毕业: {profile.major}</h6>
                        <h6 className="card-title col s4">年级/公司: {profile.grade}</h6>
                        <h6 className="card-title col s4">LinkedIn</h6>
                        <h6 className="card-title col s4">联系方式: {profile.grade}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          } */}
        </div>
    )
  }
}

export default  withRouter(Profiles);
