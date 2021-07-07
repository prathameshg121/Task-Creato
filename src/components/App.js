import React, { useState, useEffect, useCallback } from "react"
import Heading from "./header"
import Footer from "./footer"
import Notes from "./Note.jsx"
import MakeNote from "./createNote"
import Signup from "./signup"
import NotesArea from "./notesArea"
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";
import { AuthContext } from '../context/auth-context';
import Axios from 'axios';

let logoutTimer;
   

function App() {

  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsloading] = useState(true)


  const setupSocket = () => {
    const token = localStorage.getItem("jwtToken");
    if (token && !socket) {
      const newSocket = io("http://localhost:8082", {
        query: {
          token: localStorage.getItem("jwtToken"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log('disconnected to the server' );
      });

      newSocket.on("connect", () => {
        newSocket.removeAllListeners();
        newSocket.removeAllListeners('newMessage');
        newSocket.removeAllListeners('Notedata');
        console.log('connected to the server' + newSocket.rooms );
      });

      setSocket(newSocket);
    }
  };

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setIsloading(false);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileData');
    sessionStorage.removeItem('SECRET');
    let token = null
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);


  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    setIsloading(false)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);


  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}
  >
    <BrowserRouter>
      <div>
        <Heading socket={socket} />
        <Footer />
      </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App 





















// function CreateNote(proc2){
//   return(<Notes
//   key={proc2.id}
//     heading ={proc2.heading}
//     data ={proc2.info}
// />)  
// }

// function App(){
//     return  <div>
//     <Heading/> 
//     <MakeNote/>
//     {Content.map(CreateNote)}
//     <Footer/>
// </div>
    