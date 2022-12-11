interface IProps {
  gridSampleList: GridList
  setSamplerGrid: (sampler: number) => void
}

function GridSamplers({ gridSampleList, setSamplerGrid }: IProps) {

  const loadGrid = (num: number) => {
    setSamplerGrid(num)
  }

  return <div className="samplers">
    {gridSampleList.map((_, index) => {
      return <button key={index} onClick={() => loadGrid(index)}>
        Load Grid {index + 1}
      </button>
    })}
  </div>
}

export default GridSamplers