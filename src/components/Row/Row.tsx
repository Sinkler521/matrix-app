import "@/App.css";
import type { Cell as CellType } from "@/types";
import { Cell } from "../Cell/Cell";
import { calcRowSum, removeRowByIndex } from "@/utils/utils";
import { useMatrix } from "@/context/MatrixContext";

type Props = {
  row: CellType[];
  rowIndex: number;

  hoveredCellId: number | null;
  setHoveredCellId: (v: number | null) => void;

  hoveredSumRowIndex: number | null;
  setHoveredSumRowIndex: (v: number | null) => void;
};

export const Row = ({
  row,
  rowIndex,
  hoveredCellId,
  setHoveredCellId,
  hoveredSumRowIndex,
  setHoveredSumRowIndex,
}: Props) => {
  const { matrix, setMatrix } = useMatrix();

  const sum = calcRowSum(row);
  const isPercentMode = hoveredSumRowIndex === rowIndex;

  const maxInRow = Math.max(...row.map((c) => c.amount));

  return (
    <div className="row">
      {row.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          row={row}
          sum={sum}
          isPercentMode={isPercentMode}
          maxInRow={maxInRow}
          onHover={() => setHoveredCellId(cell.id)}
          onLeave={() => setHoveredCellId(null)}
          hoveredCellId={hoveredCellId}
          matrix={matrix}
        />
      ))}

      <div
        className="cell sum-cell"
        onMouseEnter={() => setHoveredSumRowIndex(rowIndex)}
        onMouseLeave={() => setHoveredSumRowIndex(null)}
        title="Row sum"
      >
        {sum}
      </div>

      <button
        className="remove-row-btn"
        onClick={() => setMatrix((prev) => removeRowByIndex(prev, rowIndex))}
        title="Remove row"
      >
        ✕
      </button>
    </div>
  );
};