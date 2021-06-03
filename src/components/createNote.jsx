import React, { useState } from "react";
import Note from "./Note";
import PostAddIcon from '@material-ui/icons/PostAdd';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';




function CreateArea(proc) {

const [data, setData] =useState({
   title: "",
   content : ""

})

const [display,setDisplay] = useState(false)
const [rowValue, setRowValue] = useState(1)

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
            content : "" 
          })

    event.preventDefault()
}

function increaseSize(){
    setDisplay(true)
}

  return (
    <div>
      <form className="create-note">
       { display?<input name="title"onChange={makeChange} placeholder="Heading" value={data.title} /> :""}
        <textarea name="content" onClick={increaseSize} onChange={makeChange} value ={data.content} placeholder="Discription..." rows={rowValue} />
        <Zoom in= {display}>
        <Fab type="submit" onClick={submitData}><PostAddIcon/></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;