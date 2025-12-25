export type CellId = number; // unique value for all table
export type CellValue = number; // three digit random number

export type Cell = {
  id: CellId,
  amount: CellValue
}

export type Matrix = Cell[][];

export type Settings = {
  // Sinkler521 matrix M and N limits 1-100, x values are calculated
  M: number; // Sinkler521: rows
  N: number; // Sinkler521: cols
  X: number; // Sinkler521: how many nearest cells to highlight
};