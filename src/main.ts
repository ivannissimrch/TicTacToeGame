import "./style.css";
import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

const newGameBoard = new GameBoard();
const player1 = new Player("player1");
const player2 = new Player("aiPlayer");

newGameBoard.addMarker(player1, 2);
newGameBoard.addMarker(player2, 1);
newGameBoard.addMarker(player1, 5);

newGameBoard.addMarker(player2, 3);
newGameBoard.addMarker(player1, 8);
// newGameBoard.addMarker(player2, 5);
// newGameBoard.addMarker(player1, 6);
// newGameBoard.addMarker(player2, 7);
// newGameBoard.addMarker(player1, 0);

const win = newGameBoard.checkWin();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>   
  ${newGameBoard.board}
  <h2>${win}</h2> 
  </div>
`;
