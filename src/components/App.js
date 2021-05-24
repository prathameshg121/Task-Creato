import React, { useState } from "react"
import Heading from "./header"
import Footer from "./footer"
import Notes from "./Note.jsx"
import Content from "./contentsArr.jsx"
import MakeNote from "./createNote"



    
function App() {

  const [data,setData]=useState([])

function getData(Ndata){
console.log(Ndata)
setData(prev=>{
  return [ ...prev,Ndata]
})
}

  return (
    <div>
      <Heading />
      <MakeNote callData={getData} />
     { data.map( (getnote) =>{
        return <Notes key={1} title={getnote.title} content={getnote.content}/>})
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
    