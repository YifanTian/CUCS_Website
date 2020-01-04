import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../../Auth';
import axios from 'axios';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    console.log(auth0Client.getProfile().name);
    this.state = {
      disabled: false,
      major: '',
      description: '',
      name: '',
      grade: '',
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateName() {
    console.log('updateName');
    this.setState({
      name: auth0Client.getProfile().name,
    });
  }

  updateMajor(value) {
    this.setState({
      major: value,
    });
  }

  async submit() {
    this.updateName();
    
    this.setState({
      disabled: true,
    });

    // console.log('this.state.name',auth0Client.getProfile().name);
    var use_name = 'guest';
    if(auth0Client.isAuthenticated()) {
      console.log(auth0Client.getProfile().name);
      use_name = auth0Client.getProfile().name;
    }
    // auth0Client.isAuthenticated() && console.log(auth0Client.getProfile().name);

    await axios.post('http://localhost:8081/api/profiles', {
      name: use_name,
      major: this.state.major,
      grade: "first year",
      description: this.state.description,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/profiles');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Profile</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Major:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateMajor(e.target.value)}}
                    className="form-control"
                    placeholder="Give your question a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewQuestion);
