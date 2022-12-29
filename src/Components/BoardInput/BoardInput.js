import "./boardInput.css"
import React, { useState } from 'react';


export default function BoardInput(props) {
  const [color, setColor] = useState("#F9F6EE");
  const [title, setTitle] = useState("");

  return (
    <div className="boardinput">
      <form onSubmit={(event) => {
        event.preventDefault()
      props.handleCreate(title , color)}}>
        <label>Background Color</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <label>Board Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <button className="create">Create</button>
      </form>

    </div>
  );
}