import React, { useState } from 'react'
import MakeNote from "./createNote"
import Notes from "./Note"
import Axios from 'axios';

 function NotesArea() {
    const [data,setData]=useState([])

    function getData(Ndata){
    console.log("bew data:"+Ndata);

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
        <div>
      <MakeNote callData={getData} />
     { data.map( (getnote,getindex) =>{
        return <Notes key={getindex} id={getindex} title={getnote.title} content={getnote.content} onDelete={deleteItem}/>})
     }
        </div>
    )
}

export default NotesArea;
