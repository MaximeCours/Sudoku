import resolvers from "@Resolvers"
import { Grid } from "@Objects"
import gridSampleList from "@Grids"

interface IProps {
  selectedGridSampler: number
  setGrid: (grid: Grid) => void
  setLoaderStatus: (status: boolean) => void
  setScore: (score: string) => void
}

function GridResolvers({ selectedGridSampler, setGrid, setLoaderStatus, setScore }: IProps) {

  const runSolver = (num: number) => {
    const grid = new Grid()
    grid.load(gridSampleList[selectedGridSampler], true)
    setLoaderStatus(true)
    setGrid(grid)
    setTimeout(() => {
      const resolver = new resolvers[num - 1](grid!)
      const t0 = performance.now()
      resolver.solve()
      const t1 = performance.now()
      const perf = t1 - t0
      setLoaderStatus(false)
      setScore(perf.toFixed(2))
      const resultGrid = new Grid()
      resultGrid.load(resolver.data)
      setGrid(resultGrid)
      return perf
    }, 400)
  }

  return <div className="resolvers">
    {resolvers.map((_, index) => {
      return <button key={index} onClick={() => runSolver(index + 1)}>
        Resolver {index + 1}
      </button>
    })}
  </div>
}

export default GridResolvers