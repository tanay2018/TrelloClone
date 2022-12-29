import "./Board.css";
import { useState } from "react";
import Modal from "react-modal";
import { MdOutlineDelete } from "react-icons/md";
import { useDroppable } from "@dnd-kit/core";

export default function Board(props) {
  const [listname, setListname] = useState("");
  const [cardname, setCardname] = useState("");
  const [ispopup, setIspopup] = useState(false);
  const [desc, setDesc] = useState("");
  const closeModal = () => setIspopup(false);
  Modal.setAppElement(document.getElementById("root"));

  return (
    <div
      className="board"
      id="board"
      style={{ backgroundColor: `${props.color}` }}
    >
      <div className="positiondelete">
        <h2>{props.title}</h2>
        <button
          className="deletebutton"
          onClick={(event) => {
            event.stopPropagation();
            //console.log();
            props.deleteboard();
          }}
        >
          <MdOutlineDelete
            className="deletesvg"
            onClick={(event) => {
              event.stopPropagation();
              //  console.log(event.target.parentNode.parentNode.parentNode.id);
              props.deleteboard();
            }}
          />
        </button>
      </div>
      {"\n"}
      <div className="thelistdiv">
        {props.lists &&
          props.lists.map((lis) => {
            return (
              <div key={lis.id} id={lis.id} className="insidelist">
                <div className="positiondelete">
                  <h2>{lis.name}</h2>
                  <button
                    className="deletebutton"
                    onClick={(event) => {
                      event.stopPropagation();
                      props.deletelist(event.target.parentNode.parentNode.id);
                    }}
                  >
                    <MdOutlineDelete
                      className="deletesvg"
                      onClick={(event) => {
                        event.stopPropagation();
                        props.deletelist(
                          event.target.parentNode.parentNode.parentNode.id
                        );
                      }}
                    />
                  </button>
                </div>
                <ul className="thecardss">
                  {lis.cards.map((card) => (
                    <li
                      className="thecarddiv"
                      id={card.cardid}
                      key={card.cardid}
                      onClick={(event) => {
                        event.preventDefault();
                        props.cardclicked(
                          event.target.parentNode.parentNode.id,
                          event.target.id,
                          event.target.innerText
                        );
                        setIspopup(true);
                      }}
                    >
                      {card.cardname}
                      <button
                        className="deletebutton"
                        onClick={(event) => {
                          event.stopPropagation();
                          props.deletecard(
                            event.target.parentNode.id,
                            event.target.parentNode.parentNode.parentNode.id
                          );
                        }}
                      >
                        <MdOutlineDelete
                          className="deletesvg"
                          onClick={(event) => {
                            event.stopPropagation();
                            props.deletecard(
                              event.target.parentNode.parentNode.id,
                              event.target.parentNode.parentNode.parentNode
                                .parentNode.id
                            );
                          }}
                        />
                      </button>
                    </li>
                  ))}
                  <Modal
                    className="Modal"
                    isOpen={ispopup}
                    onRequestClose={closeModal}
                  >
                    <div className="thepopup">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          props.editcard(desc);
                          closeModal();
                        }}
                      >
                        <label>Card Title</label>
                        <input
                          type="text"
                          defaultValue={props.cardname}
                          onChange={(e) => {
                            setCardname(e.target.value);
                          }}
                        ></input>
                        <label>Card Description</label>
                        <input
                          type="textarea"
                          className="textarea"
                          defaultValue={props.desc}
                          onChange={(e) => setDesc(e.target.value)}
                        ></input>
                        <button>Save</button>
                      </form>
                    </div>
                  </Modal>
                </ul>
                <form
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.addCards(e.target.parentNode.id, cardname);
                    setCardname("");
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Card Title"
                    value={cardname}
                    onChange={(e) => setCardname(e.target.value)}
                  ></input>
                  <button>Add Card</button>
                </form>
              </div>
            );
          })}
      </div>
      <div className="listdiv">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            props.createList(listname);
            setListname("");
          }}
        >
          <input
            placeholder="Enter list title"
            type="text"
            value={listname}
            onChange={(e) => setListname(e.target.value)}
          />
          <button>Add a list</button>
        </form>
      </div>
    </div>
  );
}
