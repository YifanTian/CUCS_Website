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
//     await axios.delete(`http://localhost:8081/posts/${postId}`);

//     dispatch({
//       type: 'DELETE_POST',
//       payload: postId
//     });

//     // dispatch(setAlert('Post Removed', 'success'));
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
    console.log('params.questionId: ',params.questionId);
    const question = (await axios.get(`/api/posts/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`/api/posts/answer/${this.state.question._id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }

  async deletePost() {
    await axios.delete(`/api/posts/${this.state.question._id}`, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }

  render() {    
    const {question} = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h2 className="display-3">课程:{question.title}</h2>
            <p className="lead">发帖人: {question.name}</p>
            <p className="lead">联系方式: {question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer questionId={question._id} submitAnswer={this.submitAnswer} />
            {
              question.answers.map((answer, idx) => (
                <div class="row">
                  <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title">评论者: {answer.author}</span>
                        <p>评论: {answer.answer}</p>
                      </div>
                    </div>
                  </div>
                </div> 
              ))
            }
            <h1></h1>
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
