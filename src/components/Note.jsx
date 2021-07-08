import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(prop) {
  function handelDelete() {
    prop.onDelete(prop.id);
  }

  return (
    <div className="note">
      <div className="data">
        <h1>{prop.title}</h1>
        <p>{prop.content}</p>
      </div>

      <dfn title="delete">
        {" "}
        <button onClick={handelDelete}>
          <DeleteIcon />
        </button>
      </dfn>
      <br />
    </div>
  );
}

export default Note;
