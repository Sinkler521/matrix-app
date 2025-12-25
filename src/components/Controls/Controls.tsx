import "@/App.css";

export const Controls = () => {

    return (
        <>
          <div className="controls">
            <div className="controls-element">
                <input className="controls-input" type="number" min={1} max={100} placeholder="M (rows)"/>
                <input className="controls-input" type="number" min={1} max={100} placeholder="N (cols)"/>
            </div>
            <div className="controls-element justify-center">
                <button className="controls-button">Generate</button>
            </div>
          </div>
        </>
    )
}