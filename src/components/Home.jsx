import { Button } from 'bootstrap';
import React from 'react'
import { useHistory } from 'react-router-dom';
import Login from "./login"
import homeImg from "./images/homeImg.jpg"
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

export default function Home(proc) {
    proc.checkLogin(true);
   
    return (
        <div>
        <div className="homeContainer" >

   
        <div className="banner" >

         <h1>Task Reminder</h1>
        <h3>Simplest way to chek list</h3>
        <button > Get Started</button>
        </div>
        <div className="proImg">
            <img className="proImg" src={homeImg}></img>
        </div>
        </div>
        <div className ="productInfo">
            <div className="feature">
           

            <i className=" featureicon fas fa-clipboard-list  "></i>
            <h3>Create To Do list</h3>
            <p>Create list easily organize it on the basis of priority. </p>
            </div>
            <div  className="feature">
            <AlarmAddIcon   style={{ fontSize: 70 }}  className="featureicon "  size='lg'/>
            <h3>Add Reminder</h3>
            <p>Add the Reminder that will notify you and stay tune.</p>
            </div>
            <div  className="feature " >
            
            <EnhancedEncryptionIcon style={{ fontSize: 70 }} className="featureicon"  />
            <h3>Secure the data</h3>
            <p>As we respect others privacy, data is end to end encrypted.</p>
            </div>
          
        </div>
        

  

        </div>
    )
}
