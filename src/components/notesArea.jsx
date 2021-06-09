import React, { useState } from 'react'
import MakeNote from "./createNote"
import Notes from "./Note"

 function NotesArea() {
    const [data,setData]=useState([])

    function getData(Ndata){
    console.log(Ndata)
    setData(prev=>{
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
