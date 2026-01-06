import "@/App.css";
import { useMatrix } from "@/context/MatrixContext.ts";
import {createMatrixNumbers, getXLimits} from "@/utils/utils.ts";
import { useState } from "react";

export const Controls = () => {
  const [tableValues, setTableValues] = useState<{ M: number; N: number; X: number } | undefined>();
  const { setMatrix, x, setX } = useMatrix();

  const checkTableValuesValidity = () => {
    if(!tableValues || !tableValues.M || !tableValues.N) return false;
    else if(tableValues.M > 100 || tableValues.M <= 0) return false;
    else return !(tableValues.N > 100 || tableValues.N <= 0);
  }

  const generateMatrix = () => {
    if (!tableValues) return;

    const { M, N, X } = tableValues;
    const newMatrix = createMatrixNumbers(N, M);

    const limits = getXLimits(M, N);
    const fixedX = Math.min(Math.max(X, limits.min), limits.max || limits.min);

    setX(fixedX);
    setMatrix(newMatrix);
  };

  const M = tableValues?.M ?? 0;
  const N = tableValues?.N ?? 0;
  const limits = getXLimits(M, N);

  return (
    <div className="controls">
      <div className="controls-element">
        <input
          className="controls-input"
          type="number"
          min={1}
          max={100}
          placeholder="M (rows)"
          onChange={(e) =>
            setTableValues({ ...tableValues, M: Number(e.target.value), X: tableValues?.X ?? x, N: tableValues?.N ?? 0 })
          }
        />
        <input
          className="controls-input"
          type="number"
          min={1}
          max={100}
          placeholder="N (cols)"
          onChange={(e) =>
            setTableValues({ ...tableValues, N: Number(e.target.value), X: tableValues?.X ?? x, M: tableValues?.M ?? 0 })
          }
        />
        <input
          className="controls-input"
          type="number"
          min={limits.min}
          max={limits.max}
          placeholder={`X (1..${limits.max || 0})`}
          disabled={limits.max === 0}
          onChange={(e) => {
            const X = Number(e.target.value);
            setX(X);
            setTableValues({ ...tableValues, X, M: tableValues?.M ?? 0, N: tableValues?.N ?? 0 });
          }}
        />
      </div>

      <div className="controls-element justify-center">
        <button
          className="controls-button"
          disabled={!checkTableValuesValidity()}
          onClick={generateMatrix}
        >
          Generate
        </button>
      </div>
    </div>
  );
};