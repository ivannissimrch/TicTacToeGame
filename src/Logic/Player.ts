import { GameBoard } from "./GameBoard";

export enum Marker {
  X = "X",
  O = "O",
  EMPTY = "",
}

export class Player {
  name: string;
  marker: Marker;

  constructor(name: string) {
    this.name = name;
    this.marker = name === "player1" ? Marker.X : Marker.O;
  }

  aiBestMove(gameBoard: GameBoard) {
    //This is only for testing purposes i will replace this with minimax
    //https://www.freecodecamp.org/news/minimax-algorithm-guide-how-to-create-an-unbeatable-ai/
    return gameBoard.board.indexOf(Marker.EMPTY);
  }
}
