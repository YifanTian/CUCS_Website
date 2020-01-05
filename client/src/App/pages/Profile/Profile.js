import React, {Component} from 'react';
import axios from 'axios';
// import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../../Auth';
import DeleteProfile from './DeleteProfile'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };

    this.deleteProfile = this.deleteProfile.bind(this);
  }

  async componentDidMount() {
    await this.refreshProfile();
  }

  async refreshProfile() {
    const { match: { params } } = this.props;
    const profile = (await axios.get(`http://localhost:8081/api/profiles/${params.profileId}`)).data;
    this.setState({
        profile,
    });
  }

  async deleteProfile() {
    await axios.delete(`http://localhost:8081/api/profiles/${this.state.profile._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshProfile();
  }

  render() {
    const {profile} = this.state;
    if (profile === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{profile.name}</h1>
            <p className="lead">专业: {profile.major}</p>
            <p className="lead">年级: {profile.grade}</p>
            <p className="lead">LinkedIn: {profile.description}</p>
            <hr className="my-4" />
            {/* <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} /> */}
            {/* <p>Answers:</p>
            {
              question.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            } */}
              {auth0Client.isAuthenticated() && profile.name === auth0Client.getProfile().name && <DeleteProfile deleteProfile={this.deleteProfile}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
