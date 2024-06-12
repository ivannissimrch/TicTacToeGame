//Controller
import "./style.css";
import { GameBoard, Position, Result } from "./Logic/GameBoard";
import { Player } from "./Logic/Player";
import { UI } from "./UI/UI";

function checkGameStatus(cellClickedHumanPlayer: number) {
  //maybe make 2 methods one to check if cell is empty and then one to add marker?
  const isValidMove = currentGameBoard.addMarker(
    humanPlayer,
    cellClickedHumanPlayer
  );
  if (isValidMove === Position.INVALID) return;

  let gameStatus = currentGameBoard.checkGameStatus();
  gameBoardUI.renderBoard(currentGameBoard.board);
  if (gameStatus === Result.GameInProgress) {
    const cellClickedAiPlayer = aiPlayer.aiBestMove(currentGameBoard);
    currentGameBoard.addMarker(aiPlayer, cellClickedAiPlayer);
    gameStatus = currentGameBoard.checkGameStatus();
    gameBoardUI.renderBoard(currentGameBoard.board);
  }

  if (gameStatus !== Result.GameInProgress) {
    gameBoardUI.displayGameResult(gameStatus);
  }
}

function resetGameStatus() {
  currentGameBoard.resetBoard();
  return currentGameBoard.board;
}

const humanPlayer = new Player("player1");
const aiPlayer = new Player("aiPlayer");
const currentGameBoard = new GameBoard();
const gameBoardUI = new UI({
  gameBoard: currentGameBoard.board,
  onGameMove: checkGameStatus,
  resetGameBoard: resetGameStatus,
});
gameBoardUI.renderBoard(currentGameBoard.board);
