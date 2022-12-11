import { Grid } from "@Objects"

/*
  We test if number exist in Row or Column or Square
 */

export default class Resolver1 implements ResolverClass {
  public data: GridType

  constructor(grid: Grid) {
    this.data = grid.get()
  }

  private existInRow(row: number, number: number) {
    for (let c = 0; c < 9; c++) {
      if (this.data[c][row] == number) return true
    }
    return false
  }

  private existInColumn(column: number, number: number) {
    for (let c = 0; c < 9; c++) {
      if (this.data[column][c] == number) return true
    }
    return false
  }

  private existInSquare(column: number, row: number, number: number) {
    for (let i = ~~(column / 3) * 3; i < ~~(column / 3) * 3 + 3; i++) {
      for (let j = ~~(row / 3) * 3; j < ~~(row / 3) * 3 + 3; j++) {
        if (this.data[i][j] == number) return true
      }
    }
    return false
  }

  private isMissing(row: number, column: number, number: number) {
    return !(
      this.existInRow(row, number) ||
      this.existInColumn(column, number) ||
      this.existInSquare(column, row, number)
    )
  }

  public solve(position: number = 0): boolean {
    //Stop condition
    if (position === 81) return true
    //Win !

    //Calculate position in grid
    const pos = {
      row: ~~(position / 9),
      col: position % 9
    }

    //If not empty go next
    if (this.data[pos.col][pos.row] !== 0) return this.solve(position + 1)

    //Backtracking
    for (let num = 1; num <= 9; num++) {
      if (this.isMissing(pos.row, pos.col, num)) {
        this.data[pos.col][pos.row] = num

        //Go next
        if (this.solve(position + 1)) return true
      }
    }

    //If not work
    this.data[pos.col][pos.row] = 0
    return false
  }
}
