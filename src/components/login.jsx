import React,{useState} from 'react'
import {Button} from '@material-ui/core';

export default function Login() {
    const [islogin, setlogin] = useState(false);
    return (
        <div>
             <form>
           
            <div className="inputeArea">
            <h2>Login</h2>
            <input className="inputeplace" type="email" placeholder="email" ></input>
           <input className="inputeplace" type="password" placeholder="password" required="required"  ></input> 
           <Button type="submit" variant="contained" color="primary">Login</Button>
            </div>
        </form>    
        </div>
    );
}
