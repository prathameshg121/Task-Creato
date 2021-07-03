import React, { useState, useEffect } from 'react';
import MakeNote from "./createNote";
import Notes from "./Note";
import Axios from 'axios';
import { AddCircle , AddCircleOutline } from '@material-ui/icons';
import {decrypt} from '../utils/crptomethod';


 function NotesArea(proc) {
     proc.checkLogin(true);
    const [data,setData]=useState([])

    useEffect(prev=>{
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
    setData(prev=>{
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
        <div className="notesAreaDiv">
      
      <MakeNote callData={getData} calleData={geteData} socket={proc.socket}/>
     
     {
      data.map( (getnote) =>{
      //  console.log(JSON.stringify(getnote[0]));
        return <Notes key={getnote._id} id={getnote._id} title={getnote.title} content={getnote.content}  onDelete={deleteItem}/>})
     }
        </div>
    )
}
// reminder={getnote.reminder}
export default NotesArea;
