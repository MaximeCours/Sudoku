import { Grid } from "@Objects"

/*
  Same approach than resolver 1 but trying to save what is in Row, Colum and Square
 */

export default class Resolver2 implements ResolverClass {
  public data: GridType

  constructor(grid: Grid) {
    this.data = grid.get()
  }

  private whatInRow(row: number) {
    let result = []
    for (let c = 0; c < 9; c++) {
      result.push(this.data[c][row])
    }
    return result
  }

  private whatInColumn(column: number) {
    let result = []
    for (let c = 0; c < 9; c++) {
      result.push(this.data[column][c])
    }
    return result
  }

  private whatInSquare(column: number, row: number) {
    let result = []
    for (let i = ~~(column / 3) * 3; i < ~~(column / 3) * 3 + 3; i++) {
      for (let j = ~~(row / 3) * 3; j < ~~(row / 3) * 3 + 3; j++) {
        result.push(this.data[i][j])
      }
    }
    return result
  }

  private getNeighbors(row: number, column: number): number[] {
    const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const neighbors = [
      ...new Set([
        ...this.whatInRow(row),
        ...this.whatInColumn(column),
        ...this.whatInSquare(column, row),
      ]),
    ]
    return numbersList.filter((item) => !neighbors.includes(item) && item !== 0)
  }

  public solve(position: number = 0): boolean {
    //Stop condition
    if (position === 81) return true
    //Win !

    //Calculate position in grid
    const pos = {
      row: ~~(position / 9),
      col: position % 9,
    }

    //If not empty go next
    if (this.data[pos.col][pos.row] !== 0) return this.solve(position + 1)

    //Backtracking
    const neighbors = this.getNeighbors(pos.row, pos.col)
    for (const num of neighbors) {
      this.data[pos.col][pos.row] = num

      //Go next
      if (this.solve(position + 1)) return true
    }

    //If not work
    this.data[pos.col][pos.row] = 0
    return false
  }
}
