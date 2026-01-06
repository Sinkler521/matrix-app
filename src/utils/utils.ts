import type { Matrix, Cell } from "@/types";

export const createMatrixNumbers = (N: number, M: number): Matrix => {
  let id = 1;

  return Array.from({ length: M }, () => {
    return Array.from({ length: N }, () => {
      const cell: Cell = {
        id: id,
        amount: Math.floor(100 + Math.random() * 900),
      };

      id += 1;
      return cell;
    });
  });
};

export const getXLimits = (M: number, N: number) => {
  const total = M * N;
  return {
    min: total > 0 ? 1 : 0,
    max: total > 1 ? total - 1 : 0,
  };
};

export const calcRowSum = (row: Cell[]) =>
  row.reduce((acc, c) => acc + c.amount, 0);

export const percentile60 = (numbers: number[]) => {
  if (numbers.length === 0) return 0;

  const arr = [...numbers].sort((a, b) => a - b);

  const p = 0.6;
  const idx = (arr.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);

  if (lo === hi) return arr[lo];

  const w = idx - lo;
  return arr[lo] * (1 - w) + arr[hi] * w;
};

export const calcCol60Percentiles = (matrix: Matrix) => {
  if (matrix.length === 0) return [];

  const cols = matrix[0].length;

  return Array.from({ length: cols }, (_, colIdx) => {
    const colValues = matrix.map((row) => row[colIdx]?.amount ?? 0);
    return percentile60(colValues);
  });
};

export const incrementCellById = (matrix: Matrix, cellId: number): Matrix => {
  return matrix.map((row) =>
    row.map((cell) =>
      cell.id === cellId ? { ...cell, amount: cell.amount + 1 } : cell
    )
  );
};

export const removeRowByIndex = (matrix: Matrix, rowIndex: number): Matrix => {
  return matrix.filter((_, i) => i !== rowIndex);
};

export const addRowToEnd = (matrix: Matrix): Matrix => {
  if (matrix.length === 0) return matrix;

  const colsCount = matrix[0].length;

  const maxId =
    matrix.flat().reduce((max, cell) => Math.max(max, cell.id), 0) || 0;

  let id = maxId + 1;

  const newRow = Array.from({ length: colsCount }, () => ({
    id: id++,
    amount: Math.floor(100 + Math.random() * 900),
  }));

  return [...matrix, newRow];
};

export const getNearestCellIds = (
  matrix: Matrix,
  hoveredCellId: number,
  x: number
) => {
  const flat = matrix.flat();
  const hovered = flat.find((c) => c.id === hoveredCellId);
  if (!hovered) return [];

  const others = flat.filter((c) => c.id !== hoveredCellId);

  return others
    .map((c) => ({ id: c.id, diff: Math.abs(c.amount - hovered.amount) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, x)
    .map((t) => t.id);
};