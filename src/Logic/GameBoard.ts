import { Marker, Player } from "./Player.ts";

export enum Result {
  DRAW = "Draw",
  GameInProgress = "GameInProgress",
}

export enum Position {
  VALID = "validPosition",
  INVALID = "invalidPosition",
}

export class GameBoard {
  board: Marker[];
  rows: number;
  columns: number;
  marker: Marker;
  winner: Marker;

  constructor() {
    this.rows = 3;
    this.columns = 3;
    this.board = Array(this.rows * this.columns).fill(Marker.EMPTY);
    this.marker = Marker.EMPTY;
    this.winner = Marker.EMPTY;
  }

  isCellEmpty(cellValue: string): boolean {
    return cellValue === Marker.EMPTY;
  }

  addMarker(player: Player, position: number): Position {
    const validMove = this.isCellEmpty(this.board[position]);

    if (validMove) {
      this.marker = player.marker;
      this.board[position] = this.marker;
    }
    return validMove ? Position.VALID : Position.INVALID;
  }

  resetBoard(): void {
    this.board = Array(this.rows * this.columns).fill(Marker.EMPTY);
    this.winner = Marker.EMPTY;
    this.marker = Marker.EMPTY;
  }

  checkGameStatus() {
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

      if (
        board[a] !== Marker.EMPTY &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        this.winner = board[a];
        return this.winner;
      }
    }
    const isBoardFull = this.board.every((cell) => cell !== Marker.EMPTY);
    return isBoardFull ? Result.DRAW : Result.GameInProgress;
  }
}
