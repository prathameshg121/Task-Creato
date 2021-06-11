import React from 'react'
import { Button } from '@material-ui/core';
import { BrowserRouter as Router , Link , Switch , Route } from 'react-router-dom';
import Home from './Home';
//sign in
export default function signup() {
    return (
        <div>
        <form>
        <div className="inputeArea">
            <h2>Sign Up</h2>
           <input className="inputeplace" type="email" placeholder="email" ></input>
           <input className="inputeplace" type="password" placeholder="password" required="required" ></input> 
           <input className="inputeplace" type="password" placeholder="conform-password" required="required" ></input>
           <Router>
               <Link to ="/home"><Button variant="contained" color="primary" type="sumit">Sign up</Button></Link>
               <Route path="/home" ><Home/></Route>
           </Router> 
           

           </div>
        </form>
             
        </div>
    )
}


