import React, { useState } from 'react';
import AlarmAddTwoToneIcon from '@material-ui/icons/AlarmAddTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';




function Clock(){
    const [display,setDisplay] = useState(false)
    let time = new Date().toLocaleTimeString();
    var [t, refresh] = useState(time);
    function getTime() {
        let time = new Date().toLocaleTimeString();
        refresh(time);
      }
      function dynamic() {
        setInterval(getTime, 1000);
        setDisplay(true);
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


  
      
    return <div className="clockArea" >
       <h3>{date}  {monthNames[month]}  {year}</h3>
       <h3>{days[day]}</h3>
       <AlarmAddTwoToneIcon className="Micon" onClick={dynamic}/>
       {display ? <h1>{t}</h1> : ""} 
       


    </div>
}

export default Clock;