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
  gameBoardUI.restartButton.classList.remove("hideElement");
}

function checkGameStatus(event: MouseEvent) {
  const cellClickedHumanPlayer: number = parseInt(
    (event.target as HTMLDivElement).id.split("").slice(4).join("")
  );
  const isValidMove: { status: boolean; message: string } =
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
const gameBoardUI = new UI();
const humanPlayer = new Player("player1");
const aiPlayer = new Player("aiPlayer");
gameBoardUI.renderBoard(currentGameBoard.board);
gameBoardUI.gameBoardUI.addEventListener("click", checkGameStatus);
gameBoardUI.restartButton.addEventListener("click", () =>
  gameBoardUI.resetGame(currentGameBoard, checkGameStatus)
);
