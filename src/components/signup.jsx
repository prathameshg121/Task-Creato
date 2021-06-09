import React from 'react'
import { Button } from '@material-ui/core';


export default function signup() {
    return (
        <div>
        <form>
        <div className="inputeArea">
            <h2>Sign Up</h2>
           <input className="inputeplace" type="email" placeholder="email" ></input>
           <input className="inputeplace" type="password" placeholder="password" required="required" ></input> 
           <input className="inputeplace" type="password" placeholder="conform-password" required="required" ></input> 
           <Button variant="contained" color="primary" type="sumit">Sign up</Button>

           </div>
        </form>
             
        </div>
    )
}


