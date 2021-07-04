import { Button } from 'bootstrap';
import React from 'react'

export default function Home(proc) {
    proc.checkLogin(true);
    return (
        <div>

   
        <div className="banner" >

         <h1>Task Reminder</h1>
        <h3>Simplest way to chek list</h3>
        <button > Get Started</button>
        </div>
        <div className ="productInfo">
        
            <h3>Create To Do list</h3>
            <p>Create list easily organize it on the basis of priority. </p>
            <h3>Add Reminder</h3>
            <p>Add the Reminder that will notify you and stay tune.</p>
            <h3>Secure the data</h3>
            <p>As we respect others privacy, data is end to end encrypted.</p>

        </div>
        </div>
    )
}
