import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Reviews extends Component {

  render() {
    var review_courses = [
      {
        id: 0,
        title: 'ICS31',
        professor: "Professor: David G. Kay",
        reviewLink: "https://drive.google.com/file/d/1OJwgIqs9TVycL8iHwRaFo0V_T4IqKLvI/view?usp=sharing" ,
      },
      {
        id: 1,
        title: 'ICS32',
        professor: "Professor: Alex Thornton",
        reviewLink: "https://docs.google.com/document/d/1kkQBry3EpjtVtQwjf6E4532wAZsadrR8JEF2kR7krIw/edit?usp=sharing" ,
      },
    ]

    return (
      
      <div className="container">
      <h2 className="center">学习资料</h2>

      {review_courses.map(course=> (
               <ExpansionPanel>
               <ExpansionPanelSummary
                 expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1a-content"
                 id="panel1a-header"
               >
                 <Typography > <h5>{course.title} </h5> <p class="bold-text">{course.professor}</p></Typography>
               </ExpansionPanelSummary>
               <ExpansionPanelDetails>
                 <Typography>
                 <a href="https://drive.google.com/file/d/1OJwgIqs9TVycL8iHwRaFo0V_T4IqKLvI/view?usp=sharing" class="secondary-content"><i class="material-icons">Review Session</i></a>
                 <br/>
                 <a href="https://mp.weixin.qq.com/s/kY_N3yq6r_5W85SlRPNSnA" class="secondary-content"><i class="material-icons">Project 1</i></a>
       
                 </Typography>
               </ExpansionPanelDetails>
        </ExpansionPanel>))}

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

export default Reviews;
