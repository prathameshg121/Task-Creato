import React, { useState } from "react";
import useSound from "use-sound";
import link from "../music/sound.mp3";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

function Reminder(proc) {
  // var data;
  const [data, setData] = useState("");
  //audio file
  const [play] = useSound(link);
  //display
  const [display, setDisplay] = useState(false);
  //snooze
  const [snooze, setSnoozeTime] = useState(0);
  //set difference time
  const [diff, setDiff] = useState();

  function setAlarm(event) {
    setData(event.target.value);
    console.log(data);
    return;
  }
  function set(event) {
    //     if(isNaN(data)){
    //         alert('Invalid data')
    //    }

    setDisplay(true);
    var alarm = new Date(data);

    var current = new Date();

    var difference = alarm.getTime() - current.getTime();
    setDiff(difference);
    console.log("set time ", alarm.getTime());
    console.log("current time", current.getTime());
    console.log("difference ", alarm.getTime() - current.getTime());
    if (isNaN(difference)) {
      console.log("IT not valid input");
    } else if (difference < 0) {
      console.log("Time is alrey passed");
    } else {
      setTimeout(function initAlarm() {
        console.log(diff);
        play();
        if (Notification.permission === "granted") {
          prompNotification();
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              prompNotification();
            }
          });
        }
      }, difference);
    }
    //   proc.getTimeData(data);
    event.preventDefault();
  }

  //Notification
  Notification.requestPermission();
  function prompNotification() {
    const notify = new Notification("Reminder", {
      body: data + " your Reminder",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHo1oJF_JcPs69Hv6EE0mJNxvEeK_Cgef6St-ubhI5KsCwxt_MHSmAx2m8PkQ2s4qXwbg&usqp=CAU",
    });
  }

  function setTime() {
    var fiveMin = 300000;
    setSnoozeTime(fiveMin);
  }
  function getAddress(event) {
    console.log(event.target.value);
  }

  return (
    <div>
      <input type="datetime-local" id="alarm" onChange={setAlarm}></input>
      <button onClick={set}>Set</button>
      <p>Alarm of {data} is set!</p>
      {/* <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
  <Button> <MusicNoteIcon/></Button>
  <input type="file" accept=".mp3,audio*" onChange={getAddress}/>
  <Button onClic={setTime}><SnoozeIcon/></Button>
</ButtonGroup> */}
    </div>
  );
}

export default Reminder;
