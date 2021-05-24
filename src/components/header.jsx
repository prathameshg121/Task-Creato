import React from "react"
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import Zoom from '@material-ui/core/Zoom';


function Heading(){
    return  <Zoom in = "true"><header className="nameOfApp"><h1><BorderColorTwoToneIcon/> Notes App</h1></header></Zoom>
       
    
}

export default Heading;