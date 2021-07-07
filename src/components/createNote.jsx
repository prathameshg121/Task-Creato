import React, { useState, useEffect } from "react";
import PostAddIcon from '@material-ui/icons/PostAdd';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import Reminder from "./reminder";
import Axios from 'axios';
import {encrypt} from '../utils/crptomethod';

function CreateArea(proc) {
 
const [data, setData] =useState({
   title: "",
   content : "",
   reminder : "",
});
const [prevdata, setprevData] =useState({
   title: "",
   content : "",
   reminder : "",
});

const [display,setDisplay] = useState(false)
const [rowValue, setRowValue] = useState(1)
const [showReminder ,setReminder] = useState(false);


  const socket = proc.socket;
  const chatroomId = localStorage.getItem("userId");
  const [senderId,setId] = useState();
  const [savemess, setsaveMess] = useState({
    'title':'hello'
  });
  const [messages, setMessages] = useState([]);
  const messageRef = React.useRef();
  const [isEncrypted, setEncrypt] = useState(false);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };
  useEffect(() => {
    setId(()=>{
      console.log("SenderID changed"+senderId);return(Math.random())});
  }, [])

  useEffect(() => {
    if (socket) {
      console.log("socket is there");
    } else console.log("Socket is not available");
    if (socket) {
      socket.removeAllListeners('newMessage');
        socket.removeAllListeners('Notedata');
      socket.emit("joinRoom", {
        chatroomId,
      });
      console.log('rooms sockets'+socket.rooms);
    }
    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
        socket.removeAllListeners('newMessage');
        socket.removeAllListeners('Notedata');


      }
    };
    //eslint-disable-next-line
  },[socket]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        console.log("New Message for socket :"+ JSON.stringify(message));
        const newMessages = [...messages, message.message];
        setMessages(newMessages);
        if(senderId !== message.message.senderId && data.title!== message.message.title && data.content!== message.message.content){
          setData(preNote=>{
            return{
                ...preNote,
                'content':message.message.content,
                'title': message.message.title
            }
          });
          setprevData(preNote=>{
            return{
                ...preNote,
                'content':message.message.content,
                'title': message.message.title
            }
          });
        }  
      });
    }
    //eslint-disable-next-line
  });

  useEffect(() => {
    if (socket) {
      socket.on("Notedata", (message) => {
        console.log("New Message note for socket :"+ JSON.stringify(message));
        console.log(message.message.notedata.title + "===" + savemess.title + 'sender' + senderId);
        if(senderId !== message.message.senderId && message.message.notedata.title !== savemess.title){
          proc.callData(message.message.notedata);
          setsaveMess({title:message.message.notedata.title});
          setData({
            title: "",
            content : "" ,
            reminder : ""
          });
        }  
      });
    }
    //eslint-disable-next-line
  },[socket]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("Sending to socket");
      // Sending socket
      if(prevdata.title !== data.title && prevdata.content !== data.content && data.title && data.content){
        if (socket) {
          socket.emit("chatroomMessage", {
            chatroomId,
            message: {"content":data.content,"title":data.title,"sender":senderId}
          });
          setprevData((prev)=>{
            return {...prev,
              'title':data.title,
              'content':data.content
            }
          });
        }
      }
    }, 3000);
  return () => clearTimeout(delayDebounceFn)
  }, [data]);


function makeChange(event){
    const {name, value}=event.target;
    setRowValue(3)

    setData(preNote=>{
        return{
            ...preNote,
            [name]:value
        }

    });    
}

function encrptData(data){
    return encrypt(data);
}


function submitData(event){
  console.log('submitMessage :'+JSON.stringify(messages));
  if(isEncrypted){
    const hash = encrypt(JSON.stringify({'title':data.title,'content':data.content}));
    const edata = {
      'title':hash.iv,
      'content':hash.content
    };
    Axios.post("/encrypt/notes/create", edata).then(resdata => {
    console.log("data:"+JSON.stringify(resdata.data.note._doc));
    // if (socket) {
    //   socket.emit("notedata", {
    //     chatroomId,
    //     message: {"notedata":resdata.data.note._doc,"sender":senderId}
    //   });
    // }
  }).catch(e => {
       console.log("error:");
       console.log(e);
    });
  }
  Axios.post("/notes/create", data).then(resdata => {
    // console.log("data:"+JSON.stringify(resdata.data.note._doc));
    proc.callData(resdata.data.note._doc);
    if (socket) {
      socket.emit("notedata", {
        chatroomId,
        message: {"notedata":resdata.data.note._doc,"sender":senderId}
      });
    }
  }).catch(e => {
       console.log("error:");
       console.log(e);
    });
    setData({
      title: "",
      content : "" ,
      reminder : ""
    });
    event.preventDefault()
}

function increaseSize(){
    setDisplay(true)
}

function reminder (timeData){
  // console.log("this is from create note" +timeData);
  setData(preNote=>{
    return{
        ...preNote,
        reminder : timeData
    }

})
}
  return (
    <div  className="notesAreaDiv">
    <h3 >Add Note</h3>
      <form className="create-note">
       { display?<input name="title"onChange={makeChange} placeholder="Heading" value={data.title} /> :""}
        <textarea name="content" onClick={increaseSize} onChange={makeChange} value ={data.content} placeholder="Discription..." rows={rowValue} />
        
       
     
        <Zoom in= {display}>
        <div>
       <dfn title="Add reminder"> <Fab  onClick={()=>{setReminder(!showReminder)}} ><AddAlertOutlinedIcon/> </Fab></dfn>
       <dfn title="Add Encrution"> <Fab  onClick={()=>{setEncrypt(true)}}><EnhancedEncryptionIcon/>  </Fab> </dfn>
        <dfn title="save"><Fab type="submit" onClick={submitData}><PostAddIcon/>  </Fab> </dfn>

        </div>
        </Zoom>
      </form>
      {showReminder? <Reminder getTimeData = {reminder} /> : ""}
    </div>
  );
}

export default CreateArea;