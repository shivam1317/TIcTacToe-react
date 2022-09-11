import React, { useState, useEffect } from "react";
import Cell from "./Components/Cell";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const initialState = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [state, setState] = useState(initialState);
  const [xChance, setxChance] = useState(false);
  const cellClicked = (i) => {
    let temp = Array.from(state);
    if (temp[i] !== "") {
      return;
    }
    temp[i] = xChance ? "X" : "O";
    setState(temp);
    setxChance(!xChance);
  };

  useEffect(() => {
    let draw = checkDraw();
    if (draw) {
      toast.info(`Draw!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
        closeButton: false,
      });
      setState(initialState);
      setxChance(false);
    } else {
      let winner = checkWinner();
      if (winner) {
        let player = winner === "X" ? "Player 2" : "Player 1";
        toast.success(`${player} won the game!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
          closeButton: false,
        });
        setState(initialState);
        setxChance(false);
      }
    }
  }, [state]);
  const checkDraw = () => {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === "") {
        return false;
      }
    }
    return true;
  };
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <ToastContainer />
      <div className="row">
        <Cell
          state={state[0]}
          onClick={() => cellClicked(0)}
          idx={0}
          bclass="b-bottom-right"
        />
        <Cell
          state={state[1]}
          onClick={() => cellClicked(1)}
          idx={1}
          bclass="b-bottom-right"
        />
        <Cell
          state={state[2]}
          onClick={() => cellClicked(2)}
          idx={2}
          bclass="b-bottom"
        />
      </div>
      <div className="row">
        <Cell
          state={state[3]}
          onClick={() => cellClicked(3)}
          idx={3}
          bclass="b-bottom-right"
        />
        <Cell
          state={state[4]}
          onClick={() => cellClicked(4)}
          idx={4}
          bclass="b-bottom-right"
        />
        <Cell
          state={state[5]}
          onClick={() => cellClicked(5)}
          idx={5}
          bclass="b-bottom"
        />
      </div>
      <div className="row">
        <Cell
          state={state[6]}
          onClick={() => cellClicked(6)}
          idx={6}
          bclass="b-right"
        />
        <Cell
          state={state[7]}
          onClick={() => cellClicked(7)}
          idx={7}
          bclass="b-right"
        />
        <Cell state={state[8]} onClick={() => cellClicked(8)} idx={8} />
      </div>
      <div className="buttonDiv">
        <button onClick={() => setState(initialState)}>Reset Game</button>
        <p className="turnmsg">{xChance ? "Player 2 Turn" : "Player 1 Turn"}</p>
      </div>
    </div>
  );
}

export default App;
