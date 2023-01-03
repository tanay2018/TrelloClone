import "./List.css";
import Card from "../Card/Card";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function List(props) {
  const [cardname, setCardname] = useState("");
  const { setNodeRef } = useDroppable({
    id: props.lis.id,
  });
  return (
    <div key={props.lis.id} id={props.lis.id} className="insidelist">
      <div className="positiondelete">
        <h2>{props.lis.name}</h2>
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
      <SortableContext
        id={props.lis.id}
        items={props.lis.cards.map((card) => card.cardid)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="thecardss" ref={setNodeRef} id={props.lis.id}>
          {props.lis.cards.map((card) => (
            <Card
              key={card.cardid}
              id={card.cardid}
              openModal={props.openModal}
              card={card}
              cardclicked={props.cardclicked}
              deletecard={props.deletecard}
            />
          ))}
        </ul>
      </SortableContext>
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
}
