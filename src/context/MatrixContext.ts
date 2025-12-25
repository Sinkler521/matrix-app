import React from 'react'
import type {Matrix} from "@/types";

export type MatrixContextValue = {
  matrix: Matrix;
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>;
};

export const MatrixContext = React.createContext<MatrixContextValue | null>(null);

export function useMatrix() {
  const ctx = React.useContext(MatrixContext);
  if (!ctx) {
    throw new Error("useMatrix should be inside MatrixProvider");
  }
  return ctx;
}


