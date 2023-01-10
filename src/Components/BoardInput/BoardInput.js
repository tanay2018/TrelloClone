import "./boardInput.css";
import React, { useState } from "react";

export default function BoardInput(props) {
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="boardinput">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (title === "" || color === "") {
            alert("Please enter a title and color");
          }
          title && color && props.handleCreate(title, color);
        }}
      >
        <label>Background Color</label>
        <ul className="colorlist">
          <li className="listitem">
            <button
              className="colorselect"
              style={{ backgroundColor: "#0079BF" }}
              onClick={(event) => {
                event.preventDefault();
                event.target.parentNode.parentNode.childNodes.forEach(
                  (element) => {
                    element.childNodes[0].classList.remove("selected");
                  }
                );
                event.target.classList.add("selected");
                setColor("#0079BF");
              }}
            ></button>
          </li>
          <li className="listitem">
            <button
              className="colorselect"
              style={{ backgroundColor: "#D29034" }}
              onClick={(event) => {
                event.preventDefault();
                event.target.parentNode.parentNode.childNodes.forEach(
                  (element) => {
                    element.childNodes[0].classList.remove("selected");
                  }
                );
                event.target.classList.add("selected");
                setColor("#D29034");
              }}
            ></button>
          </li>
          <li className="listitem">
            <button
              className="colorselect"
              style={{ backgroundColor: "#519839" }}
              onClick={(event) => {
                event.preventDefault();
                event.target.parentNode.parentNode.childNodes.forEach(
                  (element) => {
                    element.childNodes[0].classList.remove("selected");
                  }
                );
                event.target.classList.add("selected");
                setColor("#519839");
              }}
            ></button>
          </li>
          <li className="listitem">
            <button
              className="colorselect"
              style={{ backgroundColor: "#B00032" }}
              onClick={(event) => {
                event.preventDefault();
                event.target.parentNode.parentNode.childNodes.forEach(
                  (element) => {
                    element.childNodes[0].classList.remove("selected");
                  }
                );
                event.target.classList.add("selected");
                setColor("#B00032");
              }}
            ></button>
          </li>
          <li className="listitem">
            <button
              className="colorselect"
              style={{ backgroundColor: "#89609E" }}
              onClick={(event) => {
                event.preventDefault();
                event.target.parentNode.parentNode.childNodes.forEach(
                  (element) => {
                    element.childNodes[0].classList.remove("selected");
                  }
                );
                event.target.classList.add("selected");
                setColor("#89609E");
              }}
            ></button>
          </li>
        </ul>
        <label>Board Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="create">Create</button>
      </form>
    </div>
  );
}
