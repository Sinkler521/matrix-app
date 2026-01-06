import "@/App.css";
import type { Cell as CellType, Matrix } from "@/types";
import { incrementCellById, getNearestCellIds } from "@/utils/utils";
import { useMatrix } from "@/context/MatrixContext";
import { useMemo } from "react";

type Props = {
  cell: CellType;
  row: CellType[];
  sum: number;

  isPercentMode: boolean;
  maxInRow: number;

  onHover: () => void;
  onLeave: () => void;

  hoveredCellId: number | null;
  matrix: Matrix;
};

export const Cell = ({
  cell,
    // @ts-expect-error error TS6133: 'row' is declared but its value is never read.
  row,
  sum,
  isPercentMode,
  maxInRow,
  onHover,
  onLeave,
  hoveredCellId,
  matrix,
}: Props) => {
  const { setMatrix, x } = useMatrix();

  const nearestIds = useMemo(() => {
    if (!hoveredCellId) return [];
    return getNearestCellIds(matrix, hoveredCellId, x);
  }, [matrix, hoveredCellId, x]);

  const isHighlighted = hoveredCellId ? nearestIds.includes(cell.id) : false;

  const percentOfSum = sum === 0 ? 0 : Math.round((cell.amount / sum) * 100);
  const heat = maxInRow === 0 ? 0 : Math.round((cell.amount / maxInRow) * 100); // 0..100

  return (
    <div
      className={`cell ${isHighlighted ? "highlight" : ""}`}
      onClick={() => setMatrix((prev) => incrementCellById(prev, cell.id))}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={
        isPercentMode
          ? {
              background: `linear-gradient(to right, rgba(0,0,0,0.12) ${heat}%, transparent ${heat}%)`,
            }
          : undefined
      }
      title={`id=${cell.id}`}
    >
      {isPercentMode ? `${percentOfSum}%` : cell.amount}
    </div>
  );
};