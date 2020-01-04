import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }));

class RateCourse extends Component {
  //  classes = useStyles();

  // toggle = index => {
  //   let collapse = "isOpen" + index;

  //   this.setState(prevState => ({ [collapse]: !prevState[collapse] }));
  // };

  // console.log(auth0Client.getProfile().name);
  render() {
    return (
      
      <div className="container">
      <h2 className="center">课程测评</h2>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography > <h5>ICS31 </h5> <p class="bold-text">Professor: David G. Kay</p></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
              内容：学习Python语言
              <hr/>

              <p class="blue-text">难易程度: ★</p>
              <p>先修课目：无</p>
              <p> TA: Yadhu Prakash TA给所负责Lab的全部Project判分，很宽松 </p>
              <p> Lab: 去lab写program的话可以和小伙伴一起写，课程建议组队，有问题也可以问Tutor或TA，但我没怎么去过。。。</p>

              <p> Piazza: 有 </p>
              <p> Textbook: Introduction to Computing Using Python在网上有电子版资源（其实不看也没关系，看了有助于巩固基础）

              Rate my professor 评分: 4.3 http://www.ratemyprofessors.com/ShowRatings.jsp?tid=105043
              这个老师人非常好，和蔼可亲，教学大纲清晰，再加上课程不难，大家对他印象都很好。要说唯一可能能改进的地方是上课时间打代码多过讲解，但对于一个编程课来说也是很正常的。 </p>

              <hr/>
              <p> Grading Criteria:  </p>
              <p>· Lab Assignments (30%) 
              10次weekly lab assignments，都是可以找搭档一起完成的，但是搭档不可以重复！ </p>

              <p>· Weekly Quizzes (10%) </p>
              These quizzes are given online through EEE. These quizzes are self-graded and you will receive credit for simply completing them (we won't check the correctness of your answers). The purpose of these quizzes is to help students keep up with the pace of the class. It's also used to help prepare you for the exams.
              这10%基本白送。
              <p>· Class Participation (10%) 

              This grade is based on participating in lab and working diligently with your partner. Contributing to Piazza posts can also help your grade in this category. 
              这10%也基本是白送。</p>

              <p>· Two midterms (20% total) 
              都有sample，老师会提供，网上也很好找到，套路一样多做几份没啥问题。 </p>

              <p>· One final exam (30%)  </p>
              <hr/>
              <p> Comment: </p>

              这节课对于之前没学过编程的人有难度，但即使没学过拿A也不困难。
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography ><h5>ICS32 </h5></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography >Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel> */}
    </div>
  );
}
}

export default RateCourse;
