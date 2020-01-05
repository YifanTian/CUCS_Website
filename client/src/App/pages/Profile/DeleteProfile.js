import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../../Auth';

class DeleteProfile extends Component {
  constructor(props) {
    super(props);
  }

  submit() {
    this.props.deleteProfile();
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <button
          className="btn red btn-primary"
          onClick={() => {this.submit()}}>
          delete my profile
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(DeleteProfile);
