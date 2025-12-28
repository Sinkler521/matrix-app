import React from "react";
import { MatrixContext } from "@/context/MatrixContext";
import type { Matrix } from "@/types";

export const MatrixProvider = ({ children }: { children: React.ReactNode }) =>  {
  const [matrix, setMatrix] = React.useState<Matrix>([]);
  const [x, setX] = React.useState<number>(1);

  return (
    <MatrixContext.Provider value={{ matrix, setMatrix, x, setX }}>
      {children}
    </MatrixContext.Provider>
  );
}