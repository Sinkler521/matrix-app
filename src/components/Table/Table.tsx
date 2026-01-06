import "@/App.css";
import { useState } from "react";
import { useMatrix } from "@/context/MatrixContext";
import { Row } from "../Row/Row";
import { PercentileRow } from "../PercentileRow/PercentileRow";
import { addRowToEnd } from "@/utils/utils";

export const Table = () => {
  const { matrix, setMatrix, x } = useMatrix();

  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(null);

  if (matrix.length === 0) {
    return (
      <div className="table">
        <h1 className="empty-table-h">TABLE</h1>
      </div>
    );
  }

  return (
    <div className="table">
      <div style={{ marginBottom: 10 }}>
        <button className="controls-button" onClick={() => setMatrix((prev) => addRowToEnd(prev))}>
          + Add row
        </button>
        <span style={{ marginLeft: 12, opacity: 0.7 }}>X = {x}</span>
      </div>

      <div className="table-grid">
        {matrix.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            hoveredCellId={hoveredCellId}
            setHoveredCellId={setHoveredCellId}
            hoveredSumRowIndex={hoveredSumRowIndex}
            setHoveredSumRowIndex={setHoveredSumRowIndex}
          />
        ))}

        <PercentileRow />
      </div>
    </div>
  );
};