import React, { useState } from 'react'

function Reminder ()
{
    // var data;
    const [ data, setData] = useState("")
    function setAlarm(event){
        setData(event.target.value);
        console.log(data) 
        return;
    }
    function set(){
    //     if(isNaN(data)){
    //         alert('Invalid data')
    //    } 
 
       var alarm = new Date(data);
       var alarmTime = new Date(alarm.getMinutes(),alarm.getUTCSeconds())
       var current = new Date();
       var currenData =new Date(current.getMinutes(),current.getUTCSeconds())

       var difference = alarm.getTime() - current.getTime();
       console.log("set time ",alarm.getTime() );
       console.log("current time", current.getTime())
       console.log("difference ", alarm.getTime() - current.getTime())
       if(difference<0){
           alert("Time is already passed");
           return;
       }

       setTimeout(function initAlarm(){
        console.log(" time out")
    } , difference)
    }
    

    return <div>
    <input type="datetime-local" id="alarm" onChange={setAlarm}></input>
    <button onClick={set}>Set</button>
    </div>

 
}

export default Reminder;