import React, { useState } from "react"
import Heading from "./header"
import Footer from "./footer"
import Notes from "./Note.jsx"
import MakeNote from "./createNote"
import Signup from "./signup"
import NotesArea from "./notesArea"



   

function App() {

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
      <Heading />
      <Footer />
    </div>
  );
}

export default App 





















// function CreateNote(proc2){
//   return(<Notes
//   key={proc2.id}
//     heading ={proc2.heading}
//     data ={proc2.info}
// />)  
// }

// function App(){
//     return  <div>
//     <Heading/> 
//     <MakeNote/>
//     {Content.map(CreateNote)}
//     <Footer/>
// </div>
    