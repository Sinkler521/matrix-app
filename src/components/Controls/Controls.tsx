import "@/App.css";
import { useMatrix } from "@/context/MatrixContext.ts";
import { createMatrixNumbers } from "@/utils/utils.ts";
import { useState } from "react";

export const Controls = () => {
    const [tableValues, setTableValues] = useState<{M: number, N: number} | undefined>()
    const { setMatrix } = useMatrix();

    const generateMatrix = () => {
        if(!tableValues) return;

        const {M, N} = tableValues;
        const newMatrix = createMatrixNumbers(N, M);

        setMatrix(newMatrix)
        console.log(newMatrix);
    }

    return (
        <>
          <div className="controls">
            <div className="controls-element">
                <input
                    className="controls-input"
                    type="number"
                    min={1}
                    max={100}
                    placeholder="M (rows)"
                    onChange={(e) =>
                        setTableValues({ ...tableValues, M: Number(e.target.value)})
                      }
                />
                <input
                    className="controls-input"
                    type="number"
                    min={1}
                    max={100}
                    placeholder="N (cols)"
                    onChange={(e) =>
                        setTableValues({ ...tableValues, N: Number(e.target.value)})
                    }
                />
            </div>
            <div className="controls-element justify-center">
                <button className="controls-button"
                        disabled={!tableValues?.M || !tableValues?.N}
                        onClick={generateMatrix}
                >Generate</button>
            </div>
          </div>
        </>
    )
}