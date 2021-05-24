import React from "react"
import Heading from "./header"
import Footer from "./footer"
import Notes from "./Note.jsx"
import Content from "./contentsArr.jsx"
import MakeNote from "./createNote"


    
function App() {
  return (
    <div>
      <Heading />
      <MakeNote />
      <Notes key={1} title="Note title" content="Note content" />
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
    