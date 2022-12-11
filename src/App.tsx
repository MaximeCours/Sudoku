import { useState, useEffect } from "react"

import { Grid } from "@Objects"
import {GridSamplers, GridResolvers, VisualGrid} from "@Components"
import gridSampleList from "@Grids"

import Loader from "@Assets/loader.gif"

function App() {
  const [selectedGridSampler, setSelectedSampler] = useState<number>(0)
  const [currentGrid, setCurrentGrid] = useState<Grid | undefined>(undefined)
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false)
  const [score, setScore] = useState<string | undefined>(undefined)

  const gridFiller = () => {
    const newGrid = new Grid()
    newGrid.load(gridSampleList[selectedGridSampler], true)
    setCurrentGrid(newGrid)
  }

  useEffect(() => {
    gridFiller()
  }, [selectedGridSampler])

  const gridSetter = (grid: Grid) => {
    setCurrentGrid(grid)
  }

  const gridSamplerSetter = (sampler: number) => {
    if (sampler === selectedGridSampler){
      gridFiller()
    }
    setSelectedSampler(sampler)
  }

  const loaderSetter = (status: boolean) => {
    setLoaderStatus(status)
  }

  const scoreSetter = (score: string) => {
    setScore(score)
  }

  if (!currentGrid){
    return <></>
  }

  return (
    <>
      <div className="options">
        <GridSamplers gridSampleList={gridSampleList} setSamplerGrid={gridSamplerSetter} />
        <GridResolvers selectedGridSampler={selectedGridSampler} setGrid={gridSetter} setLoaderStatus={loaderSetter} setScore={scoreSetter}/>
      </div>
      <VisualGrid grid={currentGrid} />
      {score && <p className="score">{~~score}ms</p>}
      <img
        className={`loader ${loaderStatus ? "show" : ""}`}
        src={Loader}
        alt="Loader"
      />
    </>
  )
}

export default App
