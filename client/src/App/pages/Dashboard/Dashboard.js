import React, {Component} from 'react';
import axios from 'axios';
// import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../../Auth';
import cucs from '../../../cucs.png'; // with import

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };

    // this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshProfile();
  }

  async refreshProfile() {
    const profile = (await axios.get(`/profiles`)).data;

    // const profile = (await axios.get(`http://localhost:8081/myprofile`, {
    //   headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    // })).data;

    this.setState({
        profile,
    });
  }

  render() {

    const {profile} = this.state;
    // if (profile === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="center">
          {/* profile */}
          <h4>如何换课</h4>
          <p> 进入换课系统，添加课程，查找</p>
          <img src={cucs} />
          </div>
          <div className="center">
          <h4>如何更新个人信息</h4>
          <p> 进入校友系统，添加个人信息，查找</p>
          <img src={cucs} />
        </div>
      </div>
    )
  }
}

export default Dashboard;
