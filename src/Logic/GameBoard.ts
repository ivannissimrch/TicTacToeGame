import { Player } from "../Logic/Player";

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

  isCellEmpty(cellValue: string): boolean {
    return cellValue === "";
  }

  addMarker(
    player: Player,
    position: number
  ): { status: boolean; message: string } {
    const validMove = this.isCellEmpty(this.board[position]);

    if (validMove) {
      this.marker = player.marker;
      this.board[position] = this.marker;
      return { status: validMove, message: "validMove" };
    } else {
      return { status: validMove, message: "invalidMove" };
    }
  }

  resetBoard(): void {
    this.board = Array(this.rows * this.columns).fill("");
    this.winner = "";
    this.marker = "";
  }

  checkGameStatus(): string | undefined {
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
