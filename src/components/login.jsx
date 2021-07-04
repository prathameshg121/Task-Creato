import React,{useState, useEffect, useContext} from 'react'
import {Button} from '@material-ui/core';
import { BrowserRouter as Router , Switch,Route , Link , useHistory} from 'react-router-dom';
import Home from './Home';
import Axios from 'axios';
import { AuthContext } from '../context/auth-context';


export default function Login(proc) {
    const [islogin, setlogin] = useState(false);
    const histor = useHistory();
    const auth = useContext(AuthContext);
    useEffect(()=>{
        if(localStorage.getItem("jwtToken")  || auth.isLoggedIn ){
            setlogin(true);
            histor.push("./home");
        }
        proc.checkLogin(islogin);
    },islogin);
    
    const [data, setData] =useState({
        email: "",
        password : ""
     
     });

     const setAuthToken = token => {
        if (token) {
          // Apply authorization token to every request if logged in
          Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          // Delete auth header
          delete Axios.defaults.headers.common["Authorization"];
        }
      };

     function submitData(event){
         event.preventDefault();
         Axios.post('/auth/login', data)
         .then(response => {
             console.log('Response :'+JSON.stringify(response));
             console.log('login sucessfull');
             histor.push('/notes');
             auth.login(response.data.userId, response.data.token);
            const token  = response.data.token;
            console.log('token'+response.data.token + 'roken'+ token);
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userId", response.data.userId);
            setAuthToken(token);
            setlogin((prev)=>{
                return true;
            })
        //  }).then(data => {
        //      let profile = data.data.profile.username
        //      localStorage.setItem(
        //          'profileData',
        //          JSON.stringify({
        //              "username": profile
        //          }))


         }).catch(e => {
             console.log("error e :" + e);
             
         })
     }
     function changehandler(event){
        let nam = event.target.name;
        let val = event.target.value;
        setData(predata=>{
            return{
                ...predata,
                [nam]:val
            }
        })

     }
    return (
        <div>
             <form>
           
            <div className="inputeArea">
            <h2>Login</h2>
            <input className="inputeplace" type="email" name='email' value={data.email} placeholder="email" onChange={changehandler} ></input>
           <input className="inputeplace" type="password" placeholder="password" required="required" name='password' value={data.password} onChange={changehandler} ></input> 
          <Button  type="submit" variant="contained" color="primary" onClick={ submitData }  >Login</Button>
            </div>
        </form>    
        </div>
    );
}