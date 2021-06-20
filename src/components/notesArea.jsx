import React, { useState } from 'react'
import MakeNote from "./createNote"
import Notes from "./Note"
import Axios from 'axios';
import { AddCircle , AddCircleOutline } from '@material-ui/icons'

 function NotesArea(proc) {
     proc.checkLogin(true);
    const [data,setData]=useState([])

    function getData(Ndata){
    console.log("bew data:"+Ndata);

  
    console.log(Ndata.reminder);
    setData(prev=>{
      
      Axios.post("/notes/create", Ndata).then(data => {
        console.log("data:"+data);
    }).catch(e => {
           console.log("error:");
           console.log(e);
        });
      return [ ...prev,Ndata]
    })}
    
    function deleteItem(id){
      console.log("delet is added")
    setData(prev =>{
      return prev.filter((item,index) =>{
        return index!=id
      })
    })
    
      }
    return (
        <div className="notesAreaDiv">
      
      <MakeNote callData={getData} />
     { data.map( (getnote,getindex) =>{
        return <Notes key={getindex} id={getindex} title={getnote.title} content={getnote.content} reminder={getnote.reminder} onDelete={deleteItem}/>})
     }
        </div>
    )
}

export default NotesArea;
