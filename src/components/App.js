import React, { useState, useEffect } from "react"
import Heading from "./header"
import Footer from "./footer"
import Notes from "./Note.jsx"
import MakeNote from "./createNote"
import Signup from "./signup"
import NotesArea from "./notesArea"
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";

   

function App() {

  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("jwtToken");
    if (token && !socket) {
      const newSocket = io("http://localhost:8082", {
        query: {
          token: localStorage.getItem("jwtToken"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log('disconnected to the server' );
      });

      newSocket.on("connect", () => {
        newSocket.removeAllListeners();
        newSocket.removeAllListeners('newMessage');
        newSocket.removeAllListeners('Notedata');
        console.log('connected to the server' + newSocket.rooms );
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);




  return (
    <BrowserRouter>
      <div>
        <Heading socket={socket} />
        <Footer />
      </div>
    </BrowserRouter>
    
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
    