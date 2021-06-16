import React, { useState } from "react"
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import Zoom from '@material-ui/core/Zoom';
import AlarmAddTwoToneIcon from '@material-ui/icons/AlarmAddTwoTone';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Clock from "./clock";
import NotesArea from "./notesArea";
import {Card, Form,Button,Navbar,} from 'react-bootstrap'
import imageLogo from './images/todologo.png'
import  Home  from "./Home";
import { getByDisplayValue } from "@testing-library/react";
import { Add  } from "@material-ui/icons";
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';





function Heading(){

    const [page, setPage]=useState("./index")
    const [isLogin , setLogin] = useState(false);
    function display( value){
     
        setLogin(value);
    }
    
    return( 

    <Router>
    <div>
        <nav>
        <Zoom in = "true"><header className="nameOfApp">
        
    
        {isLogin ? <ul >
            <li className="poductList"><Link to ="/notes"><Add/> </Link></li>
         <li className="poductList"><Link to = "/clock">  <AddAlertOutlinedIcon/> </Link>  </li>
        </ul> :
          <ul> 
          <li className="linav"><Link   to="/login"><h3>Signin</h3></Link></li>
          <li className="linav"><Link to="/signUp"><h3>Signup</h3></Link> </li>
         </ul>}
    
    

        </header></Zoom>
        </nav>
        <switch>
            <Route path="/login">
                <Login checkLogin = {display}/>
            </Route>
            <Route path="/signUp">
                <Signup/>
            </Route>
            <Route path="/clock">
                <Clock  checkLogin = {display}/>
            </Route>
            <Route path="/notes">
                <NotesArea checkLogin = {display}/>
            </Route>
            <Route path = "/home">
                <Home checkLogin = {display}/>
            </Route>
            
        </switch>
    </div>
    </Router>);
        
       
       
    
}

export default Heading;