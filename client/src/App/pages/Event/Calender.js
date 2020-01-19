import React from 'react';
import {Link, withRouter} from 'react-router-dom';
// Import Materialize
import M from "materialize-css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
 
import events from './events'

import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)





function Landing(props) {
  console.log('events: ',events);
  return (
    <div class="container">
    <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{height: 500}}
    />
  </div>  
  </div>  
  );
}

export default Landing;
