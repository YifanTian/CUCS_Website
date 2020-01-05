import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../../Auth';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">是否感兴趣?</label>
          <input
            type="text"
            onChange={(e) => {this.updateAnswer(e.target.value)}}
            className="form-control"
            placeholder="填下您的联系方式."
            value={this.state.answer}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {this.submit()}}>
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(SubmitAnswer);
