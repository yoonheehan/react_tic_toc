import React, { useState } from "react";
import Square from "./Square";

function calculateWinter(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinter(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const firstRow = [0, 1, 2];
  const secondRow = [3, 4, 5];
  const thirdRow = [6, 7, 8];

  function handleClick(i) {
    if (squares[i] || calculateWinter(squares)) {
      return;
    }

    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    onPlay(nextSquare);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {firstRow.map((value, index) => (
          <Square
            key={index}
            value={squares[value]}
            onSquareClick={() => handleClick(value)}
          />
        ))}
      </div>
      <div className="board-row">
        {secondRow.map((value, index) => (
          <Square
            key={index}
            value={squares[value]}
            onSquareClick={() => handleClick(value)}
          />
        ))}
      </div>
      <div className="board-row">
        {thirdRow.map((value, index) => (
          <Square
            key={index}
            value={squares[value]}
            onSquareClick={() => handleClick(value)}
          />
        ))}
      </div>
    </>
  );
}

// export default Board;

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  console.log(history);
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
