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

export const calculateX = () => {

}