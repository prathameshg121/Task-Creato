import React from "react";




function Note(prop) {

function handelDelete(){
    prop.onDelete(prop.id)
}


  return (
    <div className="note">
      <h1>{prop.title}</h1>
      <p>{prop.content}</p>
      <button onClick={handelDelete}>DELETE</button>
    </div>
  );
}

export default Note;
