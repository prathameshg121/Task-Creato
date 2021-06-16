import React, { useState } from "react";
import Note from "./Note";
import PostAddIcon from '@material-ui/icons/PostAdd';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import Reminder from "./reminder";


function CreateArea(proc) {
 
   

const [data, setData] =useState({
   title: "",
   content : "",
   reminder : "",
})

const [display,setDisplay] = useState(false)
const [rowValue, setRowValue] = useState(1)
const [showReminder ,setReminder] = useState(false);

function makeChange(event){
    const {name, value}=event.target;
    setRowValue(3)

    setData(preNote=>{
        return{
            ...preNote,
            [name]:value
        }

    })
}

function submitData(event){
 
          proc.callData(data)

          setData({
            title: "",
            content : "" ,
            reminder : ""
          })

    event.preventDefault()
}

function increaseSize(){
    setDisplay(true)
}

function reminder (timeData){
  console.log("this is from create note" +timeData);
  setData(preNote=>{
    return{
        ...preNote,
        reminder : timeData
    }

})
}
  return (
    <div  className="notesAreaDiv">
    <h3 >Add Note</h3>
      <form className="create-note">
       { display?<input name="title"onChange={makeChange} placeholder="Heading" value={data.title} /> :""}
        <textarea name="content" onClick={increaseSize} onChange={makeChange} value ={data.content} placeholder="Discription..." rows={rowValue} />
        
       
     
        <Zoom in= {display}>
        <div>
        <Fab  onClick={()=>{setReminder(!showReminder)}} ><AddAlertOutlinedIcon/> </Fab>
        <Fab type="submit" onClick={submitData}><PostAddIcon/>  </Fab>
        </div>
        </Zoom>
      </form>
      {showReminder? <Reminder getTimeData = {reminder} /> : ""}
    </div>
  );
}

export default CreateArea;