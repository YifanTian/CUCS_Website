import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
// Import Materialize
import M from "materialize-css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cucs from '../../cucs.png'


function Landing(props) {
  return (
    // <div class="#e1bee7 purple lighten-4 ">
    <div class="container #e8f5e9 green lighten-5" styles={{ backgroundImage:`url(${cucs})` }}>
    
    <Carousel autoPlay showThumbs={false}>
    <div>
      {/* <img src="http://www.cucsuci.com/wp-content/uploads/2017/10/thumb_IMG_8524_1024.jpg" style={{background: url(`http://www.cucsuci.com/wp-content/uploads/2017/10/thumb_IMG_8524_1024.jpg`) no-repeat center; background-size: cover;}}/> */}
      <img src="http://www.cucsuci.com/wp-content/uploads/2017/10/thumb_IMG_8524_1024.jpg"/>
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
      <p className="legend">Legend 2</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
      <p className="legend">Legend 3</p>
    </div>
    <div>
      <img src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
      <p className="legend">Legend 4</p>
    </div>
  </Carousel> 

    {/* <h1 className="center"></h1> */}
    <div class="row">

      <div class="col s4">
          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                <span class="card-title">学习资料 </span>
                  <p>这里有各个课程的学习资料，有期末复习资料与project的学习资料</p>
                </div>
                <div class="card-action">
                  <a href="/reviews">开始学习</a>
                </div>
              </div>
            </div>
          </div>
      </div>
      
      <div class="col s4">
          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">课程测评</span>
                  <p>这里有各个课程的测评，包括课程介绍，对于任课教授的评价，和课程难度分析.</p>
                </div>
                <div class="card-action">
                  <a href="/ratecourse">查看测评</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col s4">
          <div class="row">
            <div class="col s12 m6">
              <div class="landing-card">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">换课系统</span>
                    <p>换课平台, 登录后添加管理换课的帖子，也可以对换课的帖子进行留言.</p>
                  </div>
                  <div class="card-action">
                    <a href="/questions">查看课程</a>
                    {/* <a href="#">This is a link</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col s4">
          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">校友系统</span>
                  <p>校友平台, 目前只有在读校友，将在未来添加毕业后校友。登录后可以添加管理自己的名片.</p>
                </div>
                <div class="card-action">
                  <a href="/profiles">查看校友</a>
                  {/* <a href="#">This is a link</a> */}
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
  </div>

  );
}

export default Landing;
