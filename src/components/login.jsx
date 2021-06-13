import React,{useState} from 'react'
import {Button} from '@material-ui/core';
import { BrowserRouter as Router , Switch,Route , Link , useHistory} from 'react-router-dom';
import Home from './Home';

export default function Login() {
    const [islogin, setlogin] = useState(false);
    const histor = useHistory();


    return (
        <div>
             <form>
           
            <div className="inputeArea">
            <h2>Login</h2>
            <input className="inputeplace" type="email" placeholder="email" ></input>
           <input className="inputeplace" type="password" placeholder="password" required="required"  ></input> 
          <Button type="submit" variant="contained" color="primary" onClick={ ()=>{histor.push("./home")}} >Login</Button>
            </div>
        </form>    
        </div>
    );
}