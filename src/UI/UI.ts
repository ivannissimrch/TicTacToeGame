import { GameBoard } from "../Logic/GameBoard";


interface Props {
  onGameMove: (coordinate: number) => void;
}

export class UI {
  onGameMove: Props['onGameMove'];
  gameBoardUI: HTMLDivElement;
  gameResultMessage: HTMLHeadingElement;
  app: HTMLDivElement;
  restartButton: HTMLButtonElement;

  constructor({ onGameMove }: Props) {
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

    this.onGameMove = onGameMove;
    this.gameBoardUI.addEventListener("click", (event: MouseEvent) => {
      const cellClickedHumanPlayer: number = parseInt(
        (event.target as HTMLDivElement).id.substring(4)
      );
      this.onGameMove(cellClickedHumanPlayer);
    });
  }

  hideRestartButton() {
    this.restartButton.classList.remove("hideElement");
  }

  renderBoard(boardData: string[]) {
    this.gameBoardUI.innerHTML = boardData
      .map(
        (cell: string, index: number) =>
          `<div class ='cell' id='cell${index}'>${cell}</div>`
      )
      .join("");
  }

  resetGame(
    currentGameBoard: GameBoard,
    checkGameStatus: (event: MouseEvent) => void
  ) {
    currentGameBoard.resetBoard();
    this.renderBoard(currentGameBoard.board);
    this.gameResultMessage.textContent = "Game in progress";
    this.gameBoardUI.addEventListener("click", checkGameStatus);
    this.restartButton.classList.add("hideElement");
    this.gameResultMessage.classList.add("hideElement");
  }
}
