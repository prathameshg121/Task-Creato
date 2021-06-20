import React,{useState} from 'react'
import {Button} from '@material-ui/core';
import { BrowserRouter as Router , Switch,Route , Link , useHistory} from 'react-router-dom';
import Home from './Home';
import Axios from 'axios';

export default function Login() {
    const [islogin, setlogin] = useState(false);
    const history = useHistory();

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
             console.log(response);
             console.log('login sucessfull');
             history.push('/home');
            //  auth.login(response.data.userId, response.data.token);
            const token  = response.data.token;
            console.log('token'+response.data.token + 'roken'+ token);
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
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
        switch(nam){
            case 'email': 
                setData({
                    email:val,
                    password: data.password
                });
                break;
            case 'password': 
                setData({
                    email:data.email,
                    password:val
                });
                break;
            default:
                 break;
                
        }

     }
    return (
        <div>
             <form>
           
            <div className="inputeArea">
            <h2>Login</h2>
            <input className="inputeplace" type="email" name="email" placeholder="email" onChange={changehandler}></input>
           <input className="inputeplace" type="password" name="password" placeholder="password" required="required" onChange={changehandler} ></input> 
          <Button type="submit" variant="contained" color="primary" onClick={submitData} >Login</Button>
            </div>
        </form>    
        </div>
    );
}