class Grid {
  private data: GridType

  constructor() {
    this.data = this.generateEmptyGrid()
  }

  generateEmptyGrid() {
    let newGrid = new Array(9)

    for (let i = 0; i < 9; i++) {
      newGrid[i] = new Array(9).fill(0)
    }
    return newGrid
  }

  load(data: GridType, reverse: boolean = false) {
    let result = this.generateEmptyGrid()

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (reverse) {
          result[i][j] = data[j][i]
        } else {
          result[i][j] = data[i][j]
        }
      }
    }

    this.data = result
  }

  get() {
    return this.data
  }
}

export default Grid
