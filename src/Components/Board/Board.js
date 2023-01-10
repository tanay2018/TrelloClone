import "./Board.css";
import { useState } from "react";
import Modal from "react-modal";
import { MdOutlineDelete } from "react-icons/md";
import {
  DndContext,
  KeyboardSensor,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import List from "../List/List";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function Board(props) {
  const [listname, setListname] = useState("");
  const [ispopup, setIspopup] = useState(false);
  const closeModal = () => setIspopup(false);
  const openModal = () => setIspopup(true);
  const [activeId, setActiveId] = useState(null);
  Modal.setAppElement(document.getElementById("root"));

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const cards = props.lists.filter((lis) => lis.id === activeContainer)[0]
        .cards;

      props.handleBetween(
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        cards[activeIndex]
      );
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const cards = props.lists.filter((lis) => lis.id === activeContainer)[0]
        .cards;

      props.handlend(
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        cards[activeIndex]
      );
    }
  };
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
            props.deleteboard();
          }}
        >
          <MdOutlineDelete
            className="deletesvg"
            onClick={(event) => {
              event.stopPropagation();
              props.deleteboard();
            }}
          />
        </button>
      </div>
      {"\n"}
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="thelistdiv">
          {props.lists &&
            props.lists.map((lis) => {
              return (
                <List
                  key={lis.id}
                  lis={lis}
                  id={lis.id}
                  activeId={activeId}
                  openModal={openModal}
                  addCards={props.addCards}
                  deletelist={props.deletelist}
                  cardclicked={props.cardclicked}
                  deletecard={props.deletecard}
                />
              );
            })}
        </div>
      </DndContext>
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
      <Modal className="Modal" isOpen={ispopup} onRequestClose={closeModal}>
        <div className="thepopup">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.editcard();
              closeModal();
            }}
          >
            <label>Card Title</label>
            <input
              type="text"
              defaultValue={props.cardname}
              onChange={(e) => {
                props.changecardname(e.target.value);
              }}
            ></input>
            <label>Card Description</label>
            <input
              type="textarea"
              className="textarea"
              defaultValue={props.desc}
              onChange={(e) => props.changecarddesc(e.target.value)}
            ></input>
            <button>Save</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
