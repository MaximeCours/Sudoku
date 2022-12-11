class Cell {
  public position: Position
  public score: number

  constructor(row: number, column: number, score: number) {
    this.position = { x: row, y: column }
    this.score = score
  }
}

export default Cell
