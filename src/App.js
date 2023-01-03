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
import {
  arrayMove,
  insertAtIndex,
  removeAtIndex,
} from "./Components/Utils/array";

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

  function changecardname(cardi) {
    setCardname(cardi);
  }

  function changecarddesc(cardi) {
    setDesc(cardi);
  }
  function editcard() {
    // console.log(cardz);
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
    console.log(lists);
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

  function cardclicked(listid, cardid) {
    //console.log(listid, cardid, cardname);
    setListid(listid);
    setCardid(cardid);
    console.log(lists);

    lists.forEach((list) => {
      if (list.id === listid) {
        list.cards.forEach((card) => {
          if (card.cardid === cardid) {
            setDesc(card.desc);
            setCardname(card.cardname);
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

  function handlend(
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) {
    setlists((current) => {
      let newitems;
      if (activeContainer === overContainer) {
        newitems = current.map((lis) => {
          if (lis.id !== activeContainer) {
            return lis;
          } else {
            return {
              ...lis,
              cards: arrayMove(lis.cards, activeIndex, overIndex),
            };
          }
        });
      } else {
        newitems = current.map((lis) => {
          if (lis.id !== activeContainer) {
            return lis;
          } else {
            return {
              ...lis,
              cards: moveBetweenContainers(
                lis.cards,
                activeContainer,
                activeIndex,
                overContainer,
                overIndex,
                item
              ),
            };
          }
        });
      }
      return newitems;
    });
  }

  function handleBetween(
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) {
    setlists((current) => {
      return moveBetweenContainers(
        current,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        item
      );
    });
  }

  function moveBetweenContainers(
    lists,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) {
    return lists.map((lis) => {
      if (lis.id !== activeContainer && lis.id !== overContainer) {
        return lis;
      } else {
        if (lis.id === activeContainer) {
          return {
            ...lis,
            cards: removeAtIndex(lis.cards, activeIndex),
          };
        } else {
          return {
            ...lis,
            cards: insertAtIndex(lis.cards, overIndex, item),
          };
        }
      }
    });
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
          changecardname={changecardname}
          changecarddesc={changecarddesc}
          handleBetween={handleBetween}
          handlend={handlend}
        />
      )}
    </div>
  );
}

export default App;
