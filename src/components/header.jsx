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
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';


function Heading(proc){

    const [page, setPage]=useState("./index")
    const [isLogin , setLogin] = useState(!!localStorage.getItem('jwtToken'));
    const [secret, setSecret]=useState(null);

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
    });

function changeSec(event){
    setSecret(event.target.value);
    console.log("Event value"+event.target.value);
};

function onSubmitSec(event){
    
    if(secret!=''){
        sessionStorage.setItem('SECRET',secret);
        console.log("Secret Sets :"+sessionStorage.getItem('SECRET'))
        setSecret('');
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    event.preventDefault();
};

// When the user clicks the button, open the modal 
function dialog(){ 
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";



// When the user clicks on <span> (x), close the modal
if( modal.style.display = "block"){ 
span.onclick = function() {
  modal.style.display = "none";
}
}

// // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
function goToHome() {
    histor.push("/")
}
    
    return( 

    <Router>
    <div>
        <nav>
        <Zoom in = "true"><header className="nameOfApp">
        
    
        {isLogin ? <ul >
            <li><dfn title="Task Creato"><img className="logimag" src={imageLogo}  onClick={goToHome}></img></dfn><h3  className="productName">Task Creato</h3></li>
            <li className="poductList"><Link to ="/notes"><dfn title="Add Notes"><Add className="addbtn"/></dfn> </Link></li>
         <li className="poductList"><Link to = "/clock"> <dfn title="Add alarm"> <AddAlertOutlinedIcon className="addbtn" /></dfn> </Link>  </li>
         <li className="poductList" > <dfn title="Encrytion"><EnhancedEncryptionIcon id="myBtn"  onClick={dialog} style={{color :"#0000FF"}} className="addbtn" /></dfn>
{/* /////////////////////////////////////////////////// */}
         <div id="myModal" class="modal">     
<div class="modalcontent">
  <span class="close">&times;</span><form>
  <p>Set secret for Encryption and Decryption..</p>
  <input type="password" name='secret' value={secret} placeholder='Enter your Secret !' onChange={changeSec}></input>
  <button type="submit" onClick={ onSubmitSec }>Set</button></form>
</div>

</div>
{/* ///////////////////////////// */}
         </li>
         <li className="poductList"><Link to = "/profile"> <dfn title="Profile"> <AccountCircleOutlinedIcon className="addbtn"/></dfn> </Link>  </li>
        <li className="poductList" > <dfn title="Logout"><LogoutIcon onClick={logout}  style={{color :"#0000FF"}} className="addbtn" /></dfn></li>
       
        </ul> :
          <ul> 
          <li ><img className="logimag" src={imageLogo}></img><h3 className="productName">Task Creato</h3></li>
          <li className="linav"><Link   to="/login"><dfn title="Sign in"><h3>Signin</h3></dfn></Link></li>
          <li className="linav"><Link to="/signUp"><dfn title="Sign up"><h3>Sign Up</h3></dfn></Link> </li>

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
            <Route exact path = "/">
                <Home />
            </Route>
            <Route path = "/profile">
                <Profile checkLogin = {display}/>
            </Route>
            
        </switch>
    </div>
    </Router>);
        
       
       
    
}

export default Heading;