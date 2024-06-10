interface Props {
  gameBoard: string[];
  onGameMove: (coordinate: number) => void;
  resetGameBoard: () => string[];
}

export class UI {
  gameBoard: string[];
  onGameMove: Props["onGameMove"];
  resetGameBoard: Props["resetGameBoard"];
  gameBoardUI: HTMLDivElement;
  gameResultMessage: HTMLHeadingElement;
  app: HTMLDivElement;
  restartButton: HTMLButtonElement;

  constructor({ gameBoard, onGameMove, resetGameBoard }: Props) {
    this.gameBoardUI = document.createElement("div");
    this.gameBoardUI.id = "board";
    this.gameResultMessage = document.createElement("h2");
    this.gameResultMessage.id = "resultMessage";
    this.gameResultMessage.textContent = "Game in progress";
    this.gameResultMessage.classList.add("hideElement");
    this.restartButton = document.createElement("button");
    this.restartButton.id = "restartButton";
    this.restartButton.textContent = "Restart Game";
    this.restartButton.classList.add("hideElement");
    this.restartButton.classList.add("restartButton");
    this.app = document.querySelector("#app") as HTMLDivElement;
    this.app.innerHTML = `<h1 id='title'>Tic Tac Toe</h1>`;
    this.app.appendChild(this.gameBoardUI);
    this.app.appendChild(this.gameResultMessage);
    this.app.appendChild(this.restartButton);

    this.gameBoard = gameBoard;
    this.onGameMove = onGameMove;
    this.resetGameBoard = resetGameBoard;

    this.handlePlayer1Click = this.handlePlayer1Click.bind(this);
    this.gameBoardUI.addEventListener("click", this.handlePlayer1Click);
    this.resetGame = this.resetGame.bind(this);
    this.restartButton.addEventListener("click", this.resetGame);
  }

  renderBoard(boardData: string[]) {
    this.gameBoardUI.innerHTML = boardData
      .map(
        (cell: string, index: number) =>
          `<div class ='cell' id='cell${index}'>${cell}</div>`
      )
      .join("");
  }

  handlePlayer1Click(event: MouseEvent) {
    const cellClickedHumanPlayer: number = parseInt(
      (event.target as HTMLDivElement).id.substring(4)
    );
    this.onGameMove(cellClickedHumanPlayer);
  }

  showRestartButton() {
    this.restartButton.classList.remove("hideElement");
  }

  displayGameResult(gameStatus: string) {
    this.gameResultMessage.textContent = `${
      gameStatus === "Draw" ? "Draw" : `${gameStatus} Wins`
    }`;
    this.gameResultMessage.classList.remove("hideElement");
    this.gameBoardUI.removeEventListener("click", this.handlePlayer1Click);
    this.showRestartButton();
  }

  resetGame() {
    this.gameResultMessage.textContent = "Game in progress";
    this.gameBoardUI.addEventListener("click", this.handlePlayer1Click);
    this.restartButton.classList.add("hideElement");
    this.gameResultMessage.classList.add("hideElement");
    this.gameBoard = this.resetGameBoard();
    this.renderBoard(this.gameBoard);
  }
}
