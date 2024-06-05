//Controller
import "./style.css";
import { GameBoard } from "./Logic/GameBoard";
import { Player } from "./Logic/Player";
import { UI } from "./UI/UI";

function displayGameResult(gameStatus: string) {
  gameBoardUI.gameResultMessage.textContent = `${
    gameStatus === "Draw" ? "Draw" : `${gameStatus} Wins`
  }`;
  gameBoardUI.gameResultMessage.classList.remove("hideElement");
  gameBoardUI.gameBoardUI.removeEventListener("click", checkGameStatus);
  gameBoardUI.hideRestartButton();
}

function checkGameStatus(cellClickedHumanPlayer: number) {
  const isValidMove: { status: boolean, message: string } =
    currentGameBoard.addMarker(humanPlayer, cellClickedHumanPlayer);
  //probably addMaker should just return a boolean value?
  if (!isValidMove.status) return;

  let gameStatus = currentGameBoard.checkGameStatus();
  gameBoardUI.renderBoard(currentGameBoard.board);
  if (gameStatus === undefined) {
    //AI
    const cellClickedAiPlayer = aiPlayer.aiBestMove(currentGameBoard);
    currentGameBoard.addMarker(aiPlayer, cellClickedAiPlayer);
    gameStatus = currentGameBoard.checkGameStatus();
    gameStatus !== undefined && displayGameResult(gameStatus);
    gameBoardUI.renderBoard(currentGameBoard.board);
  } else {
    displayGameResult(gameStatus);
  }
}

const currentGameBoard = new GameBoard();
const gameBoardUI = new UI({ onGameMove: checkGameStatus });
const humanPlayer = new Player("player1");
const aiPlayer = new Player("aiPlayer");
gameBoardUI.renderBoard(currentGameBoard.board);
gameBoardUI.restartButton.addEventListener("click", () =>
  gameBoardUI.resetGame(currentGameBoard, checkGameStatus)
);
