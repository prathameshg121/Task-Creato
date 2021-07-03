import React, { useState, useContext, useEffect } from "react";
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import Zoom from '@material-ui/core/Zoom';
import AlarmAddTwoToneIcon from '@material-ui/icons/AlarmAddTwoTone';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,useHistory
  } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Clock from "./clock";
import NotesArea from "./notesArea";
import {Card, Form,Button,Navbar,} from 'react-bootstrap'
import imageLogo from './images/logo2.png'
import  Home  from "./Home";
import { getByDisplayValue } from "@testing-library/react";
import { Add } from "@material-ui/icons";
import LogoutIcon from '@material-ui/icons/ExitToApp';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Profile from  "./profile";
import { AuthContext } from '../context/auth-context';


function Heading(proc){

    const [page, setPage]=useState("./index")
    const [isLogin , setLogin] = useState(false);
    let histor = useHistory();
    const auth = useContext(AuthContext);
    function display( value){
     
        setLogin(value);
    };
    function logout(){
        console.log("logout called");
        localStorage.removeItem("jwtToken");
        setLogin(false);
        auth.logout();
        histor.push('/login');
    };
    useEffect(()=>{
        console.log("auth Login"+auth.isLoggedIn);
        if(auth.isLoggedIn || localStorage.getItem('jwtToken')) setLogin(true); else setLogin(false);
    },[isLogin])
    
    return( 

    <Router>
    <div>
        <nav>
        <Zoom in = "true"><header className="nameOfApp">
        
    
        {isLogin ? <ul >
            <li><img className="logimag" src={imageLogo}></img></li>
            <li className="poductList"><Link to ="/notes"><Add/> </Link></li>
         <li className="poductList"><Link to = "/clock">  <AddAlertOutlinedIcon/> </Link>  </li>
         <li className="poductList"><Link to = "/profile">  <AccountCircleOutlinedIcon/> </Link>  </li>
        <li className="poductList" ><LogoutIcon onClick={logout}></LogoutIcon></li>
        </ul> :
          <ul> 
          <li><img className="logimag" src={imageLogo}></img></li>
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
                <NotesArea checkLogin = {display} socket={proc.socket}/>
            </Route>
            <Route path = "/home">
                <Home checkLogin = {display}/>
            </Route>
            <Route path = "/profile">
                <Profile checkLogin = {display}/>
            </Route>
            <Route path = "/">
                <Home checkLogin = {display}/>
            </Route>
            
        </switch>
    </div>
    </Router>);
        
       
       
    
}

export default Heading;