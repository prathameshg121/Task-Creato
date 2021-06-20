import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8082/api';
     
    let token =  JSON.parse(localStorage.getItem("jwtToken")) || '';
    
    
    //axios.defaults.headers.common['Authorization'] = {'Authorization': `Bearer ${token}`};
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.interceptors.request.use(request => {      
    //    console.log(request)
        
        // Edit request config
        return request;
    }, error => {
       console.log(error);
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        // Edit response config
        //console.log(response);
        return response;
    }, error => {
        console.log(error.response);
        return Promise.reject(error);
    });

ReactDOM.render(<App></App>,
  document.getElementById('root')
);


