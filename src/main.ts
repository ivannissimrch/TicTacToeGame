//Controller
import "./style.css";
import { GameBoard } from "./Logic/GameBoard";
import { Player } from "./Logic/Player";
import { UI } from "./UI/UI";

function checkGameStatus(cellClickedHumanPlayer: number) {
  const isValidMove = currentGameBoard.addMarker(
    humanPlayer,
    cellClickedHumanPlayer
  );
  if (!isValidMove.status) return;

  let gameStatus = currentGameBoard.checkGameStatus();
  gameBoardUI.renderBoard(currentGameBoard.board);
  if (gameStatus === undefined) {
    //AI
    const cellClickedAiPlayer = aiPlayer.aiBestMove(currentGameBoard);
    currentGameBoard.addMarker(aiPlayer, cellClickedAiPlayer);
    gameStatus = currentGameBoard.checkGameStatus();
    gameBoardUI.renderBoard(currentGameBoard.board);
  }

  if (gameStatus !== undefined) {
    gameBoardUI.displayGameResult(gameStatus);
    currentGameBoard.resetBoard();
  }
}

function resetGameStatus() {
  currentGameBoard.resetBoard();
  gameBoardUI.resetGame(currentGameBoard.board);
}

const humanPlayer = new Player("player1");
const aiPlayer = new Player("aiPlayer");
const currentGameBoard = new GameBoard();
const gameBoardUI = new UI({
  gameBoard: currentGameBoard.board,
  onGameMove: checkGameStatus,
  onRestart: resetGameStatus,
});

gameBoardUI.renderBoard(currentGameBoard.board);
