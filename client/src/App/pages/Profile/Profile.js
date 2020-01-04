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

    console.log('profile: ',this.state);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount');
    await this.refreshProfile();
  }

  async refreshProfile() {
    const { match: { params } } = this.props;
    console.log('params: ',params);
    const profile = (await axios.get(`http://localhost:8081/profile/${params.profileId}`)).data;
    console.log('profile: ',profile);
    this.setState({
        profile,
    });
  }

  async deleteProfile() {
    console.log('try to delete profile');
    console.log(`try to delete profile of ${this.state.profile._id}`);
    await axios.delete(`http://localhost:8081/profiles/${this.state.profile._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshProfile();
  }

  render() {
    const {profile} = this.state;
    console.log('profile: ',profile);
    if (profile === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{profile.major}</h1>
            <p className="lead">Grade: {profile.grade}</p>
            <p className="lead">{profile.description}</p>
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
