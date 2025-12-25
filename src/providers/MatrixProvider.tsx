import React from "react";
import { MatrixContext } from "@/context/MatrixContext";
import type { Matrix } from "@/types";

export const MatrixProvider = ({ children }: { children: React.ReactNode }) =>  {
  const [matrix, setMatrix] = React.useState<Matrix>([]);

  return (
    <MatrixContext.Provider value={{ matrix, setMatrix }}>
      {children}
    </MatrixContext.Provider>
  );
}