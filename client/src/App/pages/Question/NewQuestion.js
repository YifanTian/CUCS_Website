import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../../Auth';
import axios from 'axios';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      description: '',
      name: '',
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateName() {
    this.setState({
      name: auth0Client.getProfile().name,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    this.updateName();
    
    this.setState({
      disabled: true,
    });

    var use_name = 'guest';
    if(auth0Client.isAuthenticated()) {
      use_name = auth0Client.getProfile().name;
    }

    await axios.post('/api/posts', {
      id: 1,
      name: use_name,
      title: this.state.title,
      description: this.state.description,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/questions');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Question</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">课程:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateTitle(e.target.value)}}
                    className="form-control"
                    placeholder="例如:ICS 31."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">联系方式:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="邮箱或微信号."
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="exampleInputEmail1">介绍:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
                </div> */}
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
