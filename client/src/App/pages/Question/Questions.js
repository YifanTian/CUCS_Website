import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      doFilter: false,
      courseFilter: '',
    };


  }

  // updateFilter(value) {
  //   this.setState({
  //     doFilter: value,
  //   });
  // }

  handleCheckboxChange = event =>
  this.setState({ doFilter: event.target.checked })

  updateCourseFilter(value) {
    this.setState({
      courseFilter: value,
    });
  }

  async componentDidMount() {
    const questions = (await axios.get('http://localhost:8081/posts')).data;
    this.setState({
      questions,
    });
  }

  // const [doFilter, setFilter] = useState(false);
  // const [skill4Filter, setSkill4Filter] = useState('');

  render() {
    
    console.log(this.state.questions);
    return (
      <div className="container">
      <div class="section">

        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">交换课程? 列在这儿!</div>
              <div className="card-body">
                <h4 className="card-title">+ 添加新课程</h4>
                {/* <p className="card-text">Don't worry. Help is on the way!</p> */}
              </div>
            </div>
          </Link>
          </div>
          </div>
          
          {this.state.questions === null && <p>Loading questions...</p>}
            <span>
              <label>
              <input type="checkbox" checked={this.state.doFilter} onChange={this.handleCheckboxChange}/>
              <span>筛选课程</span>
              </label>
              <input value={this.state.courseFilter} onChange={e => this.updateCourseFilter(e.target.value)} placeholder="e.g. ICS31"></input>
            </span>
            <div class="divider"></div>
          {
            this.state.questions? (!this.state.doFilter? (this.state.questions.map(question => (
              <div key={question._id} className="col-sm-6 col-md-12 col-lg-12">
                <Link to={`/question/${question._id}`}>
                  <div className='profile bg-light'>
                  <div className="row col s12">
                  <h6 className="card-title col s4">课程: {question.title}</h6>
                      {/* <div className="card-body"> */}
                        {/* <p className="card-text">Owner: {question.name}</p>
                        <p className="card-text">{question.description}</p>
                        <div className="card-header">Answers: {question.answers}</div> */}
                        <h6 className="card-title col s4 ">发帖人: {question.name}</h6>
                        {/* <p className="col-sm-4">{question.description}</p> */}
                        <h6 className="card-title col s4">回复: {question.answers.length}</h6>
                      {/* </div> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))) : (
                this.state.questions.filter(question => question.title.includes(this.state.courseFilter.toUpperCase())).map(question => (
                  <div key={question._id} className="col-sm-6 col-md-12 col-lg-12">
                  <Link to={`/question/${question._id}`}>
                    <div className='profile bg-light'>
                    <div className="row col s12">
                    <h5 className="card-title col s4">{question.title}</h5>
                          <h5 className="card-title col s4 ">Owner: {question.name}</h5>
                          <h5 className="card-title col s4">Reply: {question.answers.length}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                ))
              )
          ) : (
            <h4>No profiles found...</h4>
          )}
        </div>
    )
  }
}

export default Questions;
