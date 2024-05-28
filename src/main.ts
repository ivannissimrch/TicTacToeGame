import "./style.css";
import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

function renderBoard(boardElement: HTMLDivElement, boardData: string[]) {
  boardElement.innerHTML = boardData
    .map(
      (cell: string, index: number) =>
        `<div class='cell' id='cell${index}'>${cell}</div>`
    )
    .join("");
}

function resetGame(): void {
  currentGameBoard.resetBoard();
  renderBoard(gameBoardUI, currentGameBoard.board);
  gameResultMessage.innerHTML = "";
  gameBoardUI.addEventListener("click", handlePlayerMove);
  restartButton.classList.add("hideButton");
  restartButton.classList.remove("showButton");
}

function checkGameStatus() {
  let win = currentGameBoard.checkWin();

  if (win === "X") {
    gameResultMessage.innerHTML = "Player 1 Wins";
    gameBoardUI.removeEventListener("click", handlePlayerMove);
    restartButton.classList.add("showButton");
    restartButton.classList.remove("hideButton");
    return;
  } else if (win === "Draw") {
    gameResultMessage.innerHTML = "Draw";
    gameBoardUI.removeEventListener("click", handlePlayerMove);
    restartButton.classList.add("showButton");
    restartButton.classList.remove("hideButton");
    return;
  }
}

function handlePlayerMove(event: MouseEvent | null) {
  const cellClicked: HTMLDivElement = event!.target as HTMLDivElement;
  const cellClickedPosition: number = parseInt(
    cellClicked.id.split("").slice(4).join("")
  );

  if (cellClicked.innerText !== "") {
    return;
  }
  currentGameBoard.addMarker(humanPlayer, cellClickedPosition);
  cellClicked.innerHTML = "X";

  checkGameStatus();
  if (gameResultMessage.innerHTML !== "") {
    return;
  }

  //AIPlayer pass only the player and implement logic of ai on gameboard, I might replace this..
  const aiCellClicked: HTMLDivElement = document.getElementById(
    `cell${cellClickedPosition + 1}`
  ) as HTMLDivElement;
  if (aiCellClicked.innerText !== "") {
    return;
  }
  currentGameBoard.addMarker(aiPlayer, cellClickedPosition + 1);

  aiCellClicked.innerHTML = "O";
  checkGameStatus();
}

const currentGameBoard = new GameBoard();
const humanPlayer = new Player("player1");
const aiPlayer = new Player("aiPlayer");

const gameBoardUI: HTMLDivElement = document.createElement("div");
gameBoardUI.id = "board";
gameBoardUI.addEventListener("click", handlePlayerMove);

const gameResultMessage: HTMLHeadElement = document.createElement("h2");
gameResultMessage.id = "resultMessage";

const restartButton: HTMLButtonElement = document.createElement(
  "Button"
) as HTMLButtonElement;
restartButton.id = "restartButton";
restartButton.textContent = "Restart";
restartButton.classList.add("hideButton");
restartButton.addEventListener("click", resetGame);

const app: HTMLDivElement = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `<h1 id='title'>Tic Tac Toe</h1>`;
app.appendChild(gameBoardUI);
app.appendChild(gameResultMessage);
app.appendChild(restartButton);
renderBoard(gameBoardUI, currentGameBoard.board);
