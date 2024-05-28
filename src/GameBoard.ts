import { Player } from "./Player";

export class GameBoard {
  board: string[];
  rows: number;
  columns: number;
  marker: string;
  winner: string;

  constructor() {
    this.rows = 3;
    this.columns = 3;
    this.board = Array(this.rows * this.columns).fill("");
    this.marker = "";
    this.winner = "";
  }

  isValidMove(boardPositionValue: string) {
    return boardPositionValue === "";
  }

  addMarker(player: Player, position: number) {
    const validMove = this.isValidMove(this.board[position]);
    if (validMove) {
      this.marker = player.marker;
      this.board[position] = this.marker;

      //TODO Add a function for the aiplayer to add a marker
    } else {
      console.log("invalid move");
      //return invalid move message to handle this on ui?
    }
  }

  resetBoard() {
    this.board = Array(9).fill("");
    this.winner = "";
    this.marker = "";
  }

  checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const winningCombination of winningCombinations) {
      const [a, b, c] = winningCombination;
      const { board } = this;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        this.winner = board[a];
        return this.winner;
      }
    }
    const isBoardFull = this.board.every((cell) => cell !== "");
    return isBoardFull ? "Draw" : undefined;
  }
}
