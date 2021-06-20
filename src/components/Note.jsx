import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';



function Note(prop) {

function handelDelete(){
    prop.onDelete(prop.id)
}


  return (
    <div className="note">
      <h1>{prop.title}</h1>
      <p>{prop.content}</p>
      <p>{prop.reminder}</p>
      <button onClick={handelDelete}>
          <DeleteIcon/>
      </button>
    </div>
  );
}

export default Note;
