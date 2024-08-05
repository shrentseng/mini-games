"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Turn = "X" | "O" | null;

export default function Tictactoe() {
  const [board, setBoard] = useState<Turn[]>(new Array(9).fill(null));
  const [turn, setTurn] = useState<Turn>("X");
  const [winner, setWinner] = useState<Turn>(null);

  const checkWinner = (boa: Turn[]) => {
    // check horizontal
    for (let i = 0; i < 9; i += 3) {
      if (boa[i] === boa[i + 1] && boa[i] === boa[i + 2]) {
        return boa[i];
      }
    }
    // check vertical
    for (let i = 0; i < 3; i++) {
      if (boa[i] === boa[i + 3] && boa[i] === boa[i + 6]) {
        return boa[i];
      }
    }
    // check diagonal
    if (
      (boa[0] === boa[4] && boa[0] === boa[8]) ||
      (boa[2] === boa[4] && boa[2] === boa[6])
    ) {
      return boa[4];
    }
    return null;
  };

  const mark = (index: number) => {
    if (winner !== null) {
      return;
    }
    console.log(winner);
    const newBoard = [...board];
    if (newBoard[index] !== null) {
      return;
    }
    newBoard[index] = turn;
    console.log(newBoard);
    setWinner(checkWinner(newBoard));
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-lg italic font-bold">Tic-Tac-Toe</p>
      {null === winner ? (
        <p className="text-lg italic font-bold">{`Turn: ${turn}`}</p>
      ) : (
        <p className="text-lg italic font-bold">{`Winner: ${winner}`}</p>
      )}

      <div className="grid grid-cols-3 w-64 h-64">
        {board.map((b, i) => {
          return (
            <button
              key={i}
              onClick={() => mark(i)}
              className="bg-white border-2 border-gray-400 flex items-center justify-center"
            >
              {b}
            </button>
          );
        })}
      </div>
    </main>
  );
}
