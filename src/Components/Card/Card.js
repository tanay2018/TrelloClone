import "./Card.css";
import { MdOutlineDelete } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Card.css";

export default function Card(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({
    id: props.card.cardid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <li
      className="thecarddiv"
      id={props.card.cardid}
      key={props.card.cardid}
      onClick={(event) => {
        event.preventDefault();
        props.cardclicked(
          event.target.parentNode.parentNode.id,
          event.target.id
        );
        props.openModal();
        event.stopPropagation();
      }}
      style={style}
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
    >
      <span className="thespan"> {props.card.cardname}</span>
      <button ref={setActivatorNodeRef} {...listeners} className="dragbutton">
        Drag
      </button>
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
              event.target.parentNode.parentNode.parentNode.parentNode.id
            );
          }}
        />
      </button>
    </li>
  );
}
