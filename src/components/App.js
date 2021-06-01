import React, { useState } from "react"
import Heading from "./header"
import Footer from "./footer"
import Notes from "./Note.jsx"
import Content from "./contentsArr.jsx"
import MakeNote from "./createNote"
import Clock from "./clock.jsx";

   

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
      <Clock/>
      <MakeNote callData={getData} />
     { data.map( (getnote,getindex) =>{
        return <Notes key={getindex} id={getindex} title={getnote.title} content={getnote.content} onDelete={deleteItem}/>})
     }
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
    