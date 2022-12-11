import { Grid } from "@Objects"

interface IProps{
  grid: Grid
}

function VisualGrid({grid} : IProps) {
  return (
    <div className="grid">
      {grid?.get().map((col, key) => {
        return (
          <div key={key} className="col">
            {col.map((item, key) => {
              return (
                <div key={key} className="item">
                  <p>{item !== 0 ? item : ""}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default VisualGrid
