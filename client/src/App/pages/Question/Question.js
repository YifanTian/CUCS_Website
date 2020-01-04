import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import DeletePost from './DeletePost';
import auth0Client from '../../Auth';
// import {setAlert} from './alert';

// async deletePost(postId) {

// }

// const deletePost = postId => async dispatch => {
//   try {
//     console.log(`try to delete post of ${postId}`);
//     await axios.delete(`http://localhost:8081/posts/${postId}`);

//     dispatch({
//       type: 'DELETE_POST',
//       payload: postId
//     });

//     // dispatch(setAlert('Post Removed', 'success'));
//     console.log('Post Removed success');
//   } catch (err) {
//     dispatch({
//       type: 'POST_ERROR',
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`http://localhost:8081/posts/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }

  async deletePost() {
    console.log(`try to delete post of ${this.state.question._id}`);
    await axios.delete(`http://localhost:8081/posts/${this.state.question._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }

  render() {
    // const {curr_profile} = auth0Client.getProfile();
    // console.log(typeof curr_profile);
    auth0Client.isAuthenticated() && console.log(auth0Client.getProfile().name);
    
    const {question} = this.state;
    console.log(this.state);
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            {/* <p className="lead">Owner: {question.name}</p> */}
            {/* <label className="mr-2 text-white">{auth0Client.getProfile().name}</label> */}
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer questionId={question._id} submitAnswer={this.submitAnswer} />
            <p>Answers:</p>
            {
              question.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
            {/* {auth0Client.isAuthenticated() && ( */}
            {/* <button
              onClick={() => deletePost(question.id)}
              type='button'
              className='btn btn-danger'
            > delete post
              <i className='fas fa-times' />
            </button> */}
            {auth0Client.isAuthenticated() && question.name === auth0Client.getProfile().name && <DeletePost deletePost={this.deletePost}/>}
          {/* )} */}
          </div>
        </div>
      </div>
    )
  }
}

export default Question;
