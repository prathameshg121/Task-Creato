import { Button } from 'bootstrap';
import React from 'react'
import { Link } from 'react-router-dom';
import Login from "./login";
import homeImg from "./images/homeImg.jpg"
import b1 from "./images/brand1.png"
import b2 from "./images/brand2.jpg"
import b3 from "./images/brand3.jpg"
import b4 from "./images/brand4.jpg"
import b5 from "./images/brand5.jpg"
import b6 from "./images/brand6.png"
import b8 from "./images/brand7.png"
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

export default function Home(proc) {
    // proc.checkLogin(true);
   
    return (
        <div>
        <div className="homeContainer" >

   
        <div className="banner" >
         <h1>Task Reminder</h1>
        <h3>Simplest way to chek list</h3>
        <Link to="/notes"><button > Get Started</button></Link>
        </div>
        
        <div className="proImg">
            <img className="proImg" src={homeImg}></img>
        </div>
        </div>
        <div className ="productInfo">
            <div className="feature">
            <i className=" featureicon fas fa-clipboard-list  "></i>
            <h3>Create To Do list</h3>
            <p>Create list easily organize it on the basis of priority. </p>
            </div>
            <div  className="feature">
            <AlarmAddIcon   style={{ fontSize: 70 }}  className="featureicon "  size='lg'/>
            <h3>Add Reminder</h3>
            <p>Add the Reminder that will notify you and stay tune.</p>
            </div>
            <div  className="feature " >
            
            <EnhancedEncryptionIcon style={{ fontSize: 70 }} className="featureicon"  />
            <h3>Secure the data</h3>
            <p>As we respect others privacy, data is end to end encrypted.</p>
            </div>
          
        </div>
        
        <div>



        <section id="spon">

       
      
     <div>
     <h3>spon</h3>
     <img className="testimonial-image" src={b3} />
     <img className="testimonial-image" src={b1}/>
     <img className="testimonial-image" src={b2} />
     <img className="testimonial-image" src={b4} />
     <img className="testimonial-image" src={b5} />
     <img className="testimonial-image" src={b8}/>
    </div>

    <div >

        <table>
            <tr>
                <th>Explore</th>
                <th>Contacts</th>
                <th>Follow</th>
                <th>Legal</th>
            </tr>
            <tr>
                <td>Home</td>
                <td> +0999901</td>
                <td>Instagram</td>
                <td>Terms</td>
            </tr>
            <tr>
                <td>About</td>
                <td> abc@make.com</td>
                <td>Facebook</td>
                <td>Privacy</td>
            </tr>
            <tr>
                <td>Features</td>
                <td></td>
                <td>Twitter</td>
            </tr>
            <tr>
                <td>Spon</td>
                <td></td>
                <td></td>
                </tr>
        </table>
  


</div>
</section>       


        </div>
        

  

        </div>
    )
}
