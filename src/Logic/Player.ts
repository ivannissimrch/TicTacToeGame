import { GameBoard } from "./GameBoard";

export class Player {
  name: string;
  marker: string;

  constructor(name: string) {
    this.name = name;
    this.marker = name === "player1" ? "X" : "O";
  }

  aiBestMove(gameBoard: GameBoard) {
    //This is only for testing purposes i will replace this with minimax
    //https://www.freecodecamp.org/news/minimax-algorithm-guide-how-to-create-an-unbeatable-ai/
    return gameBoard.board.indexOf("");
  }
}
