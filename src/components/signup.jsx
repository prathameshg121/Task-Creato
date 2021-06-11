import React from 'react'
import { Button } from '@material-ui/core';
import { BrowserRouter as Router , Link , Switch , Route, useHistory } from 'react-router-dom';
import Home from './Home';
//sign in
export default function Signup() {
    var history = useHistory();
    return (
        <div>
        <form>
        <div className="inputeArea">
            <h2>Sign Up</h2>
           <input className="inputeplace" type="email" placeholder="email" ></input>
           <input className="inputeplace" type="password" placeholder="password" required="required" ></input> 
           <input className="inputeplace" type="password" placeholder="conform-password" required="required" ></input>
        <Button variant="contained" color="primary" type="sumit" onClick={()=>{history.push("/login")}}>Sign up</Button>
           

           </div>
        </form>
             
        </div>
    )
}


