import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      doFilter: true,
      courseFilter: '',
    };


  }

  // updateFilter(value) {
  //   this.setState({
  //     doFilter: value,
  //   });
  // }

  // handleCheckboxChange = event =>
  // this.setState({ doFilter: event.target.checked })

  updateCourseFilter(value) {
    this.setState({
      courseFilter: value,
    });
  }

  async componentDidMount() {
    const questions = (await axios.get('/api/posts')).data;
    this.setState({
      questions,
    });
  }

  // const [doFilter, setFilter] = useState(false);
  // const [skill4Filter, setSkill4Filter] = useState('');

  render() {
    return (
      <div className="container">
      <div class="section">

        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">交换课程? 列在这儿!</div>
              <div className="card-body">
                <h4 className="card-title">+ 添加新课程</h4>
              </div>
            </div>
          </Link>
          </div>
          </div>

          {this.state.questions === null && <p>加载课程...</p>}
          <span>
              {/* <label>
              <input type="checkbox" checked={this.state.doFilter} onChange={this.handleCheckboxChange}/>
              <span>筛选课程</span>
              </label> */}
              {/* <p>筛选课程</p> */}
              <span>筛选课程:</span>
              <input value={this.state.courseFilter} onChange={e => this.updateCourseFilter(e.target.value)} placeholder="e.g. ICS31"></input>
            </span>
            <p></p>
            <p></p>
          {/* <div class="divider"></div> */}

            <table class="striped highlight centered responsive-table">
              <thead>
                <tr>
                    <th>课程</th>
                    <th>发帖人</th>
                    <th>联系方式</th>
                    <th>详细信息</th>
                </tr>
              </thead>
              {this.state.profiles === null && <p>Loading profiles...</p>}
              <tbody>

          {
            this.state.questions? (!this.state.doFilter? (this.state.questions.map(question => (
                
                <tr>
                  <td>{question.title}</td>  
                  <td> {question.name}</td>
                  <td>{question.description}</td>
                  <Link to={`/question/${question._id}`}>
                    <td>查看帖子</td>
                  </Link>
                </tr>
                
            ))) : (
                this.state.questions.filter(question => question.title.includes(this.state.courseFilter.toUpperCase())).map(question => (
                  <tr>
                    <td>{question.title}</td>       
                    <td> {question.name}</td>
                    <td>{question.description}</td>
                    <Link to={`/question/${question._id}`}>
                      <td>查看帖子</td>
                    </Link>     
                  </tr>    
                  
                ))
              )
          ) : (
            <h4>No profiles found...</h4>
          )}


              {/* {
                this.state.questions && this.state.questions.map(question => (
                  <tr>
                    <Link to={`/question/${question._id}`}>
                    <td>{question.title}</td>
                    </Link>
                    <td>{question.name}</td>
                    <td>{question.description}</td>
                  </tr>
                ))
              } */}
              </tbody>
            </table>

          {/* {
            this.state.questions? (!this.state.doFilter? (this.state.questions.map(question => (
              <div key={question._id} className="col-sm-6 col-md-12 col-lg-12">
                <Link to={`/question/${question._id}`}>
                  <div className='profile bg-light'>
                  <div className="row col s12">
                  <h6 className="card-title col s3">课程: {question.title}</h6>
                        <h6 className="card-title col s3 ">发帖人: {question.name}</h6>
                        <h6 className="card-title col s3">联系方式: {question.description}</h6>
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
                    <h5 className="card-title col s3">{question.title}</h5>
                          <h5 className="card-title col s3 ">Owner: {question.name}</h5>
                          <h5 className="card-title col s3">Reply: {question.answers.length}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
                ))
              )
          ) : (
            <h4>No profiles found...</h4>
          )} */}
        </div>
    )
  }
}

export default Questions;
