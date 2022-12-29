import "./App.css";
import "./Components/BoardInput/BoardInput";
import { useState, useEffect } from "react";
import BoardInput from "./Components/BoardInput/BoardInput";
import Board from "./Components/Board/Board";
import { nanoid } from "nanoid";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#F9F6EE");
  const [boarddata, setBoardData] = useState([]);
  const [lists, setlists] = useState([]);
  const [cardid, setCardid] = useState("");
  const [listid, setListid] = useState("");
  const [desc, setDesc] = useState("");
  const [boardid, setBoardid] = useState("");
  const [cardname, setCardname] = useState("");

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boarddata));
  }, [boarddata]);

  if (
    JSON.parse(localStorage.getItem("boards")) !== null &&
    boarddata.length === 0 &&
    boardid === ""
  ) {
    if (JSON.parse(localStorage.getItem("boards")).length !== 0) {
      setBoardData(JSON.parse(localStorage.getItem("boards")));
    }
  }
  useEffect(() => {
    localStorage.setItem(boardid, JSON.stringify(lists));
  }, [lists, boardid]);

  function createList(listname) {
    if (listname) {
      setlists((list) => [
        ...list,
        { name: listname, id: nanoid(), cards: [] },
      ]);
    }
  }

  function editcard(desc) {
    setlists((current) =>
      current.map((list) => {
        if (list.id === listid) {
          return {
            ...list,
            cards: list.cards.map((card) => {
              if (card.cardid === cardid) {
                return { ...card, cardname: cardname, desc: desc };
              } else {
                return card;
              }
            }),
          };
        } else {
          return list;
        }
      })
    );
  }

  function handleclick(event) {
    setTitle(event.target.innerText);
    // console.log(event.target.id);
    setBoardid(event.target.id);
    // console.log(event.target.id);

    for (let x = 0; x < boarddata.length; x++) {
      if (boarddata[x].title === event.target.innerText) {
        setColor(boarddata[x].color);
      }
    }
    setlists(JSON.parse(localStorage.getItem(event.target.id)));
  }

  function deletecard(cardid, listid) {
    setlists((current) =>
      current.map((list) => {
        if (list.id === listid) {
          return {
            ...list,
            cards: list.cards.filter((card) => cardid !== card.cardid),
          };
        } else {
          return list;
        }
      })
    );
  }

  function deletelist(listid) {
    setlists((current) => current.filter((list) => list.id !== listid));
  }

  function deleteboard() {
    //console.log(boarddata);
    setTitle("");
    setlists([]);
    setColor("");
    setBoardData((current) => current.filter((b) => b.id !== boardid));

    // setBoardData([]);
    // debugger;

    console.log(boarddata);
  }

  function cardclicked(listid, cardid, cardname) {
    setListid(listid);
    setCardid(cardid);
    setCardname(cardname);

    lists.forEach((list) => {
      if (list.id === listid) {
        list.cards.forEach((card) => {
          if (card.cardid === cardid) {
            setDesc(card.desc);
          }
        });
      }
    });

    // console.log(JSON.parse(localStorage.getItem(title)));
  }

  // setBoardData((current) => current.filter((b) => b.id !== boardid));

  function addCards(listid, cardname) {
    if (cardname) {
      setlists((current) =>
        current.map((obj) => {
          if (obj.id === listid) {
            return {
              ...obj,
              cards: [...obj.cards, { cardname: cardname, cardid: nanoid() }],
            };
          } else {
            return obj;
          }
        })
      );
    }
  }

  const createBoard = (e) => {
    setIsShown((current) => !current);
  };

  const handleCreate = (title, color) => {
    if (title && color) {
      setBoardData((current) => {
        return [...current, { title: title, color: color, id: getnan() }];
      });

      setTitle(title);
      setColor(color);
      // console.log(boarddata[boarddata.length - 1].id);
      setlists([]);
    }

    createBoard();
  };

  function getnan() {
    let x = nanoid();
    setBoardid(x);
    return x;
  }

  return (
    <div className="Trello" id="trello">
      <header className="Trello-header">
        <nav className="Trello-Nav">
          <h2>TrelloClone</h2>
          <button className="addbutton" onClick={createBoard}>
            CreateBoard
          </button>
          {boarddata.length !== 0 &&
            boarddata.map((item) => (
              <div
                className="addbutton"
                key={item.id}
                id={item.id}
                onClick={handleclick}
              >
                {item.title}
              </div>
            ))}
          {isShown && <BoardInput handleCreate={handleCreate} />}
        </nav>
      </header>
      {title && (
        <Board
          lists={lists}
          color={color}
          title={title}
          boarddata={boarddata}
          createList={createList}
          editcard={editcard}
          addCards={addCards}
          cardclicked={cardclicked}
          cardname={cardname}
          desc={desc}
          deletecard={deletecard}
          deletelist={deletelist}
          deleteboard={deleteboard}
        />
      )}
    </div>
  );
}

export default App;
