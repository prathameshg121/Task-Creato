import React, { useState, useEffect, useContext } from 'react';
import MakeNote from "./createNote";
import Notes from "./Note";
import Axios from 'axios';
import { AccountTreeSharp, AddCircle , AddCircleOutline } from '@material-ui/icons';
import {decrypt} from '../utils/crptomethod';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';


 function NotesArea(proc) {
    //  proc.checkLogin(true);
    const [data,setData]=useState([]);
    const [edata,seteData]=useState([]);
    const auth = useContext(AuthContext);
    const histor = useHistory();
    useEffect(()=>{
      if(!auth.isLoggedIn){
        histor.push('/login');
      }
    },[auth.isLoggedIn]);
    useEffect(prev=>{
      if(localStorage.getItem('jwtToken')){
          Axios.get('/notes/mynote').then(Ndata=>{
          if(Ndata){
            var notes = Ndata.data.notes;
            setData(prev=>{
              return notes;
            });
          }
      }).catch(e => {
          console.log("error:");
          console.log(e);
      });
    } else histor.push('/login');
    },[]);

    function getData(Ndata){
    setData(prev=>{
      return [ ...prev,Ndata]
    })};
    
    function geteData(Ndata){
      const ddata = JSON.parse(decrypt({'iv':Ndata.title,'content':Ndata.content}));
      const decrpdata = {
        ...Ndata,
        'title': ddata.title,
        'content': ddata.content,
      };
    seteData(prev=>{
      return [ ...prev,decrpdata]
    })};

    
    function deleteItem(id){
      const url = '/notes/'+id;
      Axios.delete(url).then(res=>{
        // console.log('delete res : '+ JSON.stringify(res));
      }

      ).catch(e=>{
        console.log("error : "+ JSON.stringify(e));
      });
      console.log("delet is added")
    setData(prev =>{

      return prev.filter((notes) =>{
        return notes._id!==id
      })
    })
    
      }
    return (
      <div className="outer">
        <div className="notesAreaDiv">
      
      <MakeNote callData={getData} calleData={geteData} socket={proc.socket}/>
     
     <div>{
      data.map( (getnote) =>{
      //  console.log(JSON.stringify(getnote[0]));
        return <Notes key={getnote._id} id={getnote._id} title={getnote.title} content={getnote.content}  onDelete={deleteItem}/>})
     }</div>
     <Divider variant="middle"/>
     <div>{
      edata.map( (getnote) =>{
      //  console.log(JSON.stringify(getnote[0]));
        return <Notes key={getnote._id} id={getnote._id} title={getnote.title} content={getnote.content}  onDelete={deleteItem}/>})
     } </div>
        </div>
        </div>
    )
}
// reminder={getnote.reminder}
export default NotesArea;
