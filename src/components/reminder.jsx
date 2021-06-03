import React, { useState } from 'react'
import useSound from 'use-sound';
import link from './sound.mp3';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SnoozeIcon from '@material-ui/icons/Snooze';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import MusicNoteIcon from '@material-ui/icons/MusicNote';



function Reminder ()
{
    // var data;
    const [ data, setData] = useState("")
    //audio file
    const [play] = useSound(link);
    //display
    const [display , setDisplay] =useState(false);
    //snooze
    const[snooze, setSnoozeTime] = useState(0)
    //set difference time 
    const[diff, setDiff] = useState();

    function setAlarm(event){
        setData(event.target.value);
        console.log(data) 
        return;
    }
    function set(){
    //     if(isNaN(data)){
    //         alert('Invalid data')
    //    } 
        
       setDisplay(true);
       var alarm = new Date(data);
      
       var current = new Date();
      

       var difference = alarm.getTime() - current.getTime() ;
       setDiff(difference);
       console.log("set time ",alarm.getTime() );
       console.log("current time", current.getTime())
       console.log("difference ", alarm.getTime() - current.getTime())
       setTimeout(function initAlarm(){
        console.log(diff)
        play()
    } , difference)
   
    }
    
   

    function setTime(){
        var fiveMin= 300000;
        setSnoozeTime(fiveMin)
        
    }
    function getAddress(event){
        console.log(event.target.value)
    }
    

    return <div>
    <input type="datetime-local" id="alarm" onChange={setAlarm}></input>
    <button onClick={set}>Set</button>
    <p>Alarm of {data} is set!</p>
    <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
  <Button><AlarmOffIcon/></Button>
  <Button> <MusicNoteIcon/></Button>
  <input type="file" accept=".mp3,audio*" onChange={getAddress}/>
  <Button onClic={setTime}><SnoozeIcon/></Button>
</ButtonGroup>
    </div>

 
}

export default Reminder;