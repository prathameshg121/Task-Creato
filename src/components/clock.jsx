import React, { useState } from 'react';
import AlarmAddTwoToneIcon from '@material-ui/icons/AlarmAddTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import Reminder from './reminder.jsx'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import TodayIcon from '@material-ui/icons/Today';



function Clock(){
    const [display,setDisplay] = useState(false)
    const [displayDate, setDisplayDate] =useState(false)
    let time = new Date().toLocaleTimeString();
    var [t, refresh] = useState(time);
    function getTime() {
        let time = new Date().toLocaleTimeString();
        refresh(time);
      }
      function dynamic() {
        setInterval(getTime, 1000);
        // setDisplay(true);
      }
      if(1>0){
        dynamic();
    }

    var data = new Date();
    var date = data.getDate();
    var day = data.getDay();
    var month = data.getMonth();
    var year = data.getUTCFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const days = ["Sundat","Monday","Tuesday","Wednusday","Thusday","Friday","Satday"];

function showAlarm(){
  setDisplay(true)
}
function showDate(){
  setDisplayDate(true)
}
  
      
    return <div className="clockArea" >
       <TodayIcon onClick={showDate}/>
       {displayDate?<h3>{date}  {monthNames[month]}  {year} {days[day]}</h3>:""}
       
       <hr></hr>
       <h1>{t} <AccessAlarmsIcon onClick={showAlarm}/></h1>
       {display?<Reminder/>:""}
       


    </div>
}

export default Clock;