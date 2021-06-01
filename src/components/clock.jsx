import React from 'react';

function getData(){
    var data = new Date();

}


function Clock(){

   
        var data = new Date();
        var date = data.getDate();
        var day = data.getDay();
        var month = data.getMonth();
        var year = data.getUTCFullYear();
        var hr = data.getHours();
        var min = data.getMinutes();
        var sec = data.getSeconds();

        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = ["Sun","Mon","Tues","Wed","Thus","Fri","Sat"]

    return <div className="clockArea" >
       <h3>{date}  {monthNames[month]}  {year}</h3>
       <h2>{days[day]}</h2>

        <h1></h1>


    </div>
}

export default Clock;