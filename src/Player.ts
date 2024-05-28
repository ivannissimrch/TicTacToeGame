export class Player {
  name: string;
  wins: number;
  marker: string;

  constructor(name: string) {
    this.name = name;
    this.wins = 0;
    this.marker = name === "player1" ? "X" : "O";
  }

  addWin() {
    return ++this.wins;
  }
}
