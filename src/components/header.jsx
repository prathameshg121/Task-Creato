import React, { useState } from "react"
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import Zoom from '@material-ui/core/Zoom';
import AlarmAddTwoToneIcon from '@material-ui/icons/AlarmAddTwoTone';
import Reminder from './reminder.jsx';



function Heading(){

    const [page, setPage]=useState("./index")

    
    
    return <div>
        <Zoom in = "true"><header className="nameOfApp"><h1 id="index" ><a href="./index.html"><BorderColorTwoToneIcon/></a>  Notes<Reminder/></h1></header></Zoom></div>
       
    
}

export default Heading;