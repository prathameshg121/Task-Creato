import React, { useState } from "react";
import Note from "./Note";




function CreateArea(proc) {

const [data, setData] =useState({
   title: "",
   content : ""

})

function makeChange(event){
    const {name, value}=event.target;

    setData(preNote=>{
        return{
            ...preNote,
            [name]:value
        }

    })
}

function submitData(event){
          proc.callData(data)

    event.preventDefault()
}


  return (
    <div>
      <form >
        <input name="title"onChange={makeChange} placeholder="Title" value={data.title} />
        <textarea name="content" onChange={makeChange} value ={Note.content} placeholder="Take a note..." rows="3" />
        <button type="submit" onClick={submitData}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;