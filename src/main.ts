import "./style.css";
import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

const newGameBoard = new GameBoard();
const player1 = new Player("player1");
const player2 = new Player("aiPlayer");

newGameBoard.addMaker(player1, 2);
newGameBoard.addMaker(player2, 1);
newGameBoard.addMaker(player1, 5);

newGameBoard.addMaker(player2, 3);
newGameBoard.addMaker(player1, 8);
// newGameBoard.addMaker(player2, 5);
// newGameBoard.addMaker(player1, 6);
// newGameBoard.addMaker(player2, 7);
// newGameBoard.addMaker(player1, 0);

const win = newGameBoard.checkWin();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>   
  ${newGameBoard.board}
  <h2>${win}</h2> 
  </div>
`;
